# 🔧 Fix Right Now - You're Missing 2 Variables!

## ❌ What I Found

I checked your environment variables. You currently have:
- ✅ `EDGE_CONFIG` - You have this
- ❌ `EDGE_CONFIG_ID` - **MISSING!**
- ❌ `EDGE_CONFIG_WRITE_TOKEN` - **MISSING!**

That's why you're getting: `{"error":"Edge Config not configured"}`

---

## ✅ Fix in 5 Minutes

### **Step 1: Get Edge Config ID (2 minutes)**

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Project: **aryantiktok1**
   - **Settings** → **Environment Variables**
   - Find the `EDGE_CONFIG` variable

2. **Look at the Value:**
   - It should look like: `https://edge-config.vercel.com/ecfg_XXXXX?token=YYYYY`
   - The ID is the part: `ecfg_XXXXX` (between `/` and `?`)
   - **Copy this ID**

### **Step 2: Get Write Token (2 minutes)**

1. **Go to Edge Config:**
   - Vercel Dashboard → **Storage** → Your Edge Config
   - Click on your Edge Config name

2. **Create/Get Write Token:**
   - Click: **Settings** → **Tokens**
   - If you see a token with type "Write" → Copy it
   - If not → Click **"Create Token"** → Select **"Write"** → Copy it
   - **Copy the token value**

### **Step 3: Add Missing Variables (1 minute)**

1. **Go back to Environment Variables:**
   - Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

2. **Add `EDGE_CONFIG_ID`:**
   - Click: **"Add New"**
   - **Key**: `EDGE_CONFIG_ID`
   - **Value**: Paste the ID from Step 1 (e.g., `ecfg_abc123xyz`)
   - ✅ Check: **Production**, Preview, Development
   - Click: **"Save"**

3. **Add `EDGE_CONFIG_WRITE_TOKEN`:**
   - Click: **"Add New"** again
   - **Key**: `EDGE_CONFIG_WRITE_TOKEN`
   - **Value**: Paste the token from Step 2
   - ✅ Check: **Production**, Preview, Development
   - Click: **"Save"**

### **Step 4: Redeploy (REQUIRED!)**

⚠️ **YOU MUST REDEPLOY OR IT WON'T WORK!**

1. **Go to Deployments:**
   - Click: **Deployments** tab

2. **Redeploy:**
   - Click **"..."** on latest deployment
   - Click: **"Redeploy"**
   - Wait 1-2 minutes

### **Step 5: Test**

After redeployment:
```
https://addtok.com/api/postback?offer_id=123&offer_name=Test&payout=1.50&session_ip=127.0.0.1
```

**Should return:** `OK` ✅

---

## 📋 Quick Checklist

- [ ] Got Edge Config ID from `EDGE_CONFIG` connection string
- [ ] Got Write Token from Edge Config → Settings → Tokens
- [ ] Added `EDGE_CONFIG_ID` environment variable (Production checked)
- [ ] Added `EDGE_CONFIG_WRITE_TOKEN` environment variable (Production checked)
- [ ] Redeployed project
- [ ] Tested postback (returns `OK`)

---

## 🆘 Can't Find the Values?

**If you can't find Edge Config ID:**
- Go to: Storage → Your Edge Config
- Look at the URL or connection details
- The ID starts with `ecfg_`

**If you can't find Write Token:**
- Go to: Storage → Your Edge Config → Settings → Tokens
- Create a new one: Click "Create Token" → Select "Write"
- Copy immediately (you'll only see it once!)

---

**After adding these 2 missing variables and redeploying, it will work!** ✅

