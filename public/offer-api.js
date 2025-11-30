/**
 * OFFER API MODULE
 * 
 * This module handles fetching offers from your external API.
 * It includes error handling, loading states, and response parsing.
 */

var OfferAPI = {
    /**
     * Get visitor's IP address
     * @returns {Promise<String>} IP address
     */
    getVisitorIP: function() {
        return fetch('https://api.ipify.org?format=json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                return data.ip;
            })
            .catch(function() {
                // Fallback if IP service fails
                return '0.0.0.0';
            });
    },
    
    /**
     * Get visitor's user agent
     * @returns {String} User agent string
     */
    getVisitorUserAgent: function() {
        return navigator.userAgent || navigator.vendor || window.opera || 'Unknown';
    },
    
    /**
     * Build query string from OGAds parameters
     * @param {Object} params - Parameters object
     * @returns {String} Query string
     */
    buildQueryString: function(params) {
        var queryParts = [];
        
        // Required parameters
        queryParts.push('ip=' + encodeURIComponent(params.ip));
        queryParts.push('user_agent=' + encodeURIComponent(params.user_agent));
        
        // Optional parameters
        if (params.ctype !== null && params.ctype !== undefined) {
            queryParts.push('ctype=' + encodeURIComponent(params.ctype));
        }
        if (params.max !== null && params.max !== undefined) {
            queryParts.push('max=' + encodeURIComponent(params.max));
        }
        if (params.min !== null && params.min !== undefined) {
            queryParts.push('min=' + encodeURIComponent(params.min));
        }
        if (params.aff_sub4 !== null && params.aff_sub4 !== undefined) {
            queryParts.push('aff_sub4=' + encodeURIComponent(params.aff_sub4));
        }
        
        return queryParts.join('&');
    },
    
    /**
     * Fetch offers from the OGAds API
     * @returns {Promise<Array>} Array of offer objects
     */
    fetchOffers: function() {
        var self = this;
        
        return new Promise(function(resolve, reject) {
            // Check if config is available
            if (typeof ContentLockerConfig === 'undefined') {
                reject(new Error('ContentLockerConfig is not defined. Please ensure config.js is loaded.'));
                return;
            }
            
            // Show loading state
            if (typeof ContentLocker !== 'undefined') {
                ContentLocker.showLoading();
            }
            
            // Get visitor information (required by OGAds)
            Promise.all([
                self.getVisitorIP(),
                Promise.resolve(self.getVisitorUserAgent())
            ]).then(function(results) {
                var visitorIP = results[0];
                var userAgent = results[1];
                
                // Build query parameters
                var queryParams = {
                    ip: visitorIP,
                    user_agent: userAgent
                };
                
                // Add optional OGAds parameters
                if (ContentLockerConfig.ogadsParams) {
                    if (ContentLockerConfig.ogadsParams.ctype !== null && ContentLockerConfig.ogadsParams.ctype !== undefined) {
                        queryParams.ctype = ContentLockerConfig.ogadsParams.ctype;
                    }
                    if (ContentLockerConfig.ogadsParams.max !== null && ContentLockerConfig.ogadsParams.max !== undefined) {
                        queryParams.max = ContentLockerConfig.ogadsParams.max;
                    }
                    if (ContentLockerConfig.ogadsParams.min !== null && ContentLockerConfig.ogadsParams.min !== undefined) {
                        queryParams.min = ContentLockerConfig.ogadsParams.min;
                    }
                    if (ContentLockerConfig.ogadsParams.aff_sub4 !== null && ContentLockerConfig.ogadsParams.aff_sub4 !== undefined) {
                        queryParams.aff_sub4 = ContentLockerConfig.ogadsParams.aff_sub4;
                    }
                }
                
                // Build URL with query parameters
                var url = ContentLockerConfig.apiEndpoint + '?' + self.buildQueryString(queryParams);
                
                // Build request options with Bearer token
                var options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + ContentLockerConfig.apiKey
                    }
                };
                
                // Make the API request
                fetch(url, options)
                    .then(function(response) {
                        // Check if response is OK
                        if (!response.ok) {
                            return response.text().then(function(text) {
                                throw new Error('API request failed with status: ' + response.status + ' - ' + text);
                            });
                        }
                        return response.json();
                    })
                    .then(function(data) {
                        // Parse the response based on configured mapping
                        var offers = self.parseResponse(data);
                        
                        if (!offers || offers.length === 0) {
                            reject(new Error('No offers available'));
                            return;
                        }
                        
                        resolve(offers);
                    })
                    .catch(function(error) {
                        console.error('Error fetching offers:', error);
                        reject(error);
                    });
            }).catch(function(error) {
                console.error('Error getting visitor information:', error);
                reject(new Error('Failed to collect visitor information'));
            });
        });
    },
    
    /**
     * Parse API response into offer objects
     * @param {Object} response - The API response
     * @returns {Array} Array of normalized offer objects
     */
    parseResponse: function(response) {
        try {
            var mapping = ContentLockerConfig.responseMapping;
            var offersArray = response;
            
            // Handle OGAds response format
            // OGAds may return array directly or nested object
            if (mapping.offersArray === null) {
                // Response is array directly
                if (Array.isArray(response)) {
                    offersArray = response;
                } else if (response.offers && Array.isArray(response.offers)) {
                    // Fallback: check for nested offers
                    offersArray = response.offers;
                } else if (response.data && Array.isArray(response.data)) {
                    // Fallback: check for data property
                    offersArray = response.data;
                }
            } else if (mapping.offersArray) {
                // Navigate to the offers array if nested
                var path = mapping.offersArray.split('.');
                for (var i = 0; i < path.length; i++) {
                    offersArray = offersArray[path[i]];
                }
            } else if (response.offers) {
                offersArray = response.offers;
            } else if (Array.isArray(response)) {
                offersArray = response;
            }
            
            if (!Array.isArray(offersArray)) {
                console.error('Invalid response structure: offers array not found', response);
                return [];
            }
            
            // Map each offer to normalized format
            return offersArray.map(function(offer) {
                // OGAds uses 'name' for title, 'thumbnail' for image
                var offerId = offer[mapping.offerId] || offer.id || offer.offer_id || '';
                var offerTitle = offer[mapping.offerTitle] || offer.name || offer.title || 'Complete Offer';
                var offerDescription = offer[mapping.offerDescription] || offer.description || offer.desc || '';
                var offerImage = offer[mapping.offerImage] || offer.thumbnail || offer.image || offer.icon || '';
                var offerUrl = offer[mapping.offerUrl] || offer.url || offer.link || '';
                var offerConversion = offer[mapping.offerConversion] || offer.conversion || offerTitle || 'Complete to verify';
                
                return {
                    id: offerId,
                    title: offerTitle,
                    description: offerDescription,
                    image: offerImage,
                    url: offerUrl,
                    conversion: offerConversion
                };
            });
        } catch (error) {
            console.error('Error parsing API response:', error);
            return [];
        }
    },
    
    /**
     * Verify that an offer has been completed
     * This is a placeholder - implement based on your verification method
     * 
     * @param {Object} offer - The offer object
     * @returns {Promise<boolean>} Promise that resolves when verified
     */
    verifyOfferCompletion: function(offer) {
        // This is where you should implement your verification logic
        // Examples:
        
        // 1. Poll an API endpoint for completion status
        // return OfferAPI.pollCompletionStatus(offer.id);
        
        // 2. Listen for postMessage from offer window
        // return OfferAPI.listenForCompletionMessage(offer);
        
        // 3. Call a verification API
        // return fetch('/api/verify-offer', {
        //     method: 'POST',
        //     body: JSON.stringify({ offerId: offer.id })
        // }).then(r => r.json());
        
        // For now, return a promise that resolves after a delay
        // Replace this with actual verification logic
        return new Promise(function(resolve) {
            // Simulate verification delay
            setTimeout(function() {
                // Call the custom verification handler
                if (typeof ContentLockerConfig.onOfferComplete === 'function') {
                    ContentLockerConfig.onOfferComplete(offer)
                        .then(function(verified) {
                            resolve(verified !== false);
                        })
                        .catch(function() {
                            resolve(false);
                        });
                } else {
                    resolve(true);
                }
            }, 2000); // 2 second delay for demonstration
        });
    },
    
    /**
     * Poll for offer completion status (example implementation)
     * Uncomment and modify based on your API
     */
    pollCompletionStatus: function(offerId, maxAttempts, interval) {
        maxAttempts = maxAttempts || 10;
        interval = interval || 2000;
        
        return new Promise(function(resolve, reject) {
            var attempts = 0;
            
            var poll = function() {
                attempts++;
                
                // TODO: Replace with your actual verification endpoint
                // fetch(ContentLockerConfig.apiEndpoint + '/verify/' + offerId)
                //     .then(r => r.json())
                //     .then(function(data) {
                //         if (data.completed) {
                //             resolve(true);
                //         } else if (attempts >= maxAttempts) {
                //             reject(new Error('Verification timeout'));
                //         } else {
                //             setTimeout(poll, interval);
                //         }
                //     });
                
                // Placeholder
                if (attempts >= maxAttempts) {
                    reject(new Error('Verification timeout'));
                } else {
                    setTimeout(poll, interval);
                }
            };
            
            poll();
        });
    }
};

