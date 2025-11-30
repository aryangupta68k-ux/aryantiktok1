/* EDIT THESE VARIABLES */

var centerHorizontally = true;
var centerVertically = false;

/* DON'T EDIT BELOW HERE */

(function($) {    
  if ($.fn.style) {
    return;
  }

  // Escape regex chars with \
  var escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  // For those who need them (< IE 9), add support for CSS functions
  var isStyleFuncSupported = !!CSSStyleDeclaration.prototype.getPropertyValue;
  if (!isStyleFuncSupported) {
    CSSStyleDeclaration.prototype.getPropertyValue = function(a) {
      return this.getAttribute(a);
    };
    CSSStyleDeclaration.prototype.setProperty = function(styleName, value, priority) {
      this.setAttribute(styleName, value);
      var priority = typeof priority != 'undefined' ? priority : '';
      if (priority != '') {
        // Add priority manually
        var rule = new RegExp(escape(styleName) + '\\s*:\\s*' + escape(value) +
            '(\\s*;)?', 'gmi');
        this.cssText =
            this.cssText.replace(rule, styleName + ': ' + value + ' !' + priority + ';');
      }
    };
    CSSStyleDeclaration.prototype.removeProperty = function(a) {
      return this.removeAttribute(a);
    };
    CSSStyleDeclaration.prototype.getPropertyPriority = function(styleName) {
      var rule = new RegExp(escape(styleName) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?',
          'gmi');
      return rule.test(this.cssText) ? 'important' : '';
    }
  }

  // The style function
  $.fn.style = function(styleName, value, priority) {
    // DOM node
    var node = this.get(0);
    // Ensure we have a DOM node
    if (typeof node == 'undefined') {
      return this;
    }
    // CSSStyleDeclaration
    var style = this.get(0).style;
    // Getter/Setter
    if (typeof styleName != 'undefined') {
      if (typeof value != 'undefined') {
        // Set style property
        priority = typeof priority != 'undefined' ? priority : '';
        style.setProperty(styleName, value, priority);
        return this;
      } else {
        // Get style property
        return style.getPropertyValue(styleName);
      }
    } else {
      // Get CSSStyleDeclaration
      return style;
    }
  };
})(jQuery);

var moveOfferList = function() {
    var width = $(window).width();
    var height = $(window).height();

    // If it's not for Mobile.
    var isForMobile = (!$('body').hasClass('mobile') || $('body').hasClass('editing') ? false : true);

    if (centerVertically == true) {
        $('#my-locker').style('margin-top', '0px', 'important');
        $('#ve-google-recaptcha').style('margin-top', ((height/2)-36)+'px', 'important');
        // Don't position offers modal here - it's centered by CSS
    }
    else {
        $('#my-locker').style('margin-top', (isForMobile === false ? '20px' : '2%'), 'important');
        $('#ve-google-recaptcha').style('margin-top', '0', 'important');
        // Don't position offers modal here - it's centered by CSS
    }

    // If we're centering everything horizontally.
    if (centerHorizontally === true) {
        // Determine what positions we'll change to.
        var lockerMarginLeft = (isForMobile === false ? ((width/2)-165)+'px' : 'auto');

        $('#my-locker').style('margin-left', lockerMarginLeft, 'important');
        // Don't position offers modal here - it's handled by CSS with center positioning
    }
    else {
        $('#my-locker').style('margin-left', (typeof editing !== 'undefined' && editing === true ? '360px' : (isForMobile === false ? '20px' : 'auto')), 'important').css('left', 0);
        // Don't position offers modal here - it's handled by CSS with center positioning
    }
    
    // Always center the offers modal using CSS transform (don't override)
    // The CSS already handles this with !important rules
};

// Global variable to store offers from API
var useOffers = [];

