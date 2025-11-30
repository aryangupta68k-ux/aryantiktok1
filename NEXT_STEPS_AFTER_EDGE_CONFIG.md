# Next Steps After Creating Edge Config

Great! You've created your Edge Config database. Now let's set it up properly for postback tracking.

---

## ✅ What You've Done

- ✅ Created Edge Config database in Vercel
- ✅ Downloaded environment variables locally

---

## 🔍 Step 1: Verify Environment Variables in Vercel

You need to make sure these 3 environment variables are set in your Vercel project:

### **Check in Vercel Dashboard:**

1. Go to: **Vercel Dashboard** → **aryantiktok1** project
2. Click: **Settings** → **Environment Variables**
3. Verify you have these 3 variables:

   - ✅ `EDGE_CONFIG` - Full connection string
   - ✅ `EDGE_CONFIG_ID` - Just the ID (e.g., `ecfg_xxx`)
   - ✅ `EDGE_CONFIG_WRITE_TOKEN` - Write token

### **If Missing - Add Them:**

If any are missing, add them:

1. **EDGE_CONFIG** (Connection String):
   - Go to: Storage → Your Edge Config → Copy connection string
   - Add as environment variable: `EDGE_CONFIG`
   - Value: Full connection string from Vercel

2. **EDGE_CONFIG_ID** (ID Only):
   - Extract ID from connection string (part between `/` and `?`)
   - Add as environment variable: `EDGE_CONFIG_ID`
   - Value: Just the ID (e.g., `ecfg_abc123xyz`)

3. **EDGE_CONFIG_WRITE_TOKEN** (Write Token):
   - Go to: Edge Config → Settings → Tokens
   - Create a **Write Token**
   - Copy token (you'll only see it once!)
   - Add as environment variable: `EDGE_CONFIG_WRITE_TOKEN`
   - Value: Your write token

4. **Set for All Environments:**
   - Make sure each variable is enabled for:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

---

## 🚀 Step 2: Redeploy Your Project

After adding environment variables, you MUST redeploy:

1. Go to: **Deployments** tab
2. Click **"..."** (three dots) on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

**OR** push a new commit to trigger auto-deploy.

---

## ✅ Step 3: Verify Setup

### **Test 1: Test Postback Endpoint**

Visit this URL (replace with your domain):
```
https://addtok.com/api/postback?offer_id=123&offer_name=Test+Offer&payout=1.50&session_ip=127.0.0.1
```

**Expected Response:** `OK`

### **Test 2: Check Function Logs**

1. Go to: **Deployments** → Latest deployment
2. Click: **Function Logs**
3. Filter for: `/api/postback`
4. Look for: `✅ Offer Completed (Edge Config):`

### **Test 3: View Stored Data**

Visit:
```
https://addtok.com/api/completions
```

Should return JSON with completion data.

---

## 📊 Step 4: View Edge Config Data

1. Go to: **Storage** → Your Edge Config
2. Browse keys and values
3. After testing, you should see:
   - Key: `all_completions` - Array of all completions
   - Keys: `completion_*` - Individual completion records

---

## 🔧 Step 5: Configure OGAds Postback

Now that Edge Config is set up, configure your postback URL in OGAds:

1. **Log in to OGAds:** https://app.ogads.com
2. **Go to:** Settings → Postback
3. **Add Postback URL:**
   ```
   https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&aff_sub4={aff_sub4}
   ```
4. **Set:** Fire on "Conversion"
5. **Save**

See `POSTBACK_SETUP_GUIDE.md` for detailed instructions.

---

## 📝 Checklist

- [ ] Edge Config database created ✅
- [ ] Environment variables downloaded locally ✅
- [ ] `EDGE_CONFIG` variable added in Vercel
- [ ] `EDGE_CONFIG_ID` variable added in Vercel
- [ ] `EDGE_CONFIG_WRITE_TOKEN` variable added in Vercel
- [ ] All variables set for Production, Preview, Development
- [ ] Project redeployed after adding variables
- [ ] Tested postback endpoint (returns `OK`)
- [ ] Verified data stored in Edge Config
- [ ] OGAds postback URL configured

---

## 🐛 Troubleshooting

### **Problem: Postback returns error**

**Check:**
- All 3 environment variables are set
- Variables are set for the correct environment (Production/Preview)
- Project was redeployed after adding variables

**Solution:**
- Verify variables in Settings → Environment Variables
- Redeploy project
- Check function logs for specific error messages

---

### **Problem: Data not storing**

**Check:**
- Write token is valid (not expired/revoked)
- Write token has proper permissions
- Edge Config ID is correct

**Solution:**
- Regenerate write token if needed
- Test postback manually first
- Check function logs for errors

---

## 📖 Related Documentation

- **Edge Config Setup:** `EDGE_CONFIG_SETUP.md`
- **Postback Setup:** `POSTBACK_SETUP_GUIDE.md`
- **Database Setup:** `VERCEL_DATABASE_SETUP.md`

---

## 🎉 You're Almost Done!

Once you:
1. ✅ Add the 3 environment variables in Vercel
2. ✅ Redeploy your project
3. ✅ Test the postback endpoint

Your postback tracking system will be fully operational! 🚀

