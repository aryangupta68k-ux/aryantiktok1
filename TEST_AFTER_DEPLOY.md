# Test After Deployment

## ✅ Environment Variables Added

Great! You've added the environment variables. Now let's test if everything works!

---

## 🚀 Deployment Status

Deployment is in progress. Wait 1-2 minutes for it to complete.

---

## ✅ Step 1: Verify Variables Are Set

Check that all 3 variables are added:

1. Go to: Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Verify you see:
   - ✅ `EDGE_CONFIG`
   - ✅ `EDGE_CONFIG_ID`
   - ✅ `EDGE_CONFIG_WRITE_TOKEN`

**If any are missing:** Add them now before testing!

---

## 🧪 Step 2: Test Postback Endpoint

After deployment completes (wait 1-2 minutes), test:

```
https://addtok.com/api/postback?offer_id=123&offer_name=Test+Offer&payout=1.50&session_ip=127.0.0.1
```

### **Expected Results:**

✅ **Success:** Returns `OK`

❌ **Error:** Returns `{"error":"Edge Config not configured"}`

---

## 🔍 Step 3: Check Function Logs

If you get an error, check the logs:

1. Go to: Vercel Dashboard → **Deployments**
2. Click on latest deployment
3. Go to: **Function Logs**
4. Filter for: `/api/postback`
5. Look for errors or success messages

---

## ✅ Step 4: Verify Data Storage

If postback returns `OK`, check if data was stored:

### **View Completions:**
```
https://addtok.com/api/completions
```

**Expected:** JSON with completion data

### **Check Edge Config:**
1. Go to: Vercel Dashboard → **Storage** → Your Edge Config
2. Look for keys:
   - `all_completions`
   - `completion_*`

---

## 🎉 Success Checklist

After deployment and testing:

- [ ] All 3 environment variables are set
- [ ] Deployment completed successfully
- [ ] Postback returns `OK` (not error)
- [ ] Completions API shows data
- [ ] Edge Config dashboard shows stored keys
- [ ] Function logs show success messages

---

## 🐛 If Still Not Working

If you still get `{"error":"Edge Config not configured"}`:

1. **Verify all 3 variables exist:**
   - Check Environment Variables page
   - Make sure all are set for Production

2. **Check variable names are exact:**
   - `EDGE_CONFIG_ID` (not `edge_config_id`)
   - `EDGE_CONFIG_WRITE_TOKEN` (not `edge_config_write_token`)

3. **Verify Production is checked:**
   - Make sure Production ✅ is checked for all variables

4. **Wait and redeploy:**
   - Sometimes takes a few minutes to propagate
   - Try redeploying again

5. **Check function logs:**
   - Look for specific error messages
   - Share error details if still not working

---

## 🚀 Next Steps After Success

Once postback is working:

1. ✅ Configure OGAds postback URL (see `POSTBACK_SETUP_GUIDE.md`)
2. ✅ Test with real offer completion
3. ✅ Monitor completions at `/api/completions`

---

**Wait for deployment to complete, then test the postback endpoint!** 🎯