// Function to load offers from API
function loadOffersFromAPI() {
    if (typeof OfferAPI !== 'undefined' && typeof ContentLockerConfig !== 'undefined') {
        OfferAPI.fetchOffers()
            .then(function(offers) {
                // Store offers globally
                useOffers = offers;
                
                // Populate offers in the list
                populateOffersList();
            })
            .catch(function(error) {
                console.error('Error loading offers:', error);
                // Show error message or use empty array
                useOffers = [];
                populateOffersList();
            });
    } else {
        console.warn('OfferAPI or ContentLockerConfig not loaded. Using empty offers array.');
        useOffers = [];
        populateOffersList();
    }
}

// Function to populate offers in the list
function populateOffersList() {
    var list = $('#my-locker-body-offers-list');
    list.empty(); // Clear existing items
    
    // Create offer items from API data
    for (var i = 0; i < useOffers.length; i++) {
        var offer = useOffers[i];
        
        if (offer && typeof offer === 'object') {
            var offerTitle = ('title' in offer ? offer.title : ('name' in offer ? offer.name : 'Complete Offer'));
            var offerDescription = ('description' in offer ? offer.description : offerTitle);
            var offerImage = ('image' in offer ? offer.image : ('thumbnail' in offer ? offer.thumbnail : ''));
            
            // Create offer tile matching the exact design
            var imageHtml = '';
            if (offerImage) {
                imageHtml = '<img src="' + offerImage + '" alt="' + offerTitle + '" onerror="this.style.display=\'none\';" />';
            }
            
            var offerItem = $('<a href="#" class="offer-tile"></a>')
                .append('<div class="offer-image-wrapper">' + imageHtml + '</div>')
                .append('<div class="offer-content">' +
                    '<div class="offer-title">' + offerTitle + '</div>' +
                    '<div class="offer-description">' + offerDescription + '</div>' +
                    '</div>');
            
            list.append(offerItem);
        }
    }
    
    // If no offers, show message
    if (useOffers.length === 0) {
        list.html('<div style="padding: 20px; text-align: center; color: #666;">No offers available at this time.</div>');
    }
}

// Function to handle offer click
function handleOfferClick(offer) {
    // Get offer URL from response mapping
    var offerUrl = null;
    if (typeof ContentLockerConfig !== 'undefined' && ContentLockerConfig.responseMapping) {
        var urlField = ContentLockerConfig.responseMapping.offerUrl || 'link';
        offerUrl = offer[urlField] || offer.url || offer.link;
    } else {
        offerUrl = offer.url || offer.link;
    }
    
    // Open offer in same tab
    if (offerUrl) {
        window.location.href = offerUrl;
    }
    
    // Show verifying section
    $('#verifying').show();
    
    // After a delay, verify completion
    setTimeout(function() {
        // Call verification complete callback
        if (typeof ContentLockerConfig !== 'undefined' && typeof ContentLockerConfig.onVerificationComplete === 'function') {
            ContentLockerConfig.onVerificationComplete();
        } else {
            // Fallback: close modal and continue
            closeContentLocker();
            executeOriginalApplyNowAction();
        }
    }, 2000);
}

// Function to close content locker
function closeContentLocker() {
    $('#my-locker').hide();
    $('#my-locker-body-offers').hide();
    $('#my-locker-body-human-verification').hide();
    $('body').removeClass('ve-google-recaptcha-open');
    $('#ve-google-recaptcha-overlay').hide();
    
    // Restore body scrolling
    var scrollY = document.body.getAttribute('data-scroll-y') || '0';
    var scrollX = document.body.getAttribute('data-scroll-x') || '0';
    
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    
    // Restore scroll position
    window.scrollTo(parseInt(scrollX), parseInt(scrollY));
    document.body.removeAttribute('data-scroll-y');
    document.body.removeAttribute('data-scroll-x');
    
    // Show the Apply Now button again
    $('#apply-now-btn').css('visibility', 'visible').css('opacity', '1');
}

// Function to execute original Apply Now action
function executeOriginalApplyNowAction() {
    if (typeof ContentLockerConfig !== 'undefined' && ContentLockerConfig.originalApplyNowUrl) {
        window.location.href = ContentLockerConfig.originalApplyNowUrl;
    } else if (typeof ContentLockerConfig !== 'undefined' && ContentLockerConfig.originalApplyNowFormSelector) {
        var form = document.querySelector(ContentLockerConfig.originalApplyNowFormSelector);
        if (form) {
            form.submit();
        }
    }
}

