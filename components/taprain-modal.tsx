'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    showTapRainOffers: () => void
  }
}

export function TapRainModal() {
  useEffect(() => {
    function showTapRainOffers() {
      const overlay = document.createElement('div')
      overlay.className = 'tap-rain-modal-overlay'
      overlay.style.display = 'flex'
      overlay.style.backgroundColor = 'rgba(0,0,0,0.3)'

      const modal = document.createElement('div')
      modal.className = 'tap-rain-modal'

      const contentContainer = document.createElement('div')
      contentContainer.className = 'tap-rain-modal-content'
      contentContainer.innerHTML = "<div class=\"verify-text\">Verify You're a Human by Completing any 2 Offers</div><div class=\"offers-grid\"> <div id=\"offerContainer\" class=\"grid\"></div></div>"

      const style = document.createElement('style')
      style.textContent = ".verify-text { padding: 1.5rem 1rem 1rem 1rem; text-align: center; color: #ffffff; font-family: 'Helvetica', sans-serif; font-size: 1.25rem; font-weight: 600;}.offers-grid { padding: 1rem; background: #232323; border-radius: 8px;}.offer-item { background: #fd2d55; border: 1px solid #fd2d55; border-radius: 8px; padding: 1rem; color: #ffffff; font-family: 'Helvetica', sans-serif; font-size: 0.875rem; font-weight: 400; transition: all 200ms ease; cursor: pointer;}.offer-item:hover { background: #fd2d55; transform: translateY(-5px);}.offers-grid #offerContainer { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem;}.tap-rain-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: transparent; opacity: 1; display: flex; align-items: center; justify-content: center; z-index: 9999;}.tap-rain-modal { background: #fd2d55; width: 80%; max-width: 95%; max-height: 90vh; border-radius: 8px; overflow: auto; position: relative;}"

      modal.appendChild(contentContainer)
      overlay.appendChild(modal)
      document.head.appendChild(style)
      document.body.appendChild(overlay)

      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay)
          }
          if (document.head.contains(style)) {
            document.head.removeChild(style)
          }
        }
      })

      if (typeof (window as any).jQuery === 'undefined') {
        const script = document.createElement('script')
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'
        script.onload = loadOffers
        document.head.appendChild(script)
      } else {
        loadOffers()
      }

      function loadOffers() {
        fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(ipData => {
            const fromTikTok = document.referrer.toLowerCase().includes('tiktok.com') ||
                             window.location.search.includes('t=1') ||
                             window.location.search.includes('source=t') ||
                             window.location.search.includes('ref=tt')

            fetch('https://taprain.com/api/templates/offers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                s1: '6812772c9a592e971155e0c7',
                s2: 'modal-template',
                userAgent: navigator.userAgent,
                clientIp: ipData.ip,
                referer: document.referrer,
                templateId: 'custom-modal',
                offerCount: 4,
                fromTikTok: fromTikTok,
                urlParams: window.location.search
              })
            })
            .then(response => response.json())
            .then(data => {
              if (data.offers && data.offers.length > 0) {
                let html = ""

                data.offers.forEach((offer: any) => {
                  html += '<div class="offer-item" data-offer-id="' + offer.id +
                         '" data-offer-name="' + offer.anchor +
                         '" data-offer-url="' + offer.url +
                         '" data-provider="' + offer.provider + '">' +
                         '<div class="offer-title">' + offer.anchor + '</div>' +
                         '</div>'
                })

                const offerContainer = document.getElementById("offerContainer")
                if (offerContainer) {
                  offerContainer.innerHTML = html

                  offerContainer.addEventListener("click", function(e: any) {
                    const offerItem = e.target.closest(".offer-item")
                    if (offerItem) {
                      e.preventDefault()

                      const offerUrl = offerItem.getAttribute("data-offer-url")
                      const offerId = offerItem.getAttribute("data-offer-id")
                      const offerName = offerItem.getAttribute("data-offer-name")
                      const templateId = offerItem.getAttribute("data-template-id") || "custom-modal"
                      const provider = offerItem.getAttribute("data-provider") || "unknown"

                      if (offerUrl) {
                        const trackImg = new Image()
                        trackImg.src = 'https://taprain.com/api/stats/public-track-click?offerId=' +
                                      encodeURIComponent(offerId || '') +
                                      '&offerName=' + encodeURIComponent(offerName || '') +
                                      '&templateId=' + encodeURIComponent(templateId) +
                                      '&provider=' + encodeURIComponent(provider) +
                                      '&userId=' + encodeURIComponent("6812772c9a592e971155e0c7")

                        fetch('https://taprain.com/api/templates/track-click', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            offerId: offerId,
                            offerName: offerName,
                            templateId: templateId,
                            provider: provider,
                            userId: "6812772c9a592e971155e0c7",
                            timestamp: Date.now()
                          })
                        }).catch(error => {
                          console.log('Templates tracking backup failed:', error)
                        })

                        let finalUrl = offerUrl
                        if (!finalUrl.includes('notrack=')) {
                          finalUrl += (finalUrl.includes('?') ? '&' : '?') + 'notrack=true'
                        }

                        // Close modal before navigating
                        const overlay = document.querySelector('.tap-rain-modal-overlay')
                        if (overlay && overlay.parentNode) {
                          overlay.parentNode.removeChild(overlay)
                        }
                        const style = document.querySelector('style')
                        if (style && style.textContent && style.textContent.includes('tap-rain-modal')) {
                          if (style.parentNode) {
                            style.parentNode.removeChild(style)
                          }
                        }

                        setTimeout(function() {
                          window.location.href = finalUrl
                        }, 100)

                        console.log('Modal tracked offer click:', offerId, offerName, templateId, provider)
                      }
                    }
                  })
                }

                console.log('Modal loaded', data.offers.length, 'offers from dual provider system')
              } else {
                console.error("No offers received from dual provider system")
              }
            })
            .catch(error => {
              console.error("Error fetching offers:", error)
            })
          })
          .catch(error => {
            console.error("Error getting IP:", error)
          })
      }
    }

    window.showTapRainOffers = showTapRainOffers

    return () => {
      // Cleanup if needed
      if (window.showTapRainOffers) {
        delete window.showTapRainOffers
      }
    }
  }, [])

  return null
}

