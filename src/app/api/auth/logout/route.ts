// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logError } from '@/lib/logging'

export const dynamic = 'force-dynamic'
const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, no-cache, must-revalidate' }

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400, headers: NO_STORE_HEADERS })
    }

    return NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS })
  } catch (error: any) {
    logError('Auth logout failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500, headers: NO_STORE_HEADERS })
  }
}
