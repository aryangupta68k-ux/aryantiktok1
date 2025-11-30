# Content Locker for Adsbluemedia CPA Network

A modern, responsive content locker that integrates with Adsbluemedia CPA network to promote offers and unlock premium content.

## Features

- 🎨 Modern, beautiful UI with smooth animations
- 📱 Fully responsive design (mobile-friendly)
- 🔒 Secure content locking mechanism
- ⚡ Fast and lightweight
- 🎯 Easy Adsbluemedia integration
- 💾 Local storage for unlock persistence
- 🔔 PostMessage API support for offer completion tracking

## Setup Instructions

### 1. Get Your Adsbluemedia Credentials

1. Log in to your [Adsbluemedia](https://adsbluemedia.com) account
2. Navigate to your dashboard
3. Get your:
   - API Key (if using API method)
   - Publisher ID
   - Offer iframe URL (recommended method)

### 2. Configure the Content Locker

Open `script.js` and update the `CONFIG` object:

```javascript
const CONFIG = {
    adsbluemedia: {
        // Option 1: Use iframe URL (Recommended)
        iframeUrl: 'https://your-adsbluemedia-offer-url.com',
        
        // Option 2: Use API credentials
        apiKey: 'YOUR_ADSBLUEMEDIA_API_KEY',
        publisherId: 'YOUR_PUBLISHER_ID',
        offerId: 'YOUR_OFFER_ID'
    },
    storageKey: 'content_locker_unlocked',
    checkInterval: 1000
};
```

### 3. Integration Methods

#### Method 1: Iframe URL (Recommended)
Simply set the `iframeUrl` in the config. This is the easiest method:

```javascript
iframeUrl: 'https://your-adsbluemedia-offer-url.com'
```

#### Method 2: API Integration
If Adsbluemedia provides an API, use the API credentials:

```javascript
apiKey: 'your-api-key',
publisherId: 'your-publisher-id',
offerId: 'optional-offer-id'
```

### 4. Offer Completion Detection

The content locker supports multiple methods to detect offer completion:

1. **PostMessage API**: Listens for completion messages from the Adsbluemedia iframe
2. **Cookie Detection**: Checks for completion cookies set by Adsbluemedia
3. **URL Parameters**: Checks URL parameters for completion status

You may need to adjust the `startCompletionCheck()` method in `script.js` based on how Adsbluemedia signals completion.

### 5. Customize Your Content

Edit `index.html` to replace the placeholder content in the `main-content` div with your actual premium content.

## File Structure

```
css/
├── index.html      # Main HTML file
├── styles.css      # Styling and animations
├── script.js       # Content locker logic
└── README.md       # This file
```

## Customization

### Change Unlock Duration

By default, content stays unlocked for 24 hours. To change this, modify the `expiresAfter` variable in `script.js`:

```javascript
const expiresAfter = 24 * 60 * 60 * 1000; // Change 24 to your desired hours
```

To make unlocks permanent, remove the expiration check entirely.

### Styling

All styles are in `styles.css`. Key customizable elements:

- Colors: Update the gradient colors in `.locker-icon` and `.content-box`
- Fonts: Change the `font-family` in the `body` selector
- Sizes: Adjust padding, margins, and font sizes as needed

### Testing

For testing purposes, you can uncomment the test unlock button in `script.js`:

```javascript
// this.addTestUnlockButton();
```

**Remember to remove this before going live!**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Notes

- Content is stored in localStorage (client-side only)
- For production, consider adding server-side validation
- Implement rate limiting if needed
- Add CAPTCHA if experiencing abuse

## Troubleshooting

### Offer Not Loading

1. Check that your iframe URL is correct
2. Verify CORS settings with Adsbluemedia
3. Check browser console for errors
4. Ensure Adsbluemedia allows iframe embedding

### Completion Not Detected

1. Check Adsbluemedia documentation for completion callbacks
2. Verify postMessage format matches what Adsbluemedia sends
3. Check browser console for postMessage events
4. Contact Adsbluemedia support for integration details

### Content Not Unlocking

1. Check browser localStorage (DevTools > Application > Local Storage)
2. Verify the storage key matches
3. Check for JavaScript errors in console
4. Ensure completion detection is working

## Support

For Adsbluemedia-specific integration questions, contact:
- Adsbluemedia Support: [Check their website]
- Documentation: [Adsbluemedia documentation]

## License

Free to use and modify for your projects.

---

**Note**: Make sure to test thoroughly with actual Adsbluemedia offers before deploying to production.

