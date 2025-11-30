# How to Find Your Edge Config Connection String

## 🔍 Where to Find It

The connection string is your `EDGE_CONFIG` environment variable. Here's how to find it:

---

## 📍 Method 1: From Environment Variables (Easiest)

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select project: **aryantiktok1**
   - Click: **Settings** → **Environment Variables**

2. **Find `EDGE_CONFIG` Variable:**
   - Look for the variable named `EDGE_CONFIG`
   - The value is your connection string
   - Click on it to view the value (it might be shown as "Encrypted")

3. **If Encrypted:**
   - Click the variable row to expand
   - You should see the value or be able to copy it

---

## 📍 Method 2: From Edge Config Dashboard

1. **Go to Storage:**
   - Vercel Dashboard → **Storage** tab
   - Click on your Edge Config database

2. **Find Connection String:**
   - Look for section: **"Connection String"** or **"Connection"**
   - It should show the full connection string
   - Format: `https://edge-config.vercel.com/ecfg_xxxxx?token=yyyyy`

---

## 📝 What It Looks Like

Your connection string will look like this:

```
https://edge-config.vercel.com/ecfg_abc123xyz?token=vercel_token_xyz789
```

**Breakdown:**
- `https://edge-config.vercel.com/` - Base URL
- `ecfg_abc123xyz` - **This is your Edge Config ID** (between `/` and `?`)
- `?token=vercel_token_xyz789` - Read token

---

## 🔑 Extract the ID from Connection String

From the connection string above:
```
https://edge-config.vercel.com/ecfg_abc123xyz?token=vercel_token_xyz789
                                  └─────────────┘
                                  This is EDGE_CONFIG_ID!
```

The **Edge Config ID** is: `ecfg_abc123xyz`

---

## 📋 Quick Steps

1. **Find your `EDGE_CONFIG` variable:**
   - Settings → Environment Variables
   - Or Storage → Your Edge Config

2. **Copy the connection string**

3. **Extract the ID:**
   - It's the part between `/` and `?`
   - Starts with `ecfg_`

4. **Use it for `EDGE_CONFIG_ID` variable**

---

## 🎯 Example

**Connection String:**
```
https://edge-config.vercel.com/ecfg_2a3b4c5d6e7f?token=vercel_token_abc123def456
```

**Extract:**
- **EDGE_CONFIG_ID:** `ecfg_2a3b4c5d6e7f`
- **Token part:** `vercel_token_abc123def456` (this is read token, not write token)

---

## ⚠️ Important Note

The connection string contains:
- ✅ Edge Config ID (use for `EDGE_CONFIG_ID`)
- ✅ Read Token (not what you need for writing)

For writing, you need a **separate Write Token**:
- Go to: Edge Config → Settings → Tokens
- Create a **Write Token**

---

**Your connection string is in your `EDGE_CONFIG` environment variable!** Check Settings → Environment Variables to find it. ✅

