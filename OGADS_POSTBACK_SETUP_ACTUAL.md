# OGAds Postback Setup - Actual Steps

Since the OGAds dashboard might have different options, here's how to actually set it up:

---

## 🔧 Setting Up Postback in OGAds Dashboard

### **Step 1: Find Postback Settings**

In OGAds Dashboard, look for:
- **Settings** → **Postbacks**
- **Campaigns** → Select Campaign → **Postback**
- **Tools** → **Postbacks**
- Or look for **"Postback URL"** or **"Conversion Postback"**

The location varies depending on your OGAds account type.

---

### **Step 2: Add Postback URL**

When you find the postback section, you'll typically see:

**Postback URL Field:**
```
https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&aff_sub4={aff_sub4}
```

Paste this URL in the postback field.

---

### **Step 3: Configure When to Fire**

OGAds might have different options:

**Common Options:**
- ✅ **"On Conversion"** - Fires when offer is completed/approved
- ✅ **"On Approved"** - Fires when conversion is approved
- ✅ **"Conversion Postback"** - Similar to above
- ✅ **"Fire on: Approved"** - Another way to say it
- ✅ **"Conversion Status: Approved"** - When conversion is approved

**What you want:**
- Fire when the offer is **completed/approved**
- NOT on click or pending

**If you see:**
- ❌ "On Click" - Don't use this
- ❌ "On Pending" - Don't use this
- ✅ "On Conversion" or "On Approved" - Use this!

---

### **Step 4: Save Configuration**

After adding the URL and selecting when to fire:
- Click **"Save"** or **"Update"**
- Or **"Submit"**

---

## 📋 Alternative: Campaign-Level Postback

If you can't find global postback settings:

1. **Go to:** Campaigns → Select Your Campaign
2. **Look for:** Postback section or Settings
3. **Add:** Your postback URL
4. **Configure:** When to fire (on conversion/approved)

---

## 📝 Your Postback URL

**Simple Version:**
```
https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&aff_sub4={aff_sub4}
```

**Full Version (All Parameters):**
```
https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&affiliate_id={affiliate_id}&aff_sub={aff_sub}&aff_sub2={aff_sub2}&aff_sub3={aff_sub3}&aff_sub4={aff_sub4}&aff_sub5={aff_sub5}&source={source}&date={date}&time={time}&datetime={datetime}&session_timestamp={session_timestamp}&ran={ran}
```

---

## 🔍 What to Look For

**In OGAds Dashboard, look for:**
- "Postback URL" field
- "Conversion Postback" section
- "Postback Settings"
- Options like:
  - "Fire on conversion"
  - "On approved conversion"
  - "Conversion callback"
  - "Postback on approval"

**The key is:**
- Fire when conversion is **approved/completed**
- NOT on click or pending

---

## ✅ After Setting Up

1. **Save the postback URL**
2. **Test it:**
   - Complete a test offer
   - Check if postback is received
   - View at: `https://addtok.com/api/completions`

3. **Verify in OGAds:**
   - Look for postback logs
   - Check if calls are being made
   - Status should be 200 OK

---

## 🆘 Can't Find Postback Settings?

If you can't find postback options:

1. **Check different sections:**
   - Settings
   - Campaign settings
   - Tools
   - Account settings

2. **Contact OGAds Support:**
   - They can guide you to the correct section
   - Or enable postback for your account

3. **Check Documentation:**
   - OGAds has docs on setting up postbacks
   - Look for their help/support section

---

## 💡 Important Notes

- **Postback URL:** Must be exactly as shown above
- **Fire Timing:** Should be on conversion/approval (not click)
- **Test First:** Complete a test offer to verify it works
- **Check Logs:** View postback logs in OGAds dashboard

---

**The exact option names might vary, but you want it to fire when conversions are approved/completed!** ✅

