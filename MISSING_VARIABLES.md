# ⚠️ Missing Environment Variables

## Problem

Your postback is returning `{"error":"Edge Config not configured"}` because you're missing 2 environment variables.

**Currently set:**
- ✅ `EDGE_CONFIG` - You have this

**Missing:**
- ❌ `EDGE_CONFIG_ID` - Need to add
- ❌ `EDGE_CONFIG_WRITE_TOKEN` - Need to add

---

## ✅ Fix: Add Missing Variables

### **Step 1: Get Edge Config ID**

From your `EDGE_CONFIG` connection string, extract the ID:

1. **Get your connection string:**
   - Go to: Vercel Dashboard → Storage → Your Edge Config
   - Copy the connection string (it's in your `EDGE_CONFIG` variable)

2. **Extract the ID:**
   - Connection string looks like: `https://edge-config.vercel.com/ecfg_XXXXX?token=YYYYY`
   - The ID is the part between `/` and `?`
   - Example: `ecfg_abc123xyz`

### **Step 2: Get Write Token**

1. **Go to Edge Config:**
   - Vercel Dashboard → Storage → Your Edge Config
   - Click on your Edge Config name

2. **Create Write Token:**
   - Go to: **Settings** → **Tokens**
   - Click: **"Create Token"**
   - Select: **"Write"** or **"Full Access"**
   - Description: `Postback write access`
   - Click: **"Create"**
   - **⚠️ COPY THE TOKEN IMMEDIATELY** (you'll only see it once!)

### **Step 3: Add Missing Variables in Vercel**

1. **Go to Environment Variables:**
   - Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

2. **Add `EDGE_CONFIG_ID`:**
   - Click: **"Add New"**
   - **Key**: `EDGE_CONFIG_ID`
   - **Value**: Your Edge Config ID (from Step 1)
     ```
     ecfg_xxxxxxxxxxxxx
     ```
   - **Environment**: Check ✅ Production, ✅ Preview, ✅ Development
   - Click: **"Save"**

3. **Add `EDGE_CONFIG_WRITE_TOKEN`:**
   - Click: **"Add New"** again
   - **Key**: `EDGE_CONFIG_WRITE_TOKEN`
   - **Value**: Your write token (from Step 2)
     ```
     vercel_token_write_zzzzzzzzzz
     ```
   - **Environment**: Check ✅ Production, ✅ Preview, ✅ Development
   - Click: **"Save"**

4. **Verify:**
   - You should now have 3 variables:
     - ✅ `EDGE_CONFIG`
     - ✅ `EDGE_CONFIG_ID`
     - ✅ `EDGE_CONFIG_WRITE_TOKEN`

---

### **Step 4: Redeploy**

⚠️ **CRITICAL:** You MUST redeploy after adding variables!

1. **Go to Deployments:**
   - Vercel Dashboard → **Deployments** tab

2. **Redeploy:**
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**
   - Wait for completion

---

### **Step 5: Test**

After redeployment:

```
https://addtok.com/api/postback?offer_id=123&offer_name=Test&payout=1.50&session_ip=127.0.0.1
```

**Expected:** Should return `OK` (not error)

Then check:
```
https://addtok.com/api/completions
```

Should show your test completion!

---

## 📝 Quick Checklist

- [ ] Get Edge Config ID from connection string
- [ ] Create Write Token in Edge Config settings
- [ ] Add `EDGE_CONFIG_ID` environment variable
- [ ] Add `EDGE_CONFIG_WRITE_TOKEN` environment variable
- [ ] Set both for Production, Preview, Development
- [ ] Redeploy project
- [ ] Test postback endpoint
- [ ] Verify data appears in `/api/completions`

---

**After adding these 2 missing variables and redeploying, storage will work!** ✅

