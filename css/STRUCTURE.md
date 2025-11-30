# Content Locker Structure

This content locker follows the structure from the example files (css.rtf and java.rtf).

## HTML Structure

- `#my-locker` - Main container
- `#my-locker-body` - Body container
- `#my-locker-body-human-verification` - Container for reCAPTCHA (populated by JS)
- `#my-locker-body-offers` - Offers panel (shown after verification)
- `#my-locker-body-offers-list` - List of offers
- `#verifying` - Verify button section (populated by JS)
- `#ve-google-recaptcha` - Custom reCAPTCHA (populated by JS)
- `#ve-google-recaptcha-overlay` - Overlay for mobile (populated by JS)

## CSS Structure

Matches the example CSS with:
- Positioning for `#my-locker` and `#my-locker-body-offers`
- Mobile responsive classes (`body.mobile`)
- Custom reCAPTCHA styling
- Scrollbar styling
- Animation keyframes for reCAPTCHA circles

## JavaScript Structure

- jQuery-based positioning (`moveOfferList()`)
- Custom reCAPTCHA implementation
- Motio library for animations
- Adsbluemedia integration
- Offer completion detection
- LocalStorage for unlock persistence

## Configuration

Edit these variables in `script.js`:
- `centerHorizontally` - Center locker horizontally
- `centerVertically` - Center locker vertically
- `CONFIG.adsbluemedia` - Adsbluemedia credentials

## Dependencies

- jQuery 3.6.0+ (loaded from CDN)
- Motio library (loaded dynamically for animations)

## Mobile Detection

Automatically adds `mobile` class to body when width <= 768px.

