# Quick Fix: "Edge Config not configured" Error

## ❌ Current Error

```
{"error":"Edge Config not configured"}
```

This means your postback endpoint can't find the required environment variables.

---

## ✅ Required Environment Variables

Your code needs these **3 variables** to work:

1. `EDGE_CONFIG` - Full connection string ✅ (you have this)
2. `EDGE_CONFIG_ID` - Just the ID part ❌ (missing)
3. `EDGE_CONFIG_WRITE_TOKEN` - Write token ❌ (missing)

---

## 🚀 Quick Fix Steps

### **Step 1: Extract Edge Config ID**

Your `EDGE_CONFIG` variable has a connection string like:
```
https://edge-config.vercel.com/ecfg_abc123xyz?token=vercel_token_yyy
```

The **ID** is the part between `/` and `?`: `ecfg_abc123xyz`

### **Step 2: Get Write Token**

1. Go to: **Vercel Dashboard** → **Storage** → Your Edge Config
2. Click: **Settings** → **Tokens**
3. Click: **Create Token**
4. Select: **Write** or **Full Access**
5. Copy the token (you'll only see it once!)

### **Step 3: Add Missing Variables**

1. Go to: **Vercel Dashboard** → **aryantiktok1** → **Settings** → **Environment Variables**

2. **Add `EDGE_CONFIG_ID`:**
   - Click: **Add New**
   - **Key**: `EDGE_CONFIG_ID`
   - **Value**: Your Edge Config ID (e.g., `ecfg_abc123xyz`)
   - ✅ Check: Production, Preview, Development
   - **Save**

3. **Add `EDGE_CONFIG_WRITE_TOKEN`:**
   - Click: **Add New**
   - **Key**: `EDGE_CONFIG_WRITE_TOKEN`
   - **Value**: Your write token
   - ✅ Check: Production, Preview, Development
   - **Save**

4. **Verify you have all 3:**
   - ✅ `EDGE_CONFIG`
   - ✅ `EDGE_CONFIG_ID`
   - ✅ `EDGE_CONFIG_WRITE_TOKEN`

### **Step 4: Redeploy (REQUIRED!)**

⚠️ **Environment variables only work after redeployment!**

1. Go to: **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes for completion

### **Step 5: Test**

After redeployment, test:
```
https://addtok.com/api/postback?offer_id=123&offer_name=Test&payout=1.50&session_ip=127.0.0.1
```

**Should return:** `OK` (not an error)

---

## 🔍 How to Find Your Edge Config ID

### **Method 1: From Connection String**

1. Go to: Vercel Dashboard → Settings → Environment Variables
2. Find `EDGE_CONFIG` variable
3. The connection string is: `https://edge-config.vercel.com/ecfg_XXXXX?token=YYY`
4. Extract `ecfg_XXXXX` (the part between `/` and `?`)

### **Method 2: From Edge Config Dashboard**

1. Go to: Vercel Dashboard → Storage → Your Edge Config
2. Click on your Edge Config name
3. Look at the URL - it shows the ID
4. Or check the "Connection" section

---

## ⚠️ Common Mistakes

1. **Forgot to redeploy** - Variables only work after redeployment!
2. **Production not checked** - Make sure Production checkbox is checked ✅
3. **Wrong variable names** - Must be exactly:
   - `EDGE_CONFIG_ID` (not `EDGE_CONFIG_ID_` or `edge_config_id`)
   - `EDGE_CONFIG_WRITE_TOKEN` (not `EDGE_CONFIG_TOKEN`)
4. **Wrong ID format** - Should start with `ecfg_`

---

## 📋 Checklist

- [ ] Got Edge Config ID from connection string
- [ ] Created Write Token in Edge Config settings
- [ ] Added `EDGE_CONFIG_ID` variable (Production checked)
- [ ] Added `EDGE_CONFIG_WRITE_TOKEN` variable (Production checked)
- [ ] Redeployed project
- [ ] Tested postback endpoint (returns `OK`)

---

## 🆘 Still Not Working?

If you still get the error after redeploying:

1. **Check variable names are exact:**
   - `EDGE_CONFIG_ID` (case-sensitive)
   - `EDGE_CONFIG_WRITE_TOKEN` (case-sensitive)

2. **Verify Production is checked:**
   - Go to Environment Variables
   - Make sure Production ✅ is checked for all 3

3. **Wait 2-3 minutes:**
   - Sometimes takes a moment to propagate

4. **Check function logs:**
   - Deployments → Latest → Function Logs
   - Look for the actual error message

5. **Try a fresh deployment:**
   - Make a small code change
   - Push and redeploy

---

**After adding the 2 missing variables and redeploying, the error will be fixed!** ✅

