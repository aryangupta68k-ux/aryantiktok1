# Vercel Database Setup Guide - Edge Config

Complete step-by-step guide to set up Edge Config database for postback tracking.

---

## 📋 Overview

This project uses **Vercel Edge Config** to store offer completion data from OGAds postbacks. Edge Config is perfect for this use case because it provides:
- ✅ Ultra-fast reads at the edge (global distribution)
- ✅ Low latency for checking completions
- ✅ Optimized for frequent lookups

---

## 🚀 Step-by-Step Setup

### **Step 1: Access Vercel Dashboard**

1. Go to: https://vercel.com/dashboard
2. Log in with your Vercel account
3. Select your project: **aryantiktok1**

---

### **Step 2: Create Edge Config Database**

1. **Navigate to Storage Tab**
   - In your project dashboard, click on the **"Storage"** tab
   - Or go directly: https://vercel.com/dashboard → Your Project → **Storage**

2. **Create New Database**
   - Click the **"Create Database"** button
   - Or click **"Add Database"** if you see that option

3. **Select Edge Config**
   - From the database options, select **"Edge Config"**
   - You'll see: "Edge Config - Key-value store optimized for reads"

4. **Configure Edge Config**
   - **Name**: Enter a name (e.g., `ogads-completions` or `content-locker`)
   - **Region**: Choose the closest region to your users (optional, default is fine)
   - Click **"Create"**

5. **Wait for Creation**
   - Edge Config will be created in a few seconds
   - You'll see a success message

---

### **Step 3: Get Edge Config Connection String**

After creation, you'll see your Edge Config details:

1. **Copy Connection String**
   - Look for the **"Connection String"** section
   - It looks like:
     ```
     https://edge-config.vercel.com/ecfg_abc123xyz?token=vercel_token_xyz789
     ```
   - **⚠️ IMPORTANT:** Copy this entire string immediately (you might not see it again)

2. **Extract Edge Config ID**
   - From the connection string, extract the ID
   - It's the part between `/` and `?`
   - Example: `ecfg_abc123xyz`

3. **Note the Token**
   - The token in the connection string is your **Read Token**
   - You'll need a separate **Write Token** for storing data

---

### **Step 4: Create Write Token**

1. **Access Edge Config Settings**
   - In your Edge Config dashboard, click on your Edge Config name
   - Or go to the **"Settings"** tab

2. **Go to Tokens Section**
   - Click on **"Tokens"** or **"Access Tokens"**
   - You'll see existing tokens (usually just the read token)

3. **Create Write Token**
   - Click **"Create Token"** or **"Add Token"**
   - Select token type: **"Write"** or **"Full Access"**
   - Enter a description (e.g., "Postback write access")
   - Click **"Create"** or **"Generate"**

4. **Copy Write Token**
   - **⚠️ CRITICAL:** Copy the write token immediately
   - You'll only see it once!
   - Format: Usually starts with `vercel_token_` or similar
   - Save it securely

---

### **Step 5: Add Environment Variables**

Now add the Edge Config credentials to your Vercel project:

1. **Go to Project Settings**
   - In your Vercel project dashboard
   - Click **"Settings"** tab
   - Click **"Environment Variables"** in the left sidebar

2. **Add Environment Variable 1: EDGE_CONFIG**
   - Click **"Add New"**
   - **Key**: `EDGE_CONFIG`
   - **Value**: Paste your full connection string from Step 3
     ```
     https://edge-config.vercel.com/ecfg_abc123xyz?token=vercel_token_xyz789
     ```
   - **Environment**: Check all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **"Save"**

3. **Add Environment Variable 2: EDGE_CONFIG_ID**
   - Click **"Add New"** again
   - **Key**: `EDGE_CONFIG_ID`
   - **Value**: Paste your Edge Config ID (just the ID part)
     ```
     ecfg_abc123xyz
     ```
   - **Environment**: Check all three (Production, Preview, Development)
   - Click **"Save"**

4. **Add Environment Variable 3: EDGE_CONFIG_WRITE_TOKEN**
   - Click **"Add New"** one more time
   - **Key**: `EDGE_CONFIG_WRITE_TOKEN`
   - **Value**: Paste your write token from Step 4
     ```
     vercel_token_write_xyz789
     ```
   - **Environment**: Check all three (Production, Preview, Development)
   - Click **"Save"**

5. **Verify All Variables**
   - You should now see three environment variables:
     - ✅ `EDGE_CONFIG`
     - ✅ `EDGE_CONFIG_ID`
     - ✅ `EDGE_CONFIG_WRITE_TOKEN`

---

### **Step 6: Redeploy Your Project**

Environment variables only take effect after redeployment:

1. **Go to Deployments Tab**
   - Click **"Deployments"** in your project dashboard
   - Find your latest deployment

2. **Redeploy**
   - Click the **"..."** (three dots) menu on the latest deployment
   - Click **"Redeploy"**
   - Or push a new commit to trigger automatic deployment

3. **Wait for Deployment**
   - Wait for the deployment to complete
   - Check that it's successful (green checkmark)

---

### **Step 7: Verify Setup**

Test that everything is working:

