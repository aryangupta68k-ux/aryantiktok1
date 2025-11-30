/**
 * CONTENT LOCKER CONFIGURATION
 * 
 * INSTRUCTIONS:
 * 1. Replace 'YOUR_API_ENDPOINT' with your actual API endpoint URL
 * 2. Replace 'YOUR_API_KEY' with your actual API key
 * 3. Configure the expected JSON response structure below
 * 4. Set your original Apply Now button action (redirect URL or form submission)
 */

var ContentLockerConfig = {
    // ============================================
    // API CONFIGURATION
    // ============================================
    
    // Your API endpoint URL
    apiEndpoint: 'https://applocked.org/api/v2',
    
    // Your API key (if required)
    apiKey: '36932|vxHMpkiE2MsC4R3bX4DuEpMqqN2xkj5b9A7LYbnNc7036cf9',
    
    // Request headers (customize as needed)
    apiHeaders: {
        'Content-Type': 'application/json',
        // OGAds uses Bearer token authorization
        // Note: Authorization header is set dynamically in offer-api.js
    },
    
    // ============================================
    // POSTBACK COMPLETION TRACKING
    // ============================================
    
    // Vercel API endpoint for checking completions (optional - for future verification)
    completionCheckUrl: typeof window !== 'undefined' 
        ? window.location.origin + '/api/check-completion' 
        : '/api/check-completion',
    
    // ============================================
    // OGADS API PARAMETERS
    // ============================================
    
    // Required parameters (automatically collected):
    // - ip: Visitor's IP (collected automatically)
    // - user_agent: Visitor's user agent (collected automatically)
    
    // Optional parameters:
    ogadsParams: {
        // Offer types (bitwise flag): 1=CPI, 2=CPA, 4=PIN, 8=VID
        // Example: 12 = 4 (PIN) + 8 (VID)
        // Leave null to return all offer types
        ctype: null, // e.g., 12 for PIN + VID, or null for all types
        
        // Maximum number of offers to return
        max: null, // e.g., 10
        
        // Minimum number of offers (may include blocked offers if needed)
        min: null, // e.g., 3
        
        // Additional tracking data
        aff_sub4: null // Optional additional data for advanced tracking
    },
    
    // ============================================
    // JSON RESPONSE STRUCTURE
    // Configure this based on your API's actual response format
    // ============================================
    
    // Example expected response structure:
    // {
    //     "offers": [
    //         {
    //             "id": "offer1",
    //             "title": "Complete Survey",
    //             "description": "Quick 2-minute survey",
    //             "image": "https://example.com/image.jpg",
    //             "url": "https://example.com/offer",
    //             "conversion": "Complete to verify"
    //         }
    //     ]
    // }
    
    // Field mappings - adjust these to match OGAds API response format
    // OGAds typically returns an array directly or { offers: [...] }
    responseMapping: {
        offersArray: null,               // null = response is array directly, or 'offers' if nested
        offerId: 'id',                   // Field name for offer ID
        offerTitle: 'name',              // OGAds uses 'name' for title
        offerDescription: 'description', // Field name for offer description
        offerImage: 'thumbnail',         // OGAds uses 'thumbnail' for image
        offerUrl: 'url',                 // Field name for offer redirect URL
        offerConversion: 'name'          // Text to show (will use title if conversion not available)
    },
    
    // ============================================
    // ORIGINAL APPLY NOW BUTTON ACTION
    // ============================================
    
    // Set this to the URL where users should be redirected after completing an offer
    // OR leave as null if you want to handle it via the onOfferComplete callback
    originalApplyNowUrl: null, // e.g., 'https://example.com/apply'
    
    // Alternative: If your Apply Now button submits a form, provide the form selector
    originalApplyNowFormSelector: null, // e.g., '#application-form'
    
    // ============================================
    // BEHAVIOR SETTINGS
    // ============================================
    
    // Center the modal horizontally
    centerHorizontally: true,
    
    // Center the modal vertically
    centerVertically: false,
    
    // Auto-detect mobile devices
    detectMobile: true,
    
    // ============================================
    // CUSTOM CALLBACKS
    // ============================================
    
    // Called when an offer is clicked
    onOfferClick: function(offer) {
        console.log('Offer clicked:', offer);
        // Open offer in same tab
        window.location.href = offer.url;
    },
    
    // Called when an offer is completed (YOU MUST IMPLEMENT THIS)
    // This is where you should add your verification logic
    onOfferComplete: function(offer) {
        console.log('Offer completed:', offer);
        
        // TODO: Implement your offer verification logic here
        // Examples:
        // - Make API call to verify completion
        // - Poll for completion status
        // - Listen for postMessage from offer window
        // - Use webhooks
        
        // For now, this will be called after the verification delay
        // You should replace this with actual verification logic
        
        return Promise.resolve(true); // Return a promise that resolves when verified
    },
    
    // Called when verification is complete and user should proceed
    onVerificationComplete: function() {
        console.log('Verification complete, proceeding...');
        
        // Handle the original Apply Now action
        if (ContentLockerConfig.originalApplyNowUrl) {
            window.location.href = ContentLockerConfig.originalApplyNowUrl;
        } else if (ContentLockerConfig.originalApplyNowFormSelector) {
            var form = document.querySelector(ContentLockerConfig.originalApplyNowFormSelector);
            if (form) {
                form.submit();
            }
        } else {
            // Fallback: trigger any existing click handler
            // This will work if the button has a default action
            console.warn('No redirect URL or form specified. Please configure originalApplyNowUrl or originalApplyNowFormSelector in config.js');
        }
    }
};

