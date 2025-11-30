# Simple Postback Setup - Just Paste the URL!

## ✅ Perfect! You Just Need the URL

If OGAds only has a URL field (no other options), that's totally fine! Just paste your postback URL there.

---

## 📝 Your Postback URL to Paste

**Copy and paste this URL:**

```
https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&aff_sub4={aff_sub4}
```

---

## 🚀 Steps

1. **Find the Postback URL field** in OGAds dashboard
2. **Paste the URL above** into that field
3. **Save/Submit**

That's it! ✅

---

## ✅ What Happens Next

- OGAds will automatically call your postback URL when conversions are approved
- Your server will receive the completion data
- Data will be stored in Edge Config
- You can view completions at: `https://addtok.com/api/completions`

---

## 🧪 How to Test

After adding the URL:

1. **Complete a test offer** through your content locker
2. **Wait a few minutes** for OGAds to process
3. **Check completions:**
   ```
   https://addtok.com/api/completions
   ```
   Should show your test completion!

---

## 📋 Alternative URLs (If Needed)

**If you want more tracking parameters:**

```
https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&affiliate_id={affiliate_id}&aff_sub={aff_sub}&aff_sub2={aff_sub2}&aff_sub3={aff_sub3}&aff_sub4={aff_sub4}&aff_sub5={aff_sub5}&source={source}&date={date}&time={time}&datetime={datetime}&session_timestamp={session_timestamp}&ran={ran}
```

But the simple one above is usually enough!

---

## ✅ That's It!

Just paste the URL and save. OGAds will handle the rest automatically! 🎉