// Initialize content locker
function initContentLocker() {
    // Detect mobile
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                   window.innerWidth <= 768;
    
    if (isMobile) {
        document.body.classList.add('mobile');
    }
    
    // Wait for button to be available
    var button = document.getElementById('apply-now-btn');
    if (!button && typeof $ !== 'undefined') {
        button = $('#apply-now-btn')[0];
    }
    
    if (button) {
        // Remove any existing handlers
        if (typeof $ !== 'undefined') {
            $('#apply-now-btn').off('click').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Apply Now button clicked');
                openContentLocker();
            });
        } else {
            // Fallback without jQuery
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Apply Now button clicked (no jQuery)');
                openContentLocker();
            });
        }
        console.log('Apply Now button bound successfully');
    } else {
        console.error('Apply Now button not found! Make sure your button has id="apply-now-btn"');
    }
}

// Function to open content locker
function openContentLocker() {
    console.log('=== Opening content locker ===');
    
    // Get button position BEFORE hiding it - CRITICAL: Do this first!
    var $button = $('#apply-now-btn');
    var buttonRect = null;
    var buttonHeight = null;
    
    if ($button.length === 0) {
        console.error('❌ Apply Now button not found! Make sure the button has id="apply-now-btn"');
        return;
    }
    
    // Use getBoundingClientRect() for position: fixed (viewport coordinates)
    var buttonElement = $button[0];
    
    // Force a layout recalculation to ensure accurate position
    buttonElement.offsetHeight;
    
    // Get position BEFORE making any changes to body
    buttonRect = buttonElement.getBoundingClientRect();
    buttonHeight = buttonRect.height || buttonElement.offsetHeight;
    
    // Validate we got a valid position
    if (!buttonRect || (buttonRect.width <= 0 || buttonRect.height <= 0)) {
        console.error('❌ Button has invalid dimensions:', buttonRect);
        // Try waiting a bit and retrying
        setTimeout(function() {
            buttonRect = buttonElement.getBoundingClientRect();
            buttonHeight = buttonRect.height || buttonElement.offsetHeight;
            if (buttonRect && buttonRect.width > 0 && buttonRect.height > 0) {
                openContentLocker();
            }
        }, 100);
        return;
    }
    
    console.log('🔍 Button position captured:', {
        top: buttonRect.top,
        left: buttonRect.left,
        width: buttonRect.width,
        height: buttonHeight,
        visible: buttonElement.offsetParent !== null
    });
    
    // Hide the Apply Now button when clicked
    $button.css({
        'visibility': 'hidden',
        'opacity': '0',
        'pointer-events': 'none'
    });
    
    // Check if jQuery is available
    if (typeof $ === 'undefined') {
        console.error('jQuery is not available!');
        alert('Error: jQuery is not loaded. Please check your script tags.');
        return;
    }
    
    // Show locker
    var $locker = $('#my-locker');
    if (!$locker || $locker.length === 0) {
        console.error('Content locker not found! Make sure the modal structure was created.');
        alert('Error: Content locker modal not found. Please refresh the page.');
        return;
    }
    
    console.log('Opening offer wall directly (CAPTCHA skipped)...');
    
    // Hide CAPTCHA section - we're skipping it
    $('#my-locker-body-human-verification').hide();
    $('#ve-google-recaptcha').hide();
    
    // Prevent body scrolling
    var scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    var scrollX = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft;
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollY + 'px';
    document.body.style.left = '-' + scrollX + 'px';
    document.body.style.width = '100%';
    
    // Store scroll position for restoration later
    document.body.setAttribute('data-scroll-y', scrollY);
    document.body.setAttribute('data-scroll-x', scrollX);
    
    // Show overlay on mobile
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                   window.innerWidth <= 768;
    if (isMobile) {
        $('body').addClass('ve-google-recaptcha-open');
    }
    
    // Ensure locker is visible
    $locker.css({
        'display': 'block',
        'visibility': 'visible',
        'opacity': '1'
    }).show();
    
    // Load offers and show offer wall directly
    loadOffersFromAPI();
    
    // Show offers modal centered
    setTimeout(function() {
        var $offersModal = $('#my-locker-body-offers');
        $offersModal.css({
            'position': 'fixed',
            'left': '50%',
            'top': '50%',
            'transform': 'translate(-50%, -50%)',
            'margin': '0',
            'display': 'flex'
        }).show();
        
        // Show VERIFY button
        $('#verifying').show();
        
        console.log('✅ Offer wall displayed');
    }, 100);
    
    // Position CAPTCHA at the exact location of the Apply Now button
    // Function to position CAPTCHA (will retry if element doesn't exist)
    // This function uses the buttonRect captured at the start
    var positionCaptcha = function(attempt) {
        attempt = attempt || 0;
        var maxAttempts = 20;
        
        var $captcha = $('#ve-google-recaptcha');
        
        if ($captcha.length === 0) {
            if (attempt < maxAttempts) {
                console.log('⏳ CAPTCHA element not found, retrying... (attempt ' + (attempt + 1) + '/' + maxAttempts + ')');
                setTimeout(function() {
                    positionCaptcha(attempt + 1);
                }, 50);
                return;
            } else {
                console.error('❌ CAPTCHA element not found after ' + maxAttempts + ' attempts');
                return;
            }
        }
        
        // Validate button position - allow positions >= 0 (button can be at top/left edge)
        if (!buttonRect || !buttonHeight || buttonRect.width <= 0 || buttonRect.height <= 0) {
            console.error('❌ Button position invalid:', {
                buttonRect: buttonRect,
                buttonHeight: buttonHeight,
                isValid: buttonRect !== null && buttonRect.width > 0 && buttonRect.height > 0
            });
            return;
        }
        
        // If button is off-screen or has zero dimensions, warn but still try to position
        if (buttonRect.top < 0 || buttonRect.left < 0) {
            console.warn('⚠️ Button appears to be partially or fully off-screen:', {
                top: buttonRect.top,
                left: buttonRect.left
            });
        }
        
        // Calculate position - exactly overlay the button
        // buttonRect was captured BEFORE body was fixed, so these are viewport coordinates
        // which are still valid for position: fixed elements
        var captchaWidth = 330; // CAPTCHA box width
        var captchaHeight = 72; // CAPTCHA box height
        
        // Position CAPTCHA to overlay the button exactly
        // For vertical: center CAPTCHA on button
        var captchaTop = buttonRect.top + ((buttonHeight - captchaHeight) / 2);
        
        // For horizontal: if button is wider than CAPTCHA, center it; otherwise align left
        var captchaLeft;
        if (buttonRect.width >= captchaWidth) {
            captchaLeft = buttonRect.left + ((buttonRect.width - captchaWidth) / 2);
        } else {
            captchaLeft = buttonRect.left;
        }
        
        // Ensure it's not off-screen (but allow negative if button is partially off-screen)
        captchaTop = Math.max(0, captchaTop);
        captchaLeft = Math.max(0, captchaLeft);
        
        console.log('📍 Calculating CAPTCHA position:', {
            buttonRect: {
                top: buttonRect.top,
                left: buttonRect.left,
                width: buttonRect.width,
                height: buttonRect.height
            },
            captchaPosition: {
                top: captchaTop,
                left: captchaLeft
            }
        });
        
        var captchaElement = $captcha[0];
        
        if (!captchaElement) {
            console.error('❌ CAPTCHA element is null');
            return;
        }
        
        // ALWAYS move CAPTCHA to body FIRST before positioning to ensure true fixed positioning
        // This breaks out of any parent containers that might create a positioning context
        var parentNode = captchaElement.parentNode;
        if (parentNode && parentNode !== document.body) {
            // Remove from current parent and append to body
            try {
                parentNode.removeChild(captchaElement);
                document.body.appendChild(captchaElement);
                console.log('✅ Moved CAPTCHA to body for true fixed positioning (parent was: ' + (parentNode.id || parentNode.tagName) + ')');
            } catch (e) {
                console.error('Error moving CAPTCHA to body:', e);
            }
        }
        
        // Reset CAPTCHA state
        var $square = $('#square', captchaElement);
        var $circleActing = $('#circle-acting', captchaElement);
        var $circleLoading = $('#circle-loading', captchaElement);
        if ($square.length) $square.show();
        if ($circleActing.length) $circleActing.hide();
        if ($circleLoading.length) $circleLoading.hide();
        
        // CRITICAL: Clear ALL inline styles first to remove any conflicting positioning
        // Then we'll set all styles properly in applyPosition
        captchaElement.removeAttribute('style');
        
        // Set position using native style API with !important to ensure viewport-relative positioning
        // Do this multiple times to ensure it sticks
        var applyPosition = function() {
            // Clear and set all styles
            captchaElement.style.cssText = 'position: fixed !important; ' +
                'top: ' + captchaTop + 'px !important; ' +
                'left: ' + captchaLeft + 'px !important; ' +
                'transform: none !important; ' +
                'margin: 0 !important; ' +
                'z-index: 99999 !important; ' +
                'right: auto !important; ' +
                'bottom: auto !important; ' +
                'width: 330px !important; ' +
                'height: 72px !important; ' +
                'display: block !important; ' +
                'visibility: visible !important; ' +
                'opacity: 1 !important;';
        };
        
        // Apply position immediately
        applyPosition();
        
        // Also set via jQuery for compatibility
        $captcha.css({
            'position': 'fixed',
            'top': captchaTop + 'px',
            'left': captchaLeft + 'px',
            'transform': 'none',
            'margin': '0',
            'z-index': '99999',
            'right': 'auto',
            'bottom': 'auto',
            'display': 'block',
            'visibility': 'visible',
            'opacity': '1'
        });
        
        // Force re-apply via native API after jQuery (to override any jQuery styles)
        setTimeout(function() {
            applyPosition();
            // Force a repaint
            captchaElement.offsetHeight;
        }, 50);
        
        // Verify positioning was applied
        var computedStyle = window.getComputedStyle(captchaElement);
        var actualTop = computedStyle.top;
        var actualLeft = computedStyle.left;
        var actualPosition = computedStyle.position;
        
        console.log('✅ CAPTCHA positioned at button location:', {
            calculated: {
                top: captchaTop + 'px',
                left: captchaLeft + 'px'
            },
            actualComputed: {
                top: actualTop,
                left: actualLeft,
                position: actualPosition
            },
            inlineStyle: {
                top: captchaElement.style.top,
                left: captchaElement.style.left,
                position: captchaElement.style.position
            },
            buttonRect: {
                top: buttonRect.top,
                left: buttonRect.left,
                width: buttonRect.width,
                height: buttonRect.height
            },
            parent: captchaElement.parentNode ? (captchaElement.parentNode.id || captchaElement.parentNode.tagName) : 'none'
        });
        
        // Final verification - if still not positioned correctly, try one more time
        if (actualTop === '0px' || actualTop === 'auto' || actualLeft === '0px' || actualLeft === 'auto' || actualPosition !== 'fixed') {
            console.warn('⚠️ Warning: CAPTCHA positioning not applied correctly. Forcing re-apply...');
            setTimeout(function() {
                applyPosition();
                // Force a repaint
                captchaElement.offsetHeight;
            }, 100);
        }
    };
    
    // Position CAPTCHA was already called above after body is fixed
    // This ensures the position is calculated correctly after scroll lock
    
    // Verify visibility and ensure CAPTCHA is visible
    console.log('Locker visible:', $locker.is(':visible'));
    console.log('CAPTCHA section visible:', $captchaSection.is(':visible'));
    console.log('CAPTCHA element found:', $('#ve-google-recaptcha').length);
    
    // Ensure CAPTCHA element is visible after positioning - multiple attempts
    var ensureCaptchaVisible = function(attempt) {
        attempt = attempt || 0;
        var $captcha = $('#ve-google-recaptcha');
        if ($captcha.length > 0) {
            var captchaEl = $captcha[0];
            $captcha.css({
                'display': 'block',
                'visibility': 'visible',
                'opacity': '1',
                'z-index': '99999'
            }).show();
            
            // Also set directly on element
            if (captchaEl) {
                captchaEl.style.display = 'block';
                captchaEl.style.visibility = 'visible';
                captchaEl.style.opacity = '1';
                captchaEl.style.zIndex = '99999';
            }
            
            console.log('✅ CAPTCHA visibility forced (attempt ' + (attempt + 1) + ')');
            
            // Try a few more times to ensure it sticks
            if (attempt < 3) {
                setTimeout(function() {
                    ensureCaptchaVisible(attempt + 1);
                }, 100);
            }
        } else if (attempt < 5) {
            setTimeout(function() {
                ensureCaptchaVisible(attempt + 1);
            }, 150);
        }
    };
    
    // Start ensuring visibility
    setTimeout(function() {
        ensureCaptchaVisible(0);
    }, 100);
    setTimeout(function() {
        ensureCaptchaVisible(0);
    }, 300);
    
    console.log('=== Content locker opened ===');
}

