# Fix: Can't See Storage Items - Edge Config Not Configured

## ❌ Problem Found

Your postback endpoint is returning:
```json
{"error":"Edge Config not configured"}
```

This means the environment variables are **not set in your Vercel production environment**.

---

## ✅ Solution: Add Environment Variables

You need to add 3 environment variables in Vercel Dashboard:

### **Step 1: Get Your Edge Config Credentials**

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select project: **aryantiktok1**
   - Go to: **Storage** tab

2. **Click on Your Edge Config:**
   - Click on your Edge Config database name

3. **Get Connection String:**
   - Copy the full connection string
   - It looks like: `https://edge-config.vercel.com/ecfg_xxx?token=yyy`

4. **Extract Edge Config ID:**
   - From connection string, extract the ID part (between `/` and `?`)
   - Example: `ecfg_abc123xyz`

5. **Get Write Token:**
   - Go to: Edge Config → Settings → Tokens
   - Create a **Write Token** if you don't have one
   - Copy the token (you'll only see it once!)

---

### **Step 2: Add Environment Variables in Vercel**

1. **Go to Project Settings:**
   - https://vercel.com/dashboard
   - Select project: **aryantiktok1**
   - Click: **Settings** tab
   - Click: **Environment Variables** (left sidebar)

2. **Add Variable 1: EDGE_CONFIG**
   - Click: **"Add New"** button
   - **Key**: `EDGE_CONFIG`
   - **Value**: Paste your full connection string
     ```
     https://edge-config.vercel.com/ecfg_xxxxxxxxxxxxx?token=vercel_token_yyyyyyyyyy
     ```
   - **Environment**: Check all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click: **"Save"**

3. **Add Variable 2: EDGE_CONFIG_ID**
   - Click: **"Add New"** button again
   - **Key**: `EDGE_CONFIG_ID`
   - **Value**: Paste just the ID part (extract from connection string)
     ```
     ecfg_xxxxxxxxxxxxx
     ```
   - **Environment**: Check all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click: **"Save"**

4. **Add Variable 3: EDGE_CONFIG_WRITE_TOKEN**
   - Click: **"Add New"** button one more time
   - **Key**: `EDGE_CONFIG_WRITE_TOKEN`
   - **Value**: Paste your write token
     ```
     vercel_token_write_zzzzzzzzzz
     ```
   - **Environment**: Check all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click: **"Save"**

5. **Verify All Variables:**
   - You should see 3 variables listed:
     - ✅ `EDGE_CONFIG`
     - ✅ `EDGE_CONFIG_ID`
     - ✅ `EDGE_CONFIG_WRITE_TOKEN`
   - Make sure all have Production checked ✅

---

### **Step 3: Redeploy Your Project**

⚠️ **IMPORTANT:** Environment variables only take effect after redeployment!

1. **Go to Deployments Tab:**
   - In your Vercel project dashboard
   - Click: **Deployments** tab

2. **Redeploy:**
   - Click the **"..."** (three dots) menu on the latest deployment
   - Click: **"Redeploy"**
   - Wait for deployment to complete (1-2 minutes)

   **OR** push a new commit to trigger auto-deploy:
   ```bash
   git commit --allow-empty -m "Trigger redeploy for Edge Config"
   git push
   ```

---

### **Step 4: Test Again**

After redeployment completes:

1. **Test Postback:**
   ```
   https://addtok.com/api/postback?offer_id=123&offer_name=Test+After+Fix&payout=1.50&session_ip=127.0.0.1
   ```
   **Expected:** Should return `OK` (not an error)

2. **Check Completions:**
   ```
   https://addtok.com/api/completions
   ```
   **Expected:** Should return JSON with completion data

3. **Check Edge Config Dashboard:**
   - Go to: Storage → Your Edge Config
   - Should see keys like `all_completions` and `completion_*`

---

## ✅ Verification Checklist

After adding variables and redeploying:

- [ ] All 3 environment variables added in Vercel
- [ ] All variables have Production checkbox checked
- [ ] Project redeployed after adding variables
- [ ] Postback returns `OK` (not error)
- [ ] `/api/completions` shows data
- [ ] Edge Config dashboard shows stored keys

---

## 🐛 Still Not Working?

If you still see "Edge Config not configured" after redeploying:

1. **Double-check variable names:**
   - Must be exactly: `EDGE_CONFIG`, `EDGE_CONFIG_ID`, `EDGE_CONFIG_WRITE_TOKEN`
   - Case-sensitive, no extra spaces

2. **Verify Production is checked:**
   - Make sure Production checkbox is checked for all 3 variables

3. **Check deployment logs:**
   - Go to: Deployments → Latest deployment → Build Logs
   - Look for any errors during build

4. **Wait a few minutes:**
   - Sometimes takes a moment for env vars to propagate

5. **Try a fresh deployment:**
   - Make a small change and push to trigger new deployment

---

## 📖 Quick Reference

**Where to add variables:**
- Vercel Dashboard → Your Project → Settings → Environment Variables

**What you need:**
- Connection string (from Edge Config dashboard)
- Edge Config ID (extract from connection string)
- Write token (create in Edge Config → Settings → Tokens)

**After adding:**
- Always redeploy!
- Test postback endpoint
- Check completions API

---

**Once you add the 3 environment variables and redeploy, storage will work!** 🚀

