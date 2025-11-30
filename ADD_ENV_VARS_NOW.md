# Add Environment Variables - You Have the Values!

Since you have the Edge Config ID and Write Token values, let's add them as environment variables right now!

---

## ✅ Quick Steps to Add

### **Option 1: Via Vercel Dashboard (Recommended - Easiest)**

1. **Go to Environment Variables:**
   - https://vercel.com/dashboard
   - Select project: **aryantiktok1**
   - Click: **Settings** → **Environment Variables**

2. **Add First Variable:**
   - Click: **"Add New"** button
   - **Key**: `EDGE_CONFIG_ID`
   - **Value**: Paste your Edge Config ID (the value you have)
   - ✅ Check: **Production**, Preview, Development
   - Click: **"Save"**

3. **Add Second Variable:**
   - Click: **"Add New"** button again
   - **Key**: `EDGE_CONFIG_WRITE_TOKEN`
   - **Value**: Paste your Write Token (the value you have)
   - ✅ Check: **Production**, Preview, Development
   - Click: **"Save"**

4. **Verify:**
   - You should now see 3 variables:
     - ✅ `EDGE_CONFIG`
     - ✅ `EDGE_CONFIG_ID` (newly added)
     - ✅ `EDGE_CONFIG_WRITE_TOKEN` (newly added)

5. **Redeploy:**
   - Go to: **Deployments** tab
   - Click **"..."** on latest deployment
   - Click: **"Redeploy"**
   - Wait 1-2 minutes

6. **Test:**
   ```
   https://addtok.com/api/postback?offer_id=123&offer_name=Test&payout=1.50&session_ip=127.0.0.1
   ```
   Should return: `OK` ✅

---

### **Option 2: Via Vercel CLI**

If you prefer command line, you can add them via CLI:

```bash
# Add EDGE_CONFIG_ID
vercel env add EDGE_CONFIG_ID production

# Add EDGE_CONFIG_WRITE_TOKEN  
vercel env add EDGE_CONFIG_WRITE_TOKEN production
```

Then paste the values when prompted.

**But Dashboard is easier!** 😊

---

## 📋 Exact Steps in Dashboard

1. **Open:** https://vercel.com/dashboard → Your Project → Settings → Environment Variables

2. **Add `EDGE_CONFIG_ID`:**
   - Key: `EDGE_CONFIG_ID`
   - Value: (paste your Edge Config ID)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

3. **Add `EDGE_CONFIG_WRITE_TOKEN`:**
   - Key: `EDGE_CONFIG_WRITE_TOKEN`
   - Value: (paste your Write Token)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

4. **Redeploy:** Deployments → Redeploy

5. **Done!** ✅

---

## ⚠️ Important Notes

- **Variable Names Must Be Exact:**
  - `EDGE_CONFIG_ID` (not `edge_config_id` or `EDGE_CONFIG-ID`)
  - `EDGE_CONFIG_WRITE_TOKEN` (not `EDGE_CONFIG_WRITE_TOKEN_` or `edge_config_write_token`)

- **Production Must Be Checked:**
  - Make sure ✅ Production is checked for both variables
  - Otherwise they won't work in production!

- **Redeploy Required:**
  - After adding, you MUST redeploy
  - Environment variables only work after redeployment

---

## 🎯 After Adding

Once you add both variables and redeploy:

1. Postback will work ✅
2. Data will be stored ✅
3. You can view completions at `/api/completions` ✅

---

**Just add the 2 variables with the values you have, redeploy, and you're done!** 🚀

