# Add Token from Storage to Environment Variables

You have the token in Edge Config storage, but it needs to be added as an **environment variable** in your Vercel project settings for it to work.

---

## ✅ What You Need to Do

The token exists in **Edge Config storage**, but your code reads from **Environment Variables**. You need to copy it from storage to environment variables.

---

## 🔧 Step-by-Step: Add Token to Environment Variables

### **Step 1: Get Your Write Token from Storage**

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select project: **aryantiktok1**
   - Go to: **Storage** tab

2. **Open Your Edge Config:**
   - Click on your Edge Config database name

3. **Get Write Token:**
   - Go to: **Settings** → **Tokens**
   - Look for a token with type **"Write"** or **"Full Access"**
   - **If you don't have one:** Click **"Create Token"** → Select **"Write"** → Copy the token
   - **Copy the token value** (looks like: `vercel_token_xxxxx`)

### **Step 2: Get Your Edge Config ID**

From your Edge Config dashboard:

1. **Option 1: From Connection String**
   - Look for the connection string in Edge Config dashboard
   - It looks like: `https://edge-config.vercel.com/ecfg_XXXXX?token=YYY`
   - Extract the ID: `ecfg_XXXXX` (the part between `/` and `?`)

2. **Option 2: From URL**
   - Look at the URL when viewing your Edge Config
   - The ID is in the URL

3. **Option 3: From Existing EDGE_CONFIG Variable**
   - Go to: **Settings** → **Environment Variables**
   - Find `EDGE_CONFIG` variable
   - The connection string shows the ID

### **Step 3: Add Environment Variables**

1. **Go to Environment Variables:**
   - Vercel Dashboard → **aryantiktok1** → **Settings** → **Environment Variables**

2. **Add `EDGE_CONFIG_ID`:**
   - Click: **"Add New"** button
   - **Key**: `EDGE_CONFIG_ID`
   - **Value**: Your Edge Config ID (from Step 2)
     ```
     ecfg_xxxxxxxxxxxxx
     ```
   - **Environment**: Check ✅ **Production**, ✅ Preview, ✅ Development
   - Click: **"Save"**

3. **Add `EDGE_CONFIG_WRITE_TOKEN`:**
   - Click: **"Add New"** button again
   - **Key**: `EDGE_CONFIG_WRITE_TOKEN`
   - **Value**: Your write token (from Step 1)
     ```
     vercel_token_write_xxxxxxxxxxxxx
     ```
   - **Environment**: Check ✅ **Production**, ✅ Preview, ✅ Development
   - Click: **"Save"**

4. **Verify:**
   - You should now have **3 environment variables**:
     - ✅ `EDGE_CONFIG`
     - ✅ `EDGE_CONFIG_ID` (newly added)
     - ✅ `EDGE_CONFIG_WRITE_TOKEN` (newly added)

### **Step 4: Redeploy (REQUIRED!)**

⚠️ **CRITICAL:** Environment variables only work after redeployment!

1. **Go to Deployments:**
   - Click: **Deployments** tab

2. **Redeploy:**
   - Click **"..."** (three dots) on latest deployment
   - Click: **"Redeploy"**
   - Wait for deployment to complete (1-2 minutes)

### **Step 5: Test**

After redeployment completes:

```
https://addtok.com/api/postback?offer_id=123&offer_name=Test&payout=1.50&session_ip=127.0.0.1
```

**Expected:** Should return `OK` (not error!)

Then check:
```
https://addtok.com/api/completions
```

Should show your test completion data!

---

## 🔍 Quick Reference

**Where to find tokens:**
- Vercel Dashboard → Storage → Your Edge Config → Settings → Tokens

**Where to add environment variables:**
- Vercel Dashboard → Your Project → Settings → Environment Variables

**What you need:**
1. Edge Config ID (from connection string or dashboard)
2. Write Token (from Edge Config → Settings → Tokens)

**After adding:**
- Always redeploy!
- Test the postback endpoint

---

## ✅ Checklist

- [ ] Found Write Token in Edge Config storage
- [ ] Got Edge Config ID
- [ ] Added `EDGE_CONFIG_ID` as environment variable (Production checked)
- [ ] Added `EDGE_CONFIG_WRITE_TOKEN` as environment variable (Production checked)
- [ ] Redeployed project
- [ ] Tested postback endpoint (returns `OK`)

---

## 🆘 If Token Not Visible

If you can't see the token value in Edge Config storage:

1. **Create New Write Token:**
   - Edge Config → Settings → Tokens
   - Click: **"Create Token"**
   - Type: **"Write"** or **"Full Access"**
   - Copy immediately (you'll only see it once!)

2. **Or use Connection String Token:**
   - The connection string has a token (read token)
   - But you need a **write token** for storing data
   - Create one in Settings → Tokens

---

**After copying the token from storage to environment variables and redeploying, it will work!** ✅

