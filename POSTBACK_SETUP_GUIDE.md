# OGAds Postback URL Setup Guide

Complete step-by-step instructions for setting up postback tracking with your Vercel deployment.

---

## 📋 Prerequisites

Before setting up the postback URL, make sure you have:

- ✅ **Domain connected**: `addtok.com` is connected to your Vercel project
- ✅ **Edge Config setup**: Edge Config database created and environment variables configured
- ✅ **Project deployed**: Latest code deployed to Vercel
- ✅ **OGAds account**: Active OGAds account with access to postback settings

---

## 🎯 Step 1: Get Your Postback URL

Your postback endpoint is already deployed at:

```
https://addtok.com/api/postback
```

### **Recommended Postback URL (Simple):**

Use this URL in OGAds - it includes the essential tracking parameters:

```
https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&aff_sub4={aff_sub4}
```

### **Full Postback URL (All Parameters):**

If you want to track all available parameters:

```
https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&affiliate_id={affiliate_id}&aff_sub={aff_sub}&aff_sub2={aff_sub2}&aff_sub3={aff_sub3}&aff_sub4={aff_sub4}&aff_sub5={aff_sub5}&source={source}&date={date}&time={time}&datetime={datetime}&session_timestamp={session_timestamp}&ran={ran}
```

**Note:** Use the simple version unless you need all tracking parameters.

---

## 🔧 Step 2: Set Up Postback in OGAds Dashboard

### **Option A: Global Postback (Recommended)**

Applies to all campaigns:

1. **Log in to OGAds Dashboard**
   - Go to: https://app.ogads.com
   - Log in with your credentials

2. **Navigate to Postback Settings**
   - Click on your **Profile/Account** icon (top right)
   - Go to **Settings** → **Postback**
   - Or go directly to: https://app.ogads.com/settings/postback

3. **Add Postback URL**
   - Find the **"Global Postback URL"** section
   - Paste your postback URL:
     ```
     https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&aff_sub4={aff_sub4}
     ```

4. **Configure Postback Settings**
   - **Fire On**: Select **"Conversion"** (fires when an offer is completed/approved)
   - **Method**: Leave as **GET** (default)
   - **Status**: Make sure it's **Enabled**

5. **Save Settings**
   - Click **"Save"** or **"Update Postback"**
   - Confirm the settings are saved

### **Option B: Campaign-Specific Postback**

To use different postbacks for different campaigns:

1. Go to **Campaigns** → Select your campaign
2. Click **Edit Campaign**
3. Go to **Postback** section
4. Add the same postback URL
5. Set **Fire On**: **Conversion**
6. Save campaign

---

## ✅ Step 3: Test Your Postback URL

### **Test 1: Manual Browser Test**

Open this URL in your browser (replace values as needed):

```
https://addtok.com/api/postback?offer_id=123&offer_name=Test+Offer&payout=1.50&session_ip=127.0.0.1
```

**Expected Response:** `OK`

If you see `OK`, your postback endpoint is working! ✅

### **Test 2: View Stored Completions**

Check if completions are being stored:

```
https://addtok.com/api/completions
```

You should see JSON data with completion records.

### **Test 3: Check Specific Completion**

Check if a specific offer was completed:

```
https://addtok.com/api/check-completion?offer_id=123&ip=127.0.0.1
```

---

## 🧪 Step 4: Test with Real Offer Completion

1. **Complete a Test Offer**
   - Use your content locker
   - Click "Apply Now"
   - Complete an offer

2. **Check Postback Logs in OGAds**
   - Go to OGAds Dashboard → **Reports** → **Postback Logs**
   - You should see your postback URL being called
   - Status should be **200 OK**

3. **Verify in Your System**
   - Check Vercel function logs (Dashboard → Deployments → Function Logs)
   - Visit `https://addtok.com/api/completions` to see stored completions

---

## 📊 Understanding Postback Parameters

Here's what each parameter means:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `{offer_id}` | Unique offer ID | `12345` |
| `{offer_name}` | Name of the offer | `TikTok Account Signup` |
| `{payout}` | Amount you earn per completion | `1.50` |
| `{session_ip}` | User's IP address | `192.168.1.1` |
| `{aff_sub4}` | Custom tracking parameter | `user_123` |
| `{affiliate_id}` | Your affiliate ID | `36932` |
| `{source}` | Traffic source | `organic` |

**Note:** OGAds will automatically replace these placeholders with actual values when the postback is sent.

---

## 🔍 Step 5: Verify Postback is Working

### **Check OGAds Postback Logs**

