# Postback URL Simulator - What URL to Use

## 🧪 For Testing in OGAds Postback Simulator

### **Your Postback URL:**

```
https://addtok.com/api/postback
```

---

## 📝 Different Formats for Testing

### **1. Base URL (Minimum):**
```
https://addtok.com/api/postback
```

### **2. With Test Parameters (Recommended for Simulator):**
```
https://addtok.com/api/postback?offer_id=123&offer_name=Test+Offer&payout=1.50&session_ip=127.0.0.1
```

### **3. Full Parameters (Complete Test):**
```
https://addtok.com/api/postback?offer_id=123&offer_name=Test+Offer&payout=1.50&session_ip=192.168.1.1&affiliate_id=36932&aff_sub4=test123
```

---

## ✅ What to Paste in Simulator

**Use this URL in the simulator:**

```
https://addtok.com/api/postback?offer_id=123&offer_name=Test+Offer&payout=1.50&session_ip=127.0.0.1
```

**Or just the base URL:**
```
https://addtok.com/api/postback
```

The simulator will automatically add test parameters.

---

## 🎯 Expected Response

**When you test, you should get:**
```
OK
```

**If you get an error:**
- `{"error":"Edge Config not configured"}` - Environment variables not set
- Check deployment and environment variables

---

## 🔍 After Testing

After the simulator sends a test postback:

1. **Check your completions:**
   ```
   https://addtok.com/api/completions
   ```
   Should show the test completion!

2. **Check Edge Config:**
   - Go to Vercel Dashboard → Storage → Your Edge Config
   - Should see stored data

3. **Check Function Logs:**
   - Vercel Dashboard → Deployments → Function Logs
   - Look for: `✅ Offer Completed (Edge Config):`

---

## 📋 Quick Test URLs

**Simple Test:**
```
https://addtok.com/api/postback?offer_id=999&offer_name=Simulator+Test&payout=2.00&session_ip=127.0.0.1
```

**With All Parameters:**
```
https://addtok.com/api/postback?offer_id=999&offer_name=Full+Test&payout=2.00&session_ip=192.168.1.100&affiliate_id=36932&aff_sub=test&aff_sub2=campaign1&aff_sub3=variant_a&aff_sub4=user123&aff_sub5=tracking&source=organic
```

---

**For the simulator, use: `https://addtok.com/api/postback`** ✅

The simulator will test it and show you the response!

