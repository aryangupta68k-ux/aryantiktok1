# How to Get Edge Config Credentials

I cannot access your Vercel account or generate credentials for you. You need to create them yourself in the Vercel Dashboard. Here's exactly where to find everything:

---

## 🔐 Step-by-Step: Getting Your Credentials

### **Step 1: Create Edge Config Database**

1. Go to: **https://vercel.com/dashboard**
2. Click on your project: **aryantiktok1**
3. Click the **"Storage"** tab (left sidebar)
4. Click **"Create Database"** button
5. Select **"Edge Config"**
6. Enter a name: `ogads-completions` (or any name)
7. Click **"Create"**

✅ **After creation, you'll see your Edge Config with a connection string.**

---

### **Step 2: Get Your Connection String**

Right after creating Edge Config, you'll see:

**Connection String** (this is what you need for `EDGE_CONFIG`):
```
https://edge-config.vercel.com/ecfg_XXXXXXXXXXXXXXXX?token=vercel_token_YYYYYYYYYY
```

**Copy this entire string** - this is your `EDGE_CONFIG` environment variable.

---

### **Step 3: Extract Edge Config ID**

From the connection string above, extract the ID:

**Edge Config ID** (the part between `/` and `?`):
```
ecfg_XXXXXXXXXXXXXXXX
```

This is your `EDGE_CONFIG_ID` environment variable.

---

### **Step 4: Get Write Token**

1. In your Edge Config dashboard, click on your Edge Config name
2. Go to **"Settings"** tab (or look for **"Tokens"**)
3. Click **"Create Token"** or **"Add Token"**
4. Select token type: **"Write"** or **"Full Access"**
5. Enter description: `Postback write access`
6. Click **"Create"** or **"Generate"**
7. **⚠️ COPY THE TOKEN IMMEDIATELY** - you'll only see it once!

This is your `EDGE_CONFIG_WRITE_TOKEN` environment variable.

---

## 📝 Credentials Checklist

After following the steps above, you should have:

- [ ] **EDGE_CONFIG**: Full connection string
  ```
  https://edge-config.vercel.com/ecfg_XXXXXXXXXXXXXXXX?token=vercel_token_YYYYYYYYYY
  ```

- [ ] **EDGE_CONFIG_ID**: Just the ID part
  ```
  ecfg_XXXXXXXXXXXXXXXX
  ```

- [ ] **EDGE_CONFIG_WRITE_TOKEN**: Write token
  ```
  vercel_token_write_ZZZZZZZZZZ
  ```

---

## 🔗 Direct Links to Access

**Your Vercel Dashboard:**
- https://vercel.com/dashboard

**Your Project Storage:**
- https://vercel.com/dashboard → Select "aryantiktok1" → Click "Storage"

**Your Project Settings:**
- https://vercel.com/dashboard → Select "aryantiktok1" → Click "Settings" → "Environment Variables"

---

## 🆘 I Can't See My Connection String!

If you already created Edge Config but can't see the connection string:

1. **Check Edge Config Settings:**
   - Go to: Vercel Dashboard → Storage → Your Edge Config
   - Click on your Edge Config name
   - Look for "Connection String" or "Connection Details"

2. **Create a New Token:**
   - If connection string is missing, you can create a new read token
   - Go to Settings → Tokens → Create Token (Read)
   - Use this to reconstruct the connection string:
     ```
     https://edge-config.vercel.com/[YOUR_EDGE_CONFIG_ID]?token=[NEW_READ_TOKEN]
     ```

3. **Find Edge Config ID:**
   - The ID is visible in the URL when viewing your Edge Config
   - Or check the Edge Config name/details page

---

## ⚠️ Security Reminders

- **Never share your tokens publicly**
- **Never commit tokens to git**
- **Save tokens in a password manager**
- **Regenerate tokens if they're exposed**

---

## 📖 Need More Help?

1. **Vercel Documentation:**
   - Edge Config: https://vercel.com/docs/storage/edge-config
   - Getting Started: https://vercel.com/docs/storage/edge-config/get-started

2. **Check Your Project:**
   - Make sure you're logged into the correct Vercel account
   - Verify you have access to the project

3. **Contact Vercel Support:**
   - If you're having trouble accessing your dashboard
   - https://vercel.com/support

---

## ✅ After You Get Credentials

Once you have all three credentials:

1. **Add Environment Variables:**
   - Go to: Settings → Environment Variables
   - Add each one as described in `VERCEL_DATABASE_SETUP.md`

2. **Redeploy:**
   - Redeploy your project after adding variables

3. **Test:**
   - Test your postback endpoint

---

**I cannot generate these for you - they must be created in your Vercel Dashboard!**

Follow the steps above to get your credentials. 🚀

