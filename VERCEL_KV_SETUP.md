# Vercel KV Setup Guide

## ✅ Step 1: Install Vercel KV in Your Project

Already done! The `@vercel/kv` package is installed in `package.json`.

## ✅ Step 2: Create KV Database in Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project: **aryantiktok1**
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **KV (Redis)**
6. Choose a name (e.g., `content-locker-kv`) or use the default
7. Choose a region (closest to your users, e.g., `us-east-1`)
8. Click **Create**

## ✅ Step 3: Link KV to Your Project

1. After creating the KV database, Vercel will automatically add environment variables to your project:
   - `KV_URL` - Redis connection URL
   - `KV_REST_API_URL` - REST API endpoint
   - `KV_REST_API_TOKEN` - Authentication token
   - `KV_REST_API_READ_ONLY_TOKEN` - Read-only token (optional)

2. **Verify the variables are set:**
   - Go to **Settings** → **Environment Variables**
   - You should see the KV variables listed

## ✅ Step 4: Redeploy Your Project

After adding the KV database, redeploy your project:

```bash
vercel --prod
```

Or push to your main branch (if auto-deploy is enabled).

## ✅ Step 5: Test Your Setup

### Test the Postback Endpoint:

Visit (replace with your domain):
```
https://addtok.com/api/postback?offer_id=123&offer_name=Test+Offer&payout=1.50&session_ip=127.0.0.1
```

You should get an `OK` response and see logs in Vercel dashboard.

### View Completions:

Visit:
```
https://addtok.com/api/completions
```

You should see a JSON response with all stored completions.

### Check Completion Status:

```
https://addtok.com/api/check-completion?offer_id=123&ip=127.0.0.1
```

## 🔍 Verify KV is Working

1. Go to Vercel Dashboard → **Storage** → Your KV database
2. You can browse keys and values directly
3. After a postback, you should see:
   - Keys like `completion:1234567890:123:127.0.0.1`
   - A list key: `all_completions`

## ⚠️ Troubleshooting

### Error: "kv is not defined" or connection errors

- Make sure environment variables are set in Vercel dashboard
- Redeploy your project after adding KV database
- Check that `@vercel/kv` is installed: `npm list @vercel/kv`

### Error: "Invalid token" or authentication errors

- Verify environment variables in Vercel Settings → Environment Variables
- Make sure you're using the correct environment (Production, Preview, Development)

### No data appearing in KV

- Test the postback endpoint manually first
- Check Vercel function logs in the dashboard
- Verify OGAds is calling your postback URL correctly

## 📊 Current API Endpoints

- **POSTBACK**: `https://addtok.com/api/postback` (called by OGAds)
- **VIEW COMPLETIONS**: `https://addtok.com/api/completions` (view all stored completions)
- **CHECK COMPLETION**: `https://addtok.com/api/check-completion` (check specific offer completion)

## 🔗 OGAds Postback Setup

In your OGAds account:

1. Go to **Postbacks** section
2. Add new postback URL:
   ```
   https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&aff_sub4={aff_sub4}
   ```
3. Configure which conversions trigger the postback (usually "Approved")
4. Save and test

---

**Need help?** Check Vercel KV documentation: https://vercel.com/docs/storage/vercel-kv

