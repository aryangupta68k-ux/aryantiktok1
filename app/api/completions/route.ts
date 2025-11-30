import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get all stored offer completions
 * Optional endpoint to view completion logs
 */
export async function GET(request: NextRequest) {
  try {
    const completions = await kv.lrange('all_completions', 0, 9999)
    
    const parsed = completions.map((c: string) => {
      try {
        return JSON.parse(c)
      } catch (e) {
        return null
      }
    }).filter((c: any) => c !== null)
    
    // Sort by timestamp (newest first)
    parsed.sort((a: any, b: any) => (b.timestamp || 0) - (a.timestamp || 0))

    return NextResponse.json({
      success: true,
      total: parsed.length,
      completions: parsed
    })
    
  } catch (error) {
    console.error('Error fetching completions:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Error fetching completions' 
      },
      { status: 500 }
    )
  }
}

