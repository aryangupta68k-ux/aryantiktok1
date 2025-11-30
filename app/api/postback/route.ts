import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

/**
 * OGAds Postback Handler
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

    // Store completion in Vercel KV
    const completionKey = `completion:${Date.now()}:${offer_id}:${session_ip || 'unknown'}`
    await kv.set(completionKey, completion_data)
    
    // Also add to list for easy retrieval
    await kv.lpush('all_completions', JSON.stringify(completion_data))
    await kv.ltrim('all_completions', 0, 9999) // Keep last 10k completions

    console.log('✅ Offer Completed:', JSON.stringify(completion_data, null, 2))
    
    // Return OK response (OGAds expects simple "OK" or 200 status)
    return new NextResponse('OK', { status: 200 })
    
  } catch (error) {
    console.error('❌ Error storing completion:', error)
    return NextResponse.json(
      { error: 'Error storing completion' },
      { status: 500 }
    )
  }
}

