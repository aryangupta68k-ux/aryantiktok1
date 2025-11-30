'use client'

import { useEffect } from 'react'
import Script from 'next/script'

/**
 * OGAds Content Locker Component
 * Integrates the vanilla JS OGAds content locker into Next.js
 */
export function OgadsContentLocker() {
  useEffect(() => {
    // Ensure scripts are loaded and initialized
    if (typeof window !== 'undefined') {
      // The content-locker.js will handle initialization automatically
      // when jQuery and all scripts are loaded
      console.log('OGAds Content Locker component mounted');
    }
  }, [])

  return (
    <>
      {/* Load jQuery first */}
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="afterInteractive"
        id="jquery-script"
      />
      
      {/* Load Motio for animations */}
      <Script
        src="https://cdn.jsdelivr.net/npm/motio@0.8.4/dist/motio.min.js"
        strategy="afterInteractive"
        id="motio-script"
      />
      
      {/* Load OGAds config */}
      <Script
        src="/config.js"
        strategy="afterInteractive"
        id="config-script"
      />
      
      {/* Load Offer API */}
      <Script
        src="/offer-api.js"
        strategy="afterInteractive"
        id="offer-api-script"
      />
      
      {/* Load Content Locker */}
      <Script
        src="/content-locker.js"
        strategy="afterInteractive"
        id="content-locker-script"
      />
    </>
  )
}

