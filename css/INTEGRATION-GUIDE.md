# Integration Guide - Copy & Paste Instructions

## Quick Setup

### Step 1: Add jQuery (Required)
Add this before your JavaScript code in the `<head>` or before `</body>`:

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

### Step 2: Add CSS
Copy the entire contents of `COPY-PASTE-CSS.txt` and paste it into:

**Option A:** Inside a `<style>` tag in your HTML:
```html
<style>
/* Paste CSS here */
</style>
```

**Option B:** In an external CSS file and link it:
```html
<link rel="stylesheet" href="your-stylesheet.css">
```

### Step 3: Add JavaScript
Copy the entire contents of `COPY-PASTE-JAVASCRIPT.txt` and paste it into:

**Option A:** Inside a `<script>` tag in your HTML (before `</body>`):
```html
<script>
/* Paste JavaScript here */
</script>
```

**Option B:** In an external JS file and link it:
```html
<script src="your-script.js"></script>
```

### Step 4: Add HTML Structure
Your HTML needs these elements:

```html
<!-- Content Locker Structure -->
<div id="my-locker">
    <div id="my-locker-body">
        <div id="my-locker-body-human-verification">
            <!-- reCAPTCHA will be inserted here by JavaScript -->
        </div>
        <div id="my-locker-body-offers" style="display: none;">
                <div class="my-locker-body-text-top">
                    <strong>Complete an offer to verify you're a human</strong>
                </div>
            <div id="my-locker-body-offers-list">
                <!-- Offers will be loaded here from Adsbluemedia -->
            </div>
            <!-- Verify button will be inserted here by JavaScript -->
        </div>
    </div>
</div>

<!-- Your locked content (hidden initially) -->
<div id="mainContent" class="hidden">
    <!-- Your premium content here -->
</div>
```

### Step 5: Configure Adsbluemedia
Edit the `CONFIG` object in the JavaScript code with your Adsbluemedia credentials:

```javascript
const CONFIG = {
    adsbluemedia: {
        userId: 'YOUR_USER_ID',        // Your Adsbluemedia User ID (required)
        apiKey: 'YOUR_API_KEY',        // Your Adsbluemedia Offers API Key (required)
        s1: '',                        // Sub ID 1 (optional)
        s2: '',                        // Sub ID 2 (optional)
        numOffers: 5,                  // Number of offers to show (1-10, default: 5)
        testing: 0                     // 1 for test leads, 0 for production
    },
    storageKey: 'content_locker_unlocked',
    leadCheckInterval: 15000           // Check for leads every 15 seconds
};
```

**Where to find your credentials:**
- Log in to your Adsbluemedia account
- Go to your dashboard/settings
- Find your **User ID** and **Offers API Key**
- Copy them into the CONFIG object above

### Step 6: Adjust Positioning (Optional)
Edit these variables in the JavaScript:

```javascript
var centerHorizontally = true;  // true = center, false = left align
var centerVertically = false;   // true = center, false = top align
```

## Complete HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Content Locker</title>
    
    <!-- jQuery (Required) -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <!-- CSS -->
    <style>
    /* Paste CSS from COPY-PASTE-CSS.txt here */
    </style>
</head>
<body>
    <!-- Content Locker -->
    <div id="my-locker">
        <div id="my-locker-body">
            <div id="my-locker-body-human-verification"></div>
            <div id="my-locker-body-offers" style="display: none;">
                <div class="my-locker-body-text-top">
                    <strong>Complete an offer to verify you're a human</strong>
                </div>
                <div id="my-locker-body-offers-list"></div>
            </div>
        </div>
    </div>

    <!-- Your Content (Hidden until unlocked) -->
    <div id="mainContent" class="hidden">
        <h1>Your Premium Content</h1>
        <p>This content is now unlocked!</p>
    </div>

    <!-- JavaScript -->
    <script>
    /* Paste JavaScript from COPY-PASTE-JAVASCRIPT.txt here */
    </script>
</body>
</html>
```

## Important Notes

1. **jQuery is Required**: The locker uses jQuery, so make sure it's loaded before your script.

2. **Adsbluemedia Integration**: 
   - Uses the **Offer Feed API** to fetch offers automatically
   - Checks for lead completion every 15 seconds
   - Automatically unlocks content when a lead is completed
   - Offers are fetched from: `https://d2xohqmdyl2cj3.cloudfront.net/public/offers/feed.php`
   - Lead checking uses: `https://d2xohqmdyl2cj3.cloudfront.net/public/external/check2.php`

3. **Mobile Responsive**: Automatically detects mobile devices (width <= 768px) and adjusts layout

4. **Unlock Persistence**: Content stays unlocked for 24 hours (stored in localStorage)

5. **Testing Mode**: 
   - Set `testing: 1` in CONFIG to test with test leads
   - Set `testing: 0` for production (real leads only)

6. **Customization**: 
   - Change colors in CSS (search for `#4a90e2` to change primary blue color)
   - Adjust positioning with `centerHorizontally` and `centerVertically` variables
   - Change `numOffers` to show more/fewer offers (max 10)

## Troubleshooting

- **Locker not showing**: Check that jQuery is loaded and HTML structure is correct
- **Offers not loading**: 
  - Verify your `userId` and `apiKey` are correct in the CONFIG
  - Check browser console for API errors
  - Make sure your Adsbluemedia account has active offers
- **Completion not detected**: 
  - The system checks for leads every 15 seconds automatically
  - Check browser console for lead completion logs
  - Verify `testing: 0` for production or `testing: 1` for testing
  - Users must complete an offer and the lead must be registered in Adsbluemedia
- **No offers showing**: 
  - Check that your API credentials are valid
  - Verify you have active offers in your Adsbluemedia account
  - Check browser console for JSON errors

