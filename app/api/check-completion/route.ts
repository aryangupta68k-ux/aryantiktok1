import { get } from '@vercel/edge-config'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Check if a specific offer has been completed using Edge Config
 * Used by the frontend to poll for completion status
 * 
 * Query params:
 * - offer_id: The offer ID to check
 * - ip: (optional) Session IP to filter by
 * - aff_sub4: (optional) Additional tracking parameter
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const offerId = searchParams.get('offer_id')
    const ip = searchParams.get('ip')
    const affSub4 = searchParams.get('aff_sub4')

    if (!offerId) {
      return NextResponse.json(
        { error: 'Missing offer_id' },
        { status: 400 }
      )
    }

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

    // Filter by offer_id
    let filtered = completions.filter((c: any) => c.offer_id === offerId)

    // Filter by IP if provided
    if (ip) {
      filtered = filtered.filter((c: any) => c.session_ip === ip)
    }

    // Filter by aff_sub4 if provided
    if (affSub4) {
      filtered = filtered.filter((c: any) => c.aff_sub4 === affSub4)
    }

    // Check if any completion exists (completed in last 24 hours)
    const now = Date.now()
    const recentCompletions = filtered.filter((c: any) => {
      const completionTime = c.timestamp || 0
      const hoursSinceCompletion = (now - completionTime) / (1000 * 60 * 60)
      return hoursSinceCompletion < 24 // Completed within last 24 hours
    })

    return NextResponse.json({
      completed: recentCompletions.length > 0,
      count: recentCompletions.length,
      completions: recentCompletions
    })
    
  } catch (error) {
    console.error('Error checking completion:', error)
    return NextResponse.json(
      { 
        completed: false,
        error: 'Error checking completion' 
      },
      { status: 500 }
    )
  }
}
