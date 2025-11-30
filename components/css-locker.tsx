'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

interface CssLockerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  config?: {
    userId?: string
    apiKey?: string
    s1?: string
    s2?: string
    numOffers?: number
    testing?: number
  }
}

export function CssLocker({ isOpen, onOpenChange, config }: CssLockerProps) {
  const lockerRef = useRef<HTMLDivElement>(null)
  const [jqueryLoaded, setJqueryLoaded] = useState(false)
  const [scriptInitialized, setScriptInitialized] = useState(false)

  // Default config from the provided files
  const defaultConfig = {
    userId: '288577',
    apiKey: 'b7f07607f1402ee9712a68f1fc592125',
    s1: '',
    s2: '',
    numOffers: 5,
    testing: 0
  }

  const finalConfig = { ...defaultConfig, ...config }

  // Load jQuery check
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).jQuery && !jqueryLoaded) {
      setJqueryLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      // Cleanup when closed
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        const $ = (window as any).jQuery
        $('body').removeClass('ve-google-recaptcha-open')
        setScriptInitialized(false)
      }
      return
    }

    // Wait for jQuery to be available
    if (!jqueryLoaded || typeof window === 'undefined' || !(window as any).jQuery) {
      return
    }

    // Initialize the locker script
    if (typeof window !== 'undefined' && (window as any).jQuery && !scriptInitialized) {
      const $ = (window as any).jQuery

      // Add jQuery style plugin (required by original script)
      if (!$.fn.style) {
        (function($) {
          var escape = function(text: string) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
          };

          var isStyleFuncSupported = !!CSSStyleDeclaration.prototype.getPropertyValue;
          if (!isStyleFuncSupported) {
            CSSStyleDeclaration.prototype.getPropertyValue = function(a: string) {
              return (this as any).getAttribute(a);
            };
            CSSStyleDeclaration.prototype.setProperty = function(styleName: string, value: string, priority?: string) {
              (this as any).setAttribute(styleName, value);
              var priorityValue = typeof priority != 'undefined' ? priority : '';
              if (priorityValue != '') {
                var rule = new RegExp(escape(styleName) + '\\s*:\\s*' + escape(value) +
                  '(\\s*;)?', 'gmi');
                (this as any).cssText =
                  (this as any).cssText.replace(rule, styleName + ': ' + value + ' !' + priorityValue + ';');
              }
            };
            CSSStyleDeclaration.prototype.removeProperty = function(a: string) {
              return (this as any).removeAttribute(a);
            };
            (CSSStyleDeclaration.prototype as any).getPropertyPriority = function(styleName: string) {
              var rule = new RegExp(escape(styleName) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?',
                'gmi');
              return rule.test((this as any).cssText) ? 'important' : '';
            }
          }

          $.fn.style = function(styleName?: string, value?: string, priority?: string) {
            var node = this.get(0);
            if (typeof node == 'undefined') {
              return this;
            }
            var style = this.get(0).style;
            if (typeof styleName != 'undefined') {
              if (typeof value != 'undefined') {
                priority = typeof priority != 'undefined' ? priority : '';
                style.setProperty(styleName, value, priority);
                return this;
              } else {
                return style.getPropertyValue(styleName);
              }
            } else {
              return style;
            }
          };
        })($);
      }

      // Small delay to ensure DOM is ready
      const initLocker = () => {
        // Check if DOM element exists
        if ($('#my-locker-body-human-verification').length === 0) {
          console.log('Waiting for DOM element...')
          setTimeout(initLocker, 100)
          return
        }
        
        console.log('Initializing CSS locker...')

        // Check if already unlocked
        const checkUnlockStatus = () => {
        const unlocked = localStorage.getItem('content_locker_unlocked')
        if (unlocked === 'true') {
          const unlockTime = parseInt(localStorage.getItem('content_locker_unlocked_time') || '0')
          const now = Date.now()
          const expiresAfter = 24 * 60 * 60 * 1000 // 24 hours
          if (now - unlockTime < expiresAfter) {
            onOpenChange(false)
            return true
          } else {
            localStorage.removeItem('content_locker_unlocked')
            localStorage.removeItem('content_locker_unlocked_time')
          }
        }
        return false
      }

      if (checkUnlockStatus()) {
        return
      }

      // Detect mobile
      if ($(window).width() <= 768) {
        $('body').addClass('mobile')
      }

        // Remove existing elements
      $('#ve-google-recaptcha').remove()
      $('#my-locker-body-offers #verifying').remove()
      $('#ve-google-recaptcha-overlay').remove()

      // Add reCAPTCHA
      $('#my-locker-body-human-verification')
        .append('<div id="ve-google-recaptcha">' +
          '<div id="container">' +
          '<div id="validation">' +
          '<div id="square"></div>' +
          '<div id="circle-acting"></div>' +
          '<div id="circle-loading"></div>' +
          '</div>' +
          '<div id="not-a-robot">I\'m not a robot</div>' +
          '<div id="logo">' +
          '<img src="https://i.imgur.com/HqnV16O.png" />' +
          '<div id="details">' +
          '<center>Captcha</center>' +
          '<div id="links">' +
          '<a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" id="privacy">Privacy</a>' +
          '<a href="https://www.google.com/intl/en/policies/terms/" target="_blank">Terms</a>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>')

      // Add verify button
      $('#my-locker-body-offers')
        .append('<div id="verifying">' +
          '<div id="verify-container">' +
          '<div id="options">' +
          '<img src="https://i.imgur.com/eUq0zmO.png" />' +
          '</div>' +
          '<div id="button">' +
          '<button>Verify</button>' +
          '</div>' +
          '</div>' +
          '</div>')

      const $recaptcha = $('#ve-google-recaptcha')
      let useOffers: any[] = []

      // Load Adsbluemedia offers
      const loadAdsbluemediaOffers = () => {
        const offersList = $('#my-locker-body-offers-list')
        offersList.html('<div style="text-align:center;padding:20px;">Loading offers...</div>')

        // Use exact URL format from AdsBlueMedia documentation
        const feedUrl = 'https://d2xohqmdyl2cj3.cloudfront.net/public/offers/feed.php?' +
          'user_id=' + encodeURIComponent(finalConfig.userId) +
          '&api_key=' + encodeURIComponent(finalConfig.apiKey) +
          '&s1=' + encodeURIComponent(finalConfig.s1 || '') +
          '&s2=' + encodeURIComponent(finalConfig.s2 || '') +
          '&callback=?'

        $.getJSON(feedUrl, function (offers: any[]) {
          offersList.empty()
          useOffers = []

          if (!offers || offers.length === 0) {
            offersList.html('<div style="text-align:center;padding:20px;color:#999;">No offers available at this time.</div>')
            return
          }

          const numOffers = finalConfig.numOffers || 5
          const limitedOffers = offers.slice(0, Math.min(numOffers, 10))

          limitedOffers.forEach((offer: any) => {
            if (offer && offer.url && offer.anchor) {
              useOffers.push({
                url: offer.url,
                anchor: offer.anchor,
                conversion: offer.conversion || 'High Conversion'
              })

              // Create link element with proper attributes
              const link = $('<a>', {
                href: offer.url,
                target: '_blank',
                rel: 'noopener noreferrer',
                title: offer.conversion || '',
                css: {
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }
              })

              // Add click handler to ensure navigation works
              link.on('click', function(e: any) {
                console.log('Offer clicked:', offer.url)
                // Open in new window
                window.open(offer.url, '_blank', 'noopener,noreferrer')
                e.preventDefault() // Prevent default after opening
                return false
              })

              link.append('<span>' + offer.anchor + '</span>')

              const rightSide = $('<div>', {
                css: {
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 'auto'
                }
              })
              rightSide.append('<div class="rating"><img src="https://i.imgur.com/wrrR1cu.png" /></div>')
              link.append(rightSide)

              offersList.append(link)
            }
          })

          if (useOffers.length === 0) {
            offersList.html('<div style="text-align:center;padding:20px;color:#999;">No valid offers found.</div>')
          }
        }).fail(function () {
          offersList.html('<div style="text-align:center;padding:20px;color:#f00;">Error loading offers. Please check your API credentials.</div>')
        })
      }

      // Check for lead completion (matches AdsBlueMedia documentation)
      const checkLeads = () => {
        const checkUrl = 'https://d2xohqmdyl2cj3.cloudfront.net/public/external/check2.php?' +
          'testing=' + finalConfig.testing +
          '&callback=?'

        $.getJSON(checkUrl, function (leads: any[]) {
          const completed_leads = leads ? leads.length : 0
          
          if (completed_leads) {
            const offer_ids: number[] = []
            let earnings_in_cents = 0
            
            $.each(leads, function(key: number, lead: any) {
              offer_ids.push(parseInt(lead.offer_id))
              earnings_in_cents += parseFloat(lead.points)
              
              // Log individual lead (matching documentation)
              console.log("Single lead on offer id " + lead.offer_id + " for $" + (parseFloat(lead.points) / 100).toFixed(2))
            })
            
            // Log summary (matching documentation)
            console.log("SUMMARY: User has completed " + completed_leads + " leads, for $" + (earnings_in_cents / 100).toFixed(2) + " earnings, on offer ids: " + offer_ids.join(","))
            
            // Unlock content if lead is completed
            localStorage.setItem('content_locker_unlocked', 'true')
            localStorage.setItem('content_locker_unlocked_time', Date.now().toString())
            setTimeout(() => {
              onOpenChange(false)
            }, 1000)
          } else {
            console.log("No leads were found")
          }
        })
      }

      // Wait a bit for DOM to be ready, then attach handlers
      setTimeout(() => {
        const $square = $('#square')
        const $notARobot = $('#not-a-robot')
        
        console.log('Attaching click handlers, square exists:', $square.length, 'not-a-robot exists:', $notARobot.length)

        // Handle reCAPTCHA square click
        $square.off('click').on('click', function (this: HTMLElement) {
          if (!$(this).is(':visible')) {
            return
          }

          console.log('reCAPTCHA square clicked')
          $(this).hide()
          $('#circle-acting', $recaptcha).show()

          setTimeout(() => {
            $('#circle-acting', $recaptcha).hide()
            $('#circle-loading', $recaptcha).show()

            setTimeout(() => {
              $('#circle-loading', $recaptcha).hide()
              $('#my-locker-body-offers').show()
              $('body').addClass('ve-google-recaptcha-open')
              loadAdsbluemediaOffers()

              // Start checking for lead completion every 15 seconds
              setInterval(checkLeads, 15000)
            }, 800)
          }, 1200)
        })

        // Handle "I'm not a robot" click
        $notARobot.off('click').on('click', function () {
          console.log('Not a robot clicked')
          $square.trigger('click')
        })
      }, 200)

      // Handle verify button
      $('#verifying #button button').on('click', function (this: HTMLElement) {
        checkLeads()
      })

      // Handle options click
      $('#options').on('click', function () {
        alert('Disabled due to high server load. Please try again later.')
      })

      // Positioning function (matches original script)
      const centerHorizontally = true
      const centerVertically = false
      
      const moveOfferList = () => {
        const width = $(window).width() || 0
        const height = $(window).height() || 0
        const isForMobile = !$('body').hasClass('mobile') || $('body').hasClass('editing') ? false : true

        if (centerVertically) {
          $('#my-locker').style('margin-top', '0px', 'important')
          $('#ve-google-recaptcha').style('margin-top', ((height/2)-36)+'px', 'important')
          $('#my-locker-body-offers').css('margin-top', ((height/2)-191)+'px').css('top', '0')
        } else {
          $('#my-locker').style('margin-top', (isForMobile === false ? '20px' : '2%'), 'important')
          $('#ve-google-recaptcha').style('margin-top', '0', 'important')
          $('#my-locker-body-offers').css('margin-top', '0').css('top', '38px')
        }

        if (centerHorizontally === true) {
          const lockerMarginLeft = (isForMobile === false ? ((width/2)-165)+'px' : 'auto')
          const lockerOffersLeft = (isForMobile === false ? ((width/2)-(centerVertically ? 183 : 102))+'px' : '50%')
          $('#my-locker').style('margin-left', lockerMarginLeft, 'important')
          $('#my-locker-body-offers').css('left', lockerOffersLeft)
        } else {
          $('#my-locker').style('margin-left', (isForMobile === false ? '20px' : 'auto'), 'important').css('left', '0')
          $('#my-locker-body-offers').css('left', (isForMobile === false ? '82px' : '50%'))
        }
      }

      // Add overlay
      $('#my-locker').append('<div id="ve-google-recaptcha-overlay"></div>')

        // Initialize positioning
        moveOfferList()

        $(window).on('resize', moveOfferList)

        setScriptInitialized(true)
        console.log('CSS locker initialized successfully')
      }

      // Start initialization
      initLocker()
    }

    // Cleanup function
    return () => {
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        const $ = (window as any).jQuery
        $(window).off('resize')
        $('#square').off('click')
        $('#not-a-robot').off('click')
        $('#verifying #button button').off('click')
        $('#options').off('click')
      }
    }
  }, [isOpen, jqueryLoaded, scriptInitialized, finalConfig, onOpenChange])

  return (
    <>
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"
        onLoad={() => {
          setJqueryLoaded(true)
          console.log('jQuery 1.12.4 loaded successfully')
        }}
        onError={() => {
          console.error('Failed to load jQuery')
        }}
        strategy="afterInteractive"
        id="jquery-script"
      />
      <div 
        id="my-locker" 
        ref={lockerRef}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div id="my-locker-body">
          <div id="my-locker-body-human-verification"></div>
          <div id="my-locker-body-offers" style={{ display: 'none' }}>
            <div className="my-locker-body-text-top">
              <strong>Complete an offer to verify you&apos;re a human</strong>
            </div>
            <div id="my-locker-body-offers-list"></div>
          </div>
        </div>
      </div>
    </>
  )
}

