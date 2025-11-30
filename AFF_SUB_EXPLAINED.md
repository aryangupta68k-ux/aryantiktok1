# Understanding aff_sub Parameters

## What are `aff_sub` Parameters?

`aff_sub` (affiliate sub-parameters) are **custom tracking parameters** that allow you to pass additional data through the affiliate tracking flow. They help you track specific information about your users, campaigns, or traffic sources.

OGAds supports **5 different aff_sub parameters**:
- `aff_sub` - Custom tracking parameter #1
- `aff_sub2` - Custom tracking parameter #2
- `aff_sub3` - Custom tracking parameter #3
- `aff_sub4` - Custom tracking parameter #4
- `aff_sub5` - Custom tracking parameter #5

---

## 🎯 Common Use Cases

### **1. User Tracking**
Track specific users by passing a unique identifier:
```
aff_sub4=user_12345
```

### **2. Campaign Source**
Track which marketing campaign brought the user:
```
aff_sub=campaign_facebook
aff_sub2=ad_set_123
```

### **3. Landing Page Variation**
Track which landing page version they saw:
```
aff_sub3=landing_page_v2
```

### **4. Traffic Source**
Track where traffic came from:
```
aff_sub=organic
aff_sub2=google
aff_sub3=search
```

### **5. Custom Data**
Store any custom information you need:
```
aff_sub4=promo_code_SUMMER2024
aff_sub5=referrer_friend_john
```

---

## 🔄 How aff_sub Works in Your Flow

### **Step 1: Pass aff_sub When Fetching Offers**

When your content locker fetches offers from OGAds, you can pass `aff_sub4` in the API request:

**Current Configuration:**
```javascript
// In config.js
ogadsParams: {
    aff_sub4: null // Set this to your custom value
}
```

**Example:**
```javascript
ogadsParams: {
    aff_sub4: 'user_' + userId // Pass user ID
}
```

### **Step 2: OGAds Stores the Value**

OGAds receives and stores your `aff_sub` values with the user's session.

### **Step 3: aff_sub Comes Back in Postback**

When the offer is completed, OGAds sends all `aff_sub` values back in your postback URL:

```
https://addtok.com/api/postback?
    offer_id=123&
    offer_name=Test+Offer&
    payout=1.50&
    session_ip=192.168.1.1&
    aff_sub4=user_12345    ← Your custom value returns!
```

### **Step 4: You Store and Use It**

Your postback handler receives and stores all `aff_sub` values with the completion data.

---

## 📝 How to Use aff_sub in Your Project

### **Option 1: Static Value (in config.js)**

Set a static value that applies to all users:

```javascript
// In public/config.js
ogadsParams: {
    aff_sub4: 'tiktok_ads_clone' // All users get this value
}
```

### **Option 2: Dynamic Value (in JavaScript)**

Set a dynamic value based on user data:

```javascript
// In your JavaScript code before fetching offers
var userId = 'user_12345'; // Get from your system
var campaign = 'facebook_ads';

ContentLockerConfig.ogadsParams.aff_sub4 = userId;
ContentLockerConfig.ogadsParams.aff_sub = campaign;
```

### **Option 3: Pass from URL Parameters**

Capture values from URL parameters:

```javascript
// Get from URL: ?user_id=12345&campaign=facebook
var urlParams = new URLSearchParams(window.location.search);
var userId = urlParams.get('user_id');
var campaign = urlParams.get('campaign');

if (userId) {
    ContentLockerConfig.ogadsParams.aff_sub4 = userId;
}
if (campaign) {
    ContentLockerConfig.ogadsParams.aff_sub = campaign;
}
```

### **Option 4: Generate Unique ID**

Create a unique identifier for tracking:

```javascript
// Generate or get unique ID
var trackingId = 'visit_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
ContentLockerConfig.ogadsParams.aff_sub4 = trackingId;
```

---

## 🔍 How to Track aff_sub in Postbacks

### **Your Postback Receives All Values**

Your postback endpoint automatically receives all `aff_sub` parameters:

```typescript
// In app/api/postback/route.ts
const {
    aff_sub,
    aff_sub2,
    aff_sub3,
    aff_sub4,
    aff_sub5,
    // ... other params
} = Object.fromEntries(searchParams.entries())

// All values are stored in completion_data
const completion_data = {
    offer_id,
    offer_name,
    payout,
    aff_sub,    // Your custom value
    aff_sub2,   // Your custom value
    aff_sub3,   // Your custom value
    aff_sub4,   // Your custom value
    aff_sub5,   // Your custom value
    // ...
}
```

