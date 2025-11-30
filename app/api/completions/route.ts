import { get } from '@vercel/edge-config'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get all stored offer completions from Edge Config
 * Optional endpoint to view completion logs
 */
export async function GET(request: NextRequest) {
  try {
    // Get all completions from Edge Config
    const allCompletions = await get('all_completions')
    
    let completions: any[] = []
    if (allCompletions) {
      try {
        completions = typeof allCompletions === 'string' 
          ? JSON.parse(allCompletions) 
          : allCompletions
      } catch (e) {
        completions = []
      }
    }
    
    // Sort by timestamp (newest first)
    completions.sort((a: any, b: any) => (b.timestamp || 0) - (a.timestamp || 0))

    return NextResponse.json({
      success: true,
      total: completions.length,
      completions: completions
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
