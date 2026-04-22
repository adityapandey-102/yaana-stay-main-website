// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logError } from '@/lib/logging'

export const dynamic = 'force-dynamic'
const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, no-cache, must-revalidate' }

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ authenticated: false }, { status: 401, headers: NO_STORE_HEADERS })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
      },
    }, { headers: NO_STORE_HEADERS })
  } catch (error: any) {
    logError('Auth me failed:', error)
    return NextResponse.json({ authenticated: false }, { status: 500, headers: NO_STORE_HEADERS })
  }
}
