# Your OGAds Offer API Information

## 📊 API Configuration

### **API Endpoint:**
```
https://applocked.org/api/v2
```

### **API Key:**
```
36932|vxHMpkiE2MsC4R3bX4DuEpMqqN2xkj5b9A7LYbnNc7036cf9
```

### **Authorization:**
- Type: Bearer Token
- Format: `Authorization: Bearer {apiKey}`

---

## 🔧 How It Works

### **API Request Format:**

**URL:**
```
https://applocked.org/api/v2?ip={visitor_ip}&user_agent={user_agent}
```

**Headers:**
```
Authorization: Bearer 36932|vxHMpkiE2MsC4R3bX4DuEpMqqN2xkj5b9A7LYbnNc7036cf9
Content-Type: application/json
```

**Required Parameters (Auto-collected):**
- `ip` - Visitor's IP address (automatically collected)
- `user_agent` - Visitor's user agent (automatically collected)

**Optional Parameters:**
- `ctype` - Offer types (null = all types)
- `max` - Maximum offers (null = no limit)
- `min` - Minimum offers (null = no limit)
- `aff_sub4` - Custom tracking (null = not used)

---

## 📝 Full API Request Example

**Complete Request:**
```
GET https://applocked.org/api/v2?ip=192.168.1.1&user_agent=Mozilla/5.0...
Headers:
  Authorization: Bearer 36932|vxHMpkiE2MsC4R3bX4DuEpMqqN2xkj5b9A7LYbnNc7036cf9
  Content-Type: application/json
```

---

## 📋 Response Format

OGAds API returns an array of offers with these fields:

- `id` - Offer ID
- `name` - Offer title/name
- `description` - Offer description
- `thumbnail` - Image URL
- `url` - Offer redirect URL
- Other fields as provided by OGAds

---

## 🔍 Where It's Configured

**File:** `public/config.js`

**Key Settings:**
```javascript
apiEndpoint: 'https://applocked.org/api/v2'
apiKey: '36932|vxHMpkiE2MsC4R3bX4DuEpMqqN2xkj5b9A7LYbnNc7036cf9'
```

---

## 🧪 Test Your API

You can test the API manually:

```bash
curl -H "Authorization: Bearer 36932|vxHMpkiE2MsC4R3bX4DuEpMqqN2xkj5b9A7LYbnNc7036cf9" \
     "https://applocked.org/api/v2?ip=127.0.0.1&user_agent=Test"
```

---

## 📊 Your API Details Summary

| Setting | Value |
|---------|-------|
| **Endpoint** | `https://applocked.org/api/v2` |
| **API Key** | `36932|vxHMpkiE2MsC4R3bX4DuEpMqqN2xkj5b9A7LYbnNc7036cf9` |
| **Auth Type** | Bearer Token |
| **Required Params** | `ip`, `user_agent` |
| **Config File** | `public/config.js` |

---

**Your OGAds API is already configured and working!** ✅

The content locker automatically fetches offers from this API when users click "Apply Now".