### **Query Completions by aff_sub**

You can filter completions by `aff_sub4` when checking completion status:

```
https://addtok.com/api/check-completion?offer_id=123&ip=192.168.1.1&aff_sub4=user_12345
```

---

## 💡 Real-World Examples

### **Example 1: User ID Tracking**

Track which user completed which offer:

```javascript
// Set user ID when page loads
var userId = localStorage.getItem('user_id') || generateUserId();
ContentLockerConfig.ogadsParams.aff_sub4 = userId;

// Later in postback, you'll know:
// "user_12345 completed offer 567"
```

### **Example 2: Multi-Campaign Tracking**

Track multiple campaign dimensions:

```javascript
ContentLockerConfig.ogadsParams.aff_sub = 'facebook';     // Platform
ContentLockerConfig.ogadsParams.aff_sub2 = 'ad_set_123';  // Ad Set
ContentLockerConfig.ogadsParams.aff_sub3 = 'creative_a';  // Creative
ContentLockerConfig.ogadsParams.aff_sub4 = 'landing_v2';  // Landing Page
```

### **Example 3: A/B Testing**

Track which variation users saw:

```javascript
var variation = Math.random() > 0.5 ? 'variant_a' : 'variant_b';
ContentLockerConfig.ogadsParams.aff_sub4 = variation;

// Track which variation converts better
```

---

## 📊 Viewing aff_sub in Your Data

### **Check Completions API**

All `aff_sub` values are stored with each completion. View them:

```
https://addtok.com/api/completions
```

Response includes:
```json
{
  "success": true,
  "total": 10,
  "completions": [
    {
      "offer_id": "123",
      "offer_name": "TikTok Signup",
      "payout": "1.50",
      "aff_sub": "facebook",
      "aff_sub2": "ad_set_123",
      "aff_sub3": "creative_a",
      "aff_sub4": "user_12345",
      "aff_sub5": null,
      "timestamp": 1234567890
    }
  ]
}
```

---

## ⚠️ Important Notes

### **Limitations:**
- Maximum length: Usually 255 characters per parameter
- Characters: URL-safe characters only (use `encodeURIComponent()`)
- Storage: Values are stored as strings

### **Best Practices:**
1. ✅ Use `aff_sub4` for unique user identifiers
2. ✅ Keep values concise and meaningful
3. ✅ Use consistent naming conventions
4. ✅ URL-encode special characters
5. ✅ Don't store sensitive data (passwords, payment info)

### **When to Use Each:**
- `aff_sub` → Campaign/Platform
- `aff_sub2` → Ad Set/Creative
- `aff_sub3` → Landing Page/Variant
- `aff_sub4` → User ID/Tracking ID (most commonly used)
- `aff_sub5` → Additional custom data

---

## 🚀 Quick Setup Example

### **Set up User ID Tracking:**

1. **Modify config.js:**
```javascript
ogadsParams: {
    aff_sub4: null // Will be set dynamically
}
```

2. **Set dynamically when page loads:**
```javascript
// In your landing page or content-locker.js
$(document).ready(function() {
    // Get or generate user ID
    var userId = localStorage.getItem('user_id');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('user_id', userId);
    }
    
    // Set for offer API calls
    ContentLockerConfig.ogadsParams.aff_sub4 = userId;
});
```

3. **Postback automatically receives it:**
- When offer completes, postback will include: `aff_sub4=user_1234567890_abc123`
- Stored in Edge Config with completion data
- Queryable via `/api/check-completion?aff_sub4=user_1234567890_abc123`

---

## 📖 Summary

- **aff_sub parameters** = Custom tracking data you can pass through the flow
- **5 available**: `aff_sub`, `aff_sub2`, `aff_sub3`, `aff_sub4`, `aff_sub5`
- **Set in config.js**: `ogadsParams.aff_sub4 = 'your_value'`
- **Received in postback**: Automatically included in completion data
- **Most common use**: `aff_sub4` for user ID tracking

---

**Need help?** Check your postback endpoint logs or view completions at `/api/completions` to see your aff_sub values in action!