1. Go to OGAds Dashboard → **Reports** → **Postback Logs**
2. Look for your domain: `addtok.com`
3. Check the status column:
   - ✅ **200 OK** = Success
   - ❌ **4xx/5xx** = Error (check logs)

### **Check Vercel Function Logs**

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on latest deployment
3. Go to **Function Logs**
4. Filter for `/api/postback`
5. Look for: `✅ Offer Completed (Edge Config):`

### **Check Edge Config Data**

1. Go to Vercel Dashboard → **Storage** → Your Edge Config
2. Browse keys and values
3. Look for `all_completions` key
4. Verify completion data is stored

---

## 🐛 Troubleshooting

### **Problem: Postback Not Firing**

**Check:**
- ✅ Postback URL is correctly formatted in OGAds
- ✅ Postback is set to fire on **"Conversion"** (not "Click")
- ✅ Campaign is active and receiving traffic
- ✅ Offers are actually completing (not just clicking)

**Solution:**
- Verify the offer actually converts (signs up, downloads, etc.)
- Check OGAds postback logs for any error messages
- Ensure domain `addtok.com` is accessible

### **Problem: Postback Returns Error**

**Check:**
- ✅ Edge Config is set up correctly
- ✅ Environment variables are configured
- ✅ Project is deployed after adding env vars
- ✅ Edge Config write token has permissions

**Common Errors:**

**"Edge Config not configured"**
- Add `EDGE_CONFIG`, `EDGE_CONFIG_ID`, and `EDGE_CONFIG_WRITE_TOKEN` environment variables
- Redeploy project

**"Invalid token"**
- Verify `EDGE_CONFIG_WRITE_TOKEN` is a **Write Token**, not Read Token
- Regenerate token in Edge Config settings

### **Problem: Postback Fires but No Data Stored**

**Check:**
- ✅ Edge Config write token has proper permissions
- ✅ Edge Config database exists and is connected
- ✅ Check Vercel function logs for errors
- ✅ Verify Edge Config dashboard shows stored keys

**Solution:**
- Test postback manually first (see Test 1)
- Check Vercel function logs for error messages
- Verify Edge Config connection string is correct

### **Problem: Can't Access Postback Endpoint**

**Check:**
- ✅ Domain `addtok.com` is connected to Vercel project
- ✅ DNS is properly configured
- ✅ SSL certificate is active (Vercel auto-generates this)

**Solution:**
- Wait for DNS propagation (can take up to 24 hours)
- Verify domain in Vercel Dashboard → Domains
- Check domain DNS settings match Vercel requirements

---

## 📝 Postback URL Reference

### **Quick Copy-Paste URLs**

**Simple (Recommended):**
```
https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&aff_sub4={aff_sub4}
```

**Full (All Parameters):**
```
https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&affiliate_id={affiliate_id}&aff_sub={aff_sub}&aff_sub2={aff_sub2}&aff_sub3={aff_sub3}&aff_sub4={aff_sub4}&aff_sub5={aff_sub5}&source={source}&date={date}&time={time}&datetime={datetime}&session_timestamp={session_timestamp}&ran={ran}
```

---

## ✅ Checklist

Use this checklist to ensure everything is set up correctly:

- [ ] Domain `addtok.com` connected to Vercel project
- [ ] Edge Config database created in Vercel
- [ ] Environment variables added (`EDGE_CONFIG`, `EDGE_CONFIG_ID`, `EDGE_CONFIG_WRITE_TOKEN`)
- [ ] Project redeployed after adding environment variables
- [ ] Postback URL added in OGAds dashboard
- [ ] Postback set to fire on **"Conversion"**
- [ ] Postback status is **Enabled**
- [ ] Tested postback URL manually (returns `OK`)
- [ ] Verified completions are being stored (`/api/completions`)
- [ ] Checked OGAds postback logs (status: 200 OK)
- [ ] Tested with real offer completion

---

## 🆘 Need Help?

1. **Check Vercel Function Logs**: Dashboard → Deployments → Function Logs
2. **Check OGAds Postback Logs**: Dashboard → Reports → Postback Logs
3. **Test Manually**: Use the test URLs provided above
4. **Review Documentation**: See `EDGE_CONFIG_SETUP.md` for Edge Config setup

---

## 🎉 Success!

Once your postback is set up correctly:

- ✅ OGAds will automatically send completion notifications to your server
- ✅ Completions will be stored in Edge Config
- ✅ You can view all completions at `/api/completions`
- ✅ You can check completion status via `/api/check-completion`

Your postback tracking system is now fully operational! 🚀

