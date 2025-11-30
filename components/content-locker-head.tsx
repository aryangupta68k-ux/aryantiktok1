'use client'

import Script from 'next/script'

export function ContentLockerHead() {
  return (
    <>
      <Script
        id="content-locker-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: 'var rbdyR_tUH_dESoFc={"it":4571963,"key":"643ea"};',
        }}
      />
      <Script
        id="content-locker-script"
        src="https://duw03nk63ml3f.cloudfront.net/8a9d398.js"
        strategy="afterInteractive"
      />
    </>
  )
}

