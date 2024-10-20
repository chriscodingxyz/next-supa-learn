import { NextResponse } from 'next/server'

import { createAdmin } from '@/utils/supabase/server'

export async function POST (request: Request) {
  const { message, type } = await request.json()

  const supabaseAdmin = createAdmin()

  const { error } = await supabaseAdmin.from('logs').insert({ message, type })

  if (error) {
    console.error('Error logging message:', error)
    return NextResponse.json(
      { error: 'Failed to log message' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
