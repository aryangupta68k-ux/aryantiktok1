# Vercel Edge Config Setup Guide

## ✅ Step 1: Install Edge Config Package

Already done! The `@vercel/edge-config` package is installed in `package.json`.

## ✅ Step 2: Create Edge Config Database in Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project: **aryantiktok1**
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Edge Config**
6. Choose a name (e.g., `ogads-completions`) or use the default
7. Click **Create**

## ✅ Step 3: Get Edge Config Connection String

After creating Edge Config, you'll see:

1. **Connection String** - This contains the `EDGE_CONFIG` environment variable
   - Format: `https://edge-config.vercel.com/your-config-id?token=your-token`
   
2. **Edge Config ID** - Extract from the connection string
   - It's the part after `/` and before `?`
   - Example: `ecfg_abc123xyz`

3. **Access Token** - Extract from the connection string
   - It's the part after `token=`
   - This is your read token

## ✅ Step 4: Get Write Token

Edge Config requires a separate write token for updates:

1. Go to your Edge Config in Vercel Dashboard
2. Click on your Edge Config database
3. Go to **Settings** → **Tokens**
4. Create a new **Write Token**
5. Copy the token (you'll only see it once!)

## ✅ Step 5: Add Environment Variables

1. In Vercel Dashboard → **aryantiktok1** project
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

   **Variable 1:**
   - Name: `EDGE_CONFIG`
   - Value: (paste your full connection string)
   - Environment: Production, Preview, Development (select all)
   
   **Variable 2:**
   - Name: `EDGE_CONFIG_ID`
   - Value: (your Edge Config ID, e.g., `ecfg_abc123xyz`)
   - Environment: Production, Preview, Development (select all)
   
   **Variable 3:**
   - Name: `EDGE_CONFIG_WRITE_TOKEN`
   - Value: (your write token from Step 4)
   - Environment: Production, Preview, Development (select all)

4. Click **Save**
5. **Redeploy** your project (Settings → Deployments → ... → Redeploy)

## ✅ Step 6: Initialize Edge Config

After setup, the postback system will automatically:
- Store completions in Edge Config when postbacks are received
- Check completions from Edge Config (fast, edge-optimized reads)
- View all completions via `/api/completions`

## 📊 Current API Endpoints (Using Edge Config)

- **POSTBACK**: `https://addtok.com/api/postback` (stores to Edge Config)
- **VIEW COMPLETIONS**: `https://addtok.com/api/completions` (reads from Edge Config)
- **CHECK COMPLETION**: `https://addtok.com/api/check-completion` (reads from Edge Config)

## 🔍 Verify Edge Config is Working

1. **Test the Postback Endpoint:**
   ```
   https://addtok.com/api/postback?offer_id=123&offer_name=Test+Offer&payout=1.50&session_ip=127.0.0.1
   ```

2. **View Completions:**
   ```
   https://addtok.com/api/completions
   ```

3. **Check Edge Config Dashboard:**
   - Go to Vercel Dashboard → Storage → Your Edge Config
   - You should see keys like `all_completions` and `completion_*`

## ⚠️ Important Notes

### Edge Config vs KV

**Edge Config:**
- ✅ Optimized for **reads** (ultra-fast, edge-distributed)
- ✅ Best for configuration data and frequent lookups
- ⚠️ Writes are slower (via REST API)
- ⚠️ Not ideal for very high write volumes

**KV:**
- ✅ Optimized for **writes** (fast writes and reads)
- ✅ Better for high-frequency data storage
- ✅ Supports lists and complex operations

**For Postback Tracking:**
- Edge Config works great if you have moderate write volume
- If you have very high postback volume, consider KV instead

## 🐛 Troubleshooting

### Error: "Edge Config not configured"

- Make sure `EDGE_CONFIG`, `EDGE_CONFIG_ID`, and `EDGE_CONFIG_WRITE_TOKEN` are set
- Redeploy your project after adding environment variables
- Check that variables are set for all environments (Production, Preview, Development)

### Error: "Invalid token" or authentication errors

- Verify `EDGE_CONFIG_WRITE_TOKEN` is a **Write Token**, not a Read Token
- Check that tokens haven't expired
- Regenerate tokens if needed

### No data appearing in Edge Config

- Test the postback endpoint manually first
- Check Vercel function logs in the dashboard
- Verify Edge Config write token has proper permissions
- Check Edge Config dashboard for stored keys

## 📖 Edge Config Documentation

For more information:
- https://vercel.com/docs/storage/edge-config
- https://vercel.com/docs/storage/edge-config/edge-config-rest-api

---

**Note:** Edge Config is optimized for fast reads at the edge. For postback tracking with high write volume, you may want to use KV instead.

