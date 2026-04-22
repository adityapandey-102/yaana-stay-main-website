// app/api/visits/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { visitSchema } from '@/lib/validations'
import { logError } from '@/lib/logging'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const NO_STORE_HEADERS = {
  // Defensive: prevent intermediary/proxy caching for mutable admin data.
  'Cache-Control': 'no-store, no-cache, must-revalidate',
}

async function requireAdminAuth() {
  // API-level guard is required even with middleware, since route handlers are callable directly.
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdminAuth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE_HEADERS })
    }

    const searchParams = request.nextUrl.searchParams
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(Math.max(1, parseInt(searchParams.get('limit') || '10')), 50)
    const status = searchParams.get('status')
    const skip = (page - 1) * limit

    const where: Prisma.VisitWhereInput =
      status && status !== 'ALL'
        ? { status: status as Prisma.VisitWhereInput['status'] }
        : {}

    const [data, totalCount] = await Promise.all([
      prisma.visit.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          propertyId: true,
          visitDate: true,
          visitTime: true,
          message: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.visit.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      data,
      totalCount,
      totalPages,
      currentPage: page,
    }, {
      headers: NO_STORE_HEADERS,
    })
  } catch (error: any) {
    logError('Visits GET failed:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: NO_STORE_HEADERS }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = visitSchema.parse(body)

    const visit = await prisma.visit.create({
      data: {
        name: validated.name,
        phone: validated.phone,
        email: validated.email || null,
        propertyId: validated.propertyId || null,
        visitDate: new Date(validated.visitDate),
        visitTime: validated.visitTime,
        message: validated.message || null,
        status: 'SCHEDULED',
      },
    })

    return NextResponse.json(visit, { status: 201, headers: NO_STORE_HEADERS })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400, headers: NO_STORE_HEADERS }
      )
    }
    logError('Visits POST failed:', error)
    return NextResponse.json({ error: error.message }, { status: 400, headers: NO_STORE_HEADERS })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAdminAuth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE_HEADERS })
    }

    const body = await request.json()
    const { id, status } = body

    const visit = await prisma.visit.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(visit, { headers: NO_STORE_HEADERS })
  } catch (error: any) {
    logError('Visits PATCH failed:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 400, headers: NO_STORE_HEADERS }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAdminAuth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE_HEADERS })
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400, headers: NO_STORE_HEADERS })
    }

    await prisma.visit.delete({
      where: { id },
    })

    return NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS })
  } catch (error: any) {
    logError('Visits DELETE failed:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 400, headers: NO_STORE_HEADERS }
    )
  }
}
