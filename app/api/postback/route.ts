import { NextRequest, NextResponse } from 'next/server'

/**
 * OGAds Postback Handler using Edge Config
 * Receives completion notifications from OGAds when an offer is completed
 * 
 * OGAds will call this endpoint with query parameters:
 * - offer_id, offer_name, payout, session_ip, affiliate_id, etc.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    const {
      offer_id,
      offer_name,
      payout,
      session_ip,
      affiliate_id,
      aff_sub,
      aff_sub2,
      aff_sub3,
      aff_sub4,
      aff_sub5,
      source,
      date,
      time,
      datetime,
      session_timestamp,
      ran
    } = Object.fromEntries(searchParams.entries())

    if (!offer_id) {
      return NextResponse.json(
        { error: 'Missing offer_id' },
        { status: 400 }
      )
    }

    const completion_data = {
      offer_id,
      offer_name,
      payout,
      session_ip,
      affiliate_id,
      source,
      aff_sub,
      aff_sub2,
      aff_sub3,
      aff_sub4,
      aff_sub5,
      date,
      time,
      datetime,
      session_timestamp,
      ran,
      received_at: new Date().toISOString(),
      timestamp: Date.now()
    }

    // Store completion in Edge Config using REST API
    const edgeConfigId = process.env.EDGE_CONFIG_ID
    const edgeConfigToken = process.env.EDGE_CONFIG_WRITE_TOKEN

    if (!edgeConfigId || !edgeConfigToken) {
      console.error('❌ Edge Config not configured. Please set EDGE_CONFIG_ID and EDGE_CONFIG_WRITE_TOKEN')
      return NextResponse.json(
        { error: 'Edge Config not configured' },
        { status: 500 }
      )
    }

    // Create unique key for this completion
    const completionKey = `completion_${Date.now()}_${offer_id}_${session_ip || 'unknown'}`
    const allCompletionsKey = 'all_completions'

    // Get current completions list
    try {
      const currentCompletions = await fetch(
        `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items?key=${allCompletionsKey}`,
        {
          headers: {
            'Authorization': `Bearer ${edgeConfigToken}`,
            'Content-Type': 'application/json',
          }
        }
      )

      let completions = []
      if (currentCompletions.ok) {
        const data = await currentCompletions.json()
        try {
          completions = JSON.parse(data.value || '[]')
        } catch (e) {
          completions = []
        }
      }

      // Add new completion
      completions.push(completion_data)
      
      // Keep only last 1000 completions
      if (completions.length > 1000) {
        completions = completions.slice(-1000)
      }

      // Update Edge Config with new completion
      await fetch(
        `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${edgeConfigToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [
              {
                operation: 'update',
                key: allCompletionsKey,
                value: JSON.stringify(completions)
              },
              {
                operation: 'update',
                key: completionKey,
                value: JSON.stringify(completion_data)
              }
            ]
          })
        }
      )

      console.log('✅ Offer Completed (Edge Config):', JSON.stringify(completion_data, null, 2))
      
      // Return OK response (OGAds expects simple "OK" or 200 status)
      return new NextResponse('OK', { status: 200 })

    } catch (error) {
      console.error('❌ Error storing completion in Edge Config:', error)
      // Still return OK to OGAds to avoid retries
      return new NextResponse('OK', { status: 200 })
    }
    
  } catch (error) {
    console.error('❌ Error processing postback:', error)
    return NextResponse.json(
      { error: 'Error processing postback' },
      { status: 500 }
    )
  }
}
