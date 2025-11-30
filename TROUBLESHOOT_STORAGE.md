# Troubleshooting: Can't See Storage Items in Edge Config

If you can't see items stored in Edge Config, follow these troubleshooting steps:

---

## 🔍 Step 1: Verify Environment Variables Are Set

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select project: **aryantiktok1**
   - Go to: **Settings** → **Environment Variables**

2. **Check these 3 variables exist:**
   - ✅ `EDGE_CONFIG` - Full connection string
   - ✅ `EDGE_CONFIG_ID` - Just the ID
   - ✅ `EDGE_CONFIG_WRITE_TOKEN` - Write token

3. **Verify they're set for Production:**
   - Make sure Production checkbox is checked for each variable

4. **If missing, add them:**
   - See `HOW_TO_GET_CREDENTIALS.md` for instructions

---

## 🔍 Step 2: Check If Postback Is Working

### **Test Postback Endpoint:**

Visit this URL in your browser:
```
https://addtok.com/api/postback?offer_id=123&offer_name=Test+Offer&payout=1.50&session_ip=127.0.0.1
```

**Expected:** Should return `OK`

**If it returns error:**
- Check Vercel function logs (see Step 3)
- Verify environment variables are set correctly

---

## 🔍 Step 3: Check Vercel Function Logs

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select project: **aryantiktok1**
   - Go to: **Deployments** tab

2. **Open Latest Deployment:**
   - Click on the latest deployment

3. **View Function Logs:**
   - Click: **Function Logs** tab
   - Filter for: `/api/postback`

4. **Look for errors:**
   - ❌ "Edge Config not configured" → Environment variables missing
   - ❌ "Invalid token" → Write token issue
   - ❌ "Error storing completion" → API call failed

---

## 🔍 Step 4: Verify Edge Config Dashboard

### **Check Your Edge Config:**

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select project: **aryantiktok1**
   - Go to: **Storage** tab

2. **Click on Your Edge Config:**
   - Click on your Edge Config database name

3. **Check for Keys:**
   - Look for key: `all_completions`
   - Look for keys like: `completion_*`

### **If No Keys Appear:**

The data might not be storing. Check:
- Write token permissions
- Edge Config ID is correct
- Function logs for errors

---

## 🔍 Step 5: Test Edge Config Directly

### **Option 1: Test Postback API**

Visit:
```
https://addtok.com/api/postback?offer_id=999&offer_name=Direct+Test&payout=5.00&session_ip=192.168.1.100
```

Then immediately check:
```
https://addtok.com/api/completions
```

Should show the test completion.

### **Option 2: Check Completions API**

Visit:
```
https://addtok.com/api/completions
```

**Expected:** JSON response with completions array

**If empty:** Data isn't being stored

---

## 🐛 Common Issues & Solutions

### **Issue 1: "Edge Config not configured" Error**

**Symptoms:**
- Postback returns error
- Function logs show: "Edge Config not configured"

**Solution:**
1. Add all 3 environment variables in Vercel
2. Redeploy project
3. Test again

---

### **Issue 2: Write Token Invalid**

**Symptoms:**
- Postback returns OK but no data stored
- Function logs show authentication errors

**Solution:**
1. Go to Edge Config → Settings → Tokens
2. Verify write token exists
3. If not, create a new Write Token
4. Update `EDGE_CONFIG_WRITE_TOKEN` environment variable
5. Redeploy project

---

### **Issue 3: Edge Config ID Wrong**

**Symptoms:**
- Postback works but data doesn't store
- API calls fail

**Solution:**
1. Go to Edge Config dashboard
2. Copy the correct Edge Config ID
3. Update `EDGE_CONFIG_ID` environment variable
4. Redeploy project

---

### **Issue 4: Data Storing But Not Visible**

**Symptoms:**
- Completions API shows data
- But Edge Config dashboard shows nothing

**Possible Reasons:**
- Edge Config dashboard might have a delay
- Data is stored in a different format
- Need to refresh dashboard

**Solution:**
1. Wait a few minutes and refresh Edge Config dashboard
2. Check `/api/completions` - if it shows data, storage is working
3. Edge Config dashboard UI might not show all keys

---

## ✅ Quick Diagnostic Checklist

Use this checklist to diagnose:

- [ ] All 3 environment variables are set in Vercel
- [ ] Environment variables are set for Production environment
- [ ] Project has been redeployed after adding variables
- [ ] Postback endpoint returns `OK` (not error)
- [ ] Function logs show no errors
- [ ] `/api/completions` endpoint returns data
- [ ] Edge Config dashboard is refreshed

---

## 🔧 Manual Test Procedure

Follow these steps in order:

1. **Test Postback:**
   ```
   Visit: https://addtok.com/api/postback?offer_id=TEST123&offer_name=Manual+Test&payout=1.00&session_ip=127.0.0.1
   ```
   Expected: `OK`

2. **Wait 5 seconds** (for processing)

3. **Check Completions:**
   ```
   Visit: https://addtok.com/api/completions
   ```
   Expected: JSON with your test completion

4. **Check Function Logs:**
   - Go to Vercel → Deployments → Function Logs
   - Look for: `✅ Offer Completed (Edge Config):`

5. **Check Edge Config Dashboard:**
   - Go to Vercel → Storage → Your Edge Config
   - Look for keys

---

## 📊 Expected Behavior

When working correctly:

1. **Postback receives request** → Returns `OK`
2. **Function logs** → Shows: `✅ Offer Completed (Edge Config):`
3. **Completions API** → Shows JSON with completion data
4. **Edge Config** → Stores data (may take a moment to appear in UI)

---

## 🆘 Still Not Working?

If you've tried everything above:

1. **Check Function Logs:**
   - Look for specific error messages
   - Share error details for help

2. **Verify Edge Config Setup:**
   - Confirm Edge Config is created
   - Confirm connection string is valid
   - Confirm write token has permissions

3. **Test Environment Variables:**
   - Try pulling env vars locally: `vercel env pull`
   - Check if variables are correct

4. **Redeploy:**
   - Sometimes a fresh deployment fixes issues
   - Go to Deployments → Redeploy

---

## 💡 Pro Tip

The **completions API** (`/api/completions`) is the most reliable way to verify data is stored. If that shows data, your storage is working - even if Edge Config dashboard doesn't show it yet.

---

**Need more help?** Check the specific error message in function logs and share it for targeted troubleshooting.