1. **Test Postback Endpoint**
   - Open this URL in your browser:
     ```
     https://addtok.com/api/postback?offer_id=123&offer_name=Test+Offer&payout=1.50&session_ip=127.0.0.1
     ```
   - Expected response: `OK`

2. **Check Vercel Function Logs**
   - Go to Vercel Dashboard → Deployments
   - Click on latest deployment
   - Go to **"Function Logs"**
   - Look for: `✅ Offer Completed (Edge Config):`

3. **View Edge Config Data**
   - Go to Vercel Dashboard → Storage → Your Edge Config
   - Click on your Edge Config database
   - Browse keys and values
   - You should see keys like:
     - `all_completions` - List of all completions
     - `completion_*` - Individual completion records

4. **Test View Completions API**
   - Visit:
     ```
     https://addtok.com/api/completions
     ```
   - Should return JSON with completion data

---

## ✅ Setup Checklist

Use this checklist to ensure everything is configured:

- [ ] Edge Config database created in Vercel
- [ ] Edge Config ID copied and saved
- [ ] Write token created and copied
- [ ] `EDGE_CONFIG` environment variable added
- [ ] `EDGE_CONFIG_ID` environment variable added
- [ ] `EDGE_CONFIG_WRITE_TOKEN` environment variable added
- [ ] All environment variables set for Production, Preview, and Development
- [ ] Project redeployed after adding environment variables
- [ ] Test postback URL returns `OK`
- [ ] Edge Config shows stored data
- [ ] Function logs show successful completion storage

---

## 🐛 Troubleshooting

### **Problem: "Edge Config not configured" Error**

**Symptoms:**
- Postback returns error 500
- Function logs show: "Edge Config not configured"

**Solution:**
1. Check that all 3 environment variables are set:
   - `EDGE_CONFIG`
   - `EDGE_CONFIG_ID`
   - `EDGE_CONFIG_WRITE_TOKEN`

2. Verify they're set for the correct environment (Production/Preview/Development)

3. Redeploy your project after adding variables

4. Check variable values don't have extra spaces or quotes

---

### **Problem: "Invalid token" Error**

**Symptoms:**
- Postback works but data isn't stored
- Function logs show authentication errors

**Solution:**
1. Verify `EDGE_CONFIG_WRITE_TOKEN` is a **Write Token**, not Read Token
2. Check token hasn't expired or been revoked
3. Regenerate write token in Edge Config settings
4. Update environment variable with new token
5. Redeploy project

---

### **Problem: No Data in Edge Config**

**Symptoms:**
- Postback returns `OK` but no data appears in Edge Config

**Solution:**
1. Check Vercel function logs for errors
2. Verify write token has proper permissions
3. Test postback manually first:
   ```
   https://addtok.com/api/postback?offer_id=123&offer_name=Test&payout=1.50&session_ip=127.0.0.1
   ```
4. Check Edge Config dashboard after test
5. Verify Edge Config ID is correct in environment variables

---

### **Problem: Environment Variables Not Found**

**Symptoms:**
- Functions can't access environment variables
- Values appear empty or undefined

**Solution:**
1. Make sure variables are set for the correct environment:
   - Production deployments need Production variables
   - Preview deployments need Preview variables
   - Local dev needs Development variables

2. Redeploy after adding/changing variables

3. Check variable names match exactly (case-sensitive):
   - `EDGE_CONFIG` (not `edge_config`)
   - `EDGE_CONFIG_ID` (not `edge_config_id`)
   - `EDGE_CONFIG_WRITE_TOKEN` (not `edge_config_write_token`)

---

## 📊 Edge Config Structure

Your Edge Config will store data like this:

```
Key: all_completions
Value: [
  {
    "offer_id": "123",
    "offer_name": "TikTok Signup",
    "payout": "1.50",
    "session_ip": "192.168.1.1",
    "timestamp": 1234567890,
    ...
  },
  ...
]

Key: completion_1234567890_123_192.168.1.1
Value: {
  "offer_id": "123",
  "offer_name": "TikTok Signup",
  ...
}
```

---

## 🔗 Important Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Edge Config Docs**: https://vercel.com/docs/storage/edge-config
- **Edge Config REST API**: https://vercel.com/docs/storage/edge-config/edge-config-rest-api
- **Your Project**: https://vercel.com/dashboard/[your-team]/aryantiktok1

---

## 📖 Next Steps

After Edge Config is set up:

1. ✅ Configure postback URL in OGAds (see `POSTBACK_SETUP_GUIDE.md`)
2. ✅ Test with a real offer completion
3. ✅ Monitor completions via `/api/completions`
4. ✅ Set up monitoring/alerts if needed

---

## 💡 Tips

1. **Save Credentials**: Save Edge Config ID and tokens in a secure password manager
2. **Test First**: Always test manually before configuring in OGAds
3. **Monitor Logs**: Check function logs regularly to catch issues early
4. **Backup**: Edge Config data is automatically backed up by Vercel

---

## 🆘 Need Help?

1. Check Vercel function logs: Dashboard → Deployments → Function Logs
2. Review Edge Config dashboard: Dashboard → Storage → Your Edge Config
3. Test endpoints manually (see Step 7)
4. Check Vercel documentation: https://vercel.com/docs/storage/edge-config

---

**Your Edge Config database is now ready for postback tracking!** 🚀