$(document).ready(function() {
    // Check if jQuery is loaded
    if (typeof jQuery === 'undefined' && typeof $ === 'undefined') {
        console.error('jQuery is not loaded! Please include jQuery before content-locker.js');
        return;
    }
    
    console.log('Initializing content locker...');
    
    // Remove existing elements if they exist
    $('#ve-google-recaptcha').remove();
    $('#my-locker-body-offers #verifying').remove();
    $('#ve-google-recaptcha-overlay').remove();

    // Create modal structure if it doesn't exist
    if ($('#my-locker').length === 0) {
        $('body').append('<div id="my-locker" style="display: none;">' +
            '<div id="my-locker-body-human-verification"></div>' +
            '<div id="my-locker-body-offers" style="display: none;">' +
                '<div class="my-locker-body-text-top">' +
                    '<strong>Verify you are a Human by completing 2 offers below</strong>' +
                '</div>' +
                '<div id="my-locker-body-offers-list"></div>' +
                '<div id="verifying">' +
                    '<div id="verify-container">' +  
                        '<div id="button">' +
                            '<button>VERIFY</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');
    }

    // Create CAPTCHA element - New design with logo on left and Verify button on right
    $('#my-locker-body-human-verification')
        .append('<div id="ve-google-recaptcha">' +
                    '<div id="container">' +
                        '<div id="logo-section">' +
                            '<svg id="recaptcha-logo" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
                                '<circle cx="16" cy="16" r="14" fill="none" stroke="#E0E0E0" stroke-width="1.5"/>' +
                                '<path d="M 16 6 Q 22 10 24 16" stroke="#4285F4" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
                                '<path d="M 24 16 Q 22 22 16 26" stroke="#1A73E8" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
                                '<path d="M 16 26 Q 10 22 8 16" stroke="#9E9E9E" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
                                '<path d="M 8 16 Q 10 10 16 6" stroke="#4285F4" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>' +
                            '</svg>' +
                            '<div id="recaptcha-text">reCAPTCHA</div>' +
                        '</div>' +
                        '<div id="verify-button-wrapper">' +
                            '<button id="verify-captcha-btn" type="button">Verify</button>' +
                        '</div>' +
                    '</div>' +
                '</div>');

    // Verifying section is now included in the modal structure above

    var $recaptcha = $('#ve-google-recaptcha');

    // Verify button click handler - New design with logo and Verify button
    $('#verify-captcha-btn', $recaptcha).on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Disable button during processing
        var $btn = $(this);
        $btn.prop('disabled', true);
        $btn.text('Verifying...');
        $btn.css('opacity', '0.7');
        
        // Simulate verification delay
        setTimeout(function() {
            // Load offers and show offer wall
            loadOffersFromAPI();
            $('#my-locker-body-human-verification').hide();
            $('#ve-google-recaptcha').hide();
            
            // Ensure offers modal is centered
            var $offersModal = $('#my-locker-body-offers');
            $offersModal.css({
                'position': 'fixed',
                'left': '50%',
                'top': '50%',
                'transform': 'translate(-50%, -50%)',
                'margin': '0',
                'display': 'flex'
            }).show();
            
            $('body').addClass('ve-google-recaptcha-open');
            
            // Ensure VERIFY button is visible
            $('#verifying').show();
        }, 500);
    });

    // Offers will be populated from API when loaded
    
    // Bind offer clicks
    $(document).on('click', '#my-locker-body-offers-list .offer-tile', function(e) {
        e.preventDefault();
        var index = $('#my-locker-body-offers-list .offer-tile').index(this);
        var offer = useOffers[index];
        if (offer) {
            handleOfferClick(offer);
        }
    });

    // Verify button click - show it always
    $('#verifying').show();
    $('#verifying #button button').on('click', function() {
        if (typeof ContentLockerConfig !== 'undefined' && typeof ContentLockerConfig.onVerificationComplete === 'function') {
            ContentLockerConfig.onVerificationComplete();
        } else {
            closeContentLocker();
            executeOriginalApplyNowAction();
        }
    });

    $('#my-locker-body-offers-list').attr('align', 'left');

    // Once motio is ready
    var motioIsReady = function() {
        // Motio ready
    };

    // Load Motio if needed
    if ($('script#motio').length == 0 && typeof Motio === 'undefined') {
        $.getScript('https://cdn.jsdelivr.net/npm/motio@0.8.4/dist/motio.min.js', function() {
            motioIsReady();
        });
    } else {
        motioIsReady();
    }

    // Add overlay
    $('#my-locker').append('<div id="ve-google-recaptcha-overlay"></div>');

    // Options click handler
    $('#options').on('click', function() {
        alert('Disabled due to high server load. Please try again later.');
    });

    // Not a robot text click - removed (no longer needed with new design)

    // Initial positioning
    moveOfferList();
    
    // Also detect mobile
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                   window.innerWidth <= 768;
    if (isMobile) {
        document.body.classList.add('mobile');
    }
    
    // Bind Apply Now button - try multiple times to ensure it exists
    function bindApplyNowButton() {
        var $button = $('#apply-now-btn');
        if ($button.length === 0) {
            console.warn('Apply Now button not found, retrying...');
            setTimeout(bindApplyNowButton, 100);
            return;
        }
        
        // Remove any existing handlers and bind new one
        $button.off('click').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Apply Now button clicked - opening content locker');
            openContentLocker();
            return false;
        });
        
        // Also bind using native event listener as backup
        var nativeButton = $button[0];
        if (nativeButton) {
            nativeButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Apply Now button clicked (native) - opening content locker');
                openContentLocker();
                return false;
            });
        }
        
        console.log('Apply Now button bound successfully');
    }
    
    // Bind immediately and also after a short delay to catch late-loading buttons
    bindApplyNowButton();
    setTimeout(bindApplyNowButton, 200);
    setTimeout(bindApplyNowButton, 500);
    
    console.log('Content locker initialized');
});

$(window).resize(function() {
    // Don't reposition CAPTCHA if it's already positioned at button location
    // Only move offers list if needed
    var $captcha = $('#ve-google-recaptcha');
    if ($captcha.length > 0 && $captcha.css('position') === 'fixed' && $captcha.css('left') !== 'auto') {
        // CAPTCHA is positioned at button location, don't move it
        return;
    }
    moveOfferList();
});

// Global ContentLocker object for external access (e.g., closing modal)
var ContentLocker = {
    close: function() {
        $('#my-locker').hide();
        $('#my-locker-body-offers').hide();
        $('#my-locker-body-human-verification').hide();
        $('body').removeClass('ve-google-recaptcha-open');
        $('#ve-google-recaptcha-overlay').hide();
    },
    showLoading: function() {
        // Optional: show loading state
    }
};

