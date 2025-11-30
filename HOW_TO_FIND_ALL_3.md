# How to Find All 3 Environment Variables - Complete Guide

Step-by-step guide to find/extract/create all 3 required environment variables.

---

## ✅ Variable 1: EDGE_CONFIG (You Already Have This!)

### **Where to Find It:**

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select project: **aryantiktok1**
   - Click: **Settings** → **Environment Variables**

2. **Look for:**
   - Variable name: `EDGE_CONFIG`
   - This is your connection string
   - ✅ You already have this!

**What it looks like:**
```
https://edge-config.vercel.com/ecfg_abc123xyz?token=vercel_token_xyz789
```

---

## 🔍 Variable 2: EDGE_CONFIG_ID (Extract from EDGE_CONFIG)

### **Step-by-Step to Extract:**

1. **Go to Environment Variables:**
   - Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

2. **Find `EDGE_CONFIG` Variable:**
   - Click on it to view the value
   - You'll see the connection string

3. **Look at the Connection String:**
   ```
   https://edge-config.vercel.com/ecfg_abc123xyz?token=vercel_token_xyz789
   ```

4. **Extract the ID:**
   - Find the part **between `/` and `?`**
   - That's your Edge Config ID!
   - Example: `ecfg_abc123xyz` ← **This is EDGE_CONFIG_ID!**

### **Visual Breakdown:**

```
https://edge-config.vercel.com/ecfg_abc123xyz?token=vercel_token_xyz789
                            └─────────────────┘
                            ↑ Extract this part ↑
                            This is EDGE_CONFIG_ID
```

### **Example:**

**Connection String:**
```
https://edge-config.vercel.com/ecfg_2a3b4c5d6e7f?token=vercel_token_abc123
```

**Extracted ID:**
```
ecfg_2a3b4c5d6e7f
```

**This is what you use for `EDGE_CONFIG_ID` variable!**

---

## 🔑 Variable 3: EDGE_CONFIG_WRITE_TOKEN (Create in Edge Config)

### **Step-by-Step to Create:**

1. **Go to Storage:**
   - Vercel Dashboard → **Storage** tab
   - Click on your Edge Config database name

2. **Go to Settings:**
   - Click: **Settings** tab (or look for **"Tokens"** section)

3. **Go to Tokens:**
   - Click: **"Tokens"** or **"Access Tokens"**

4. **Check for Existing Write Token:**
   - Look for a token with type: **"Write"** or **"Full Access"**
   - If you see one → Click to view and copy it

5. **If No Write Token Exists, Create One:**
   - Click: **"Create Token"** or **"Add Token"** button
   - **Token Type:** Select **"Write"** or **"Full Access"**
   - **Description:** Enter something like: `Postback write access`
   - Click: **"Create"** or **"Generate"**

6. **Copy the Token:**
   - ⚠️ **IMPORTANT:** Copy the token immediately!
   - You'll only see it once!
   - It will look like: `vercel_token_write_xxxxx` or `vercel_token_xxxxx`

### **What It Looks Like:**

```
vercel_token_write_abc123def456xyz789
```

or

```
vercel_token_abc123def456xyz789
```

**This is what you use for `EDGE_CONFIG_WRITE_TOKEN` variable!**

---

## 📋 Complete Checklist

### **Step 1: Find EDGE_CONFIG**
- [ ] Go to: Settings → Environment Variables
- [ ] Find: `EDGE_CONFIG` variable
- [ ] ✅ Already have it!

### **Step 2: Extract EDGE_CONFIG_ID**
- [ ] Open `EDGE_CONFIG` variable to view value
- [ ] Look at connection string
- [ ] Find part between `/` and `?`
- [ ] Copy that part (starts with `ecfg_`)
- [ ] This is your `EDGE_CONFIG_ID` value

### **Step 3: Get EDGE_CONFIG_WRITE_TOKEN**
- [ ] Go to: Storage → Your Edge Config
- [ ] Go to: Settings → Tokens
- [ ] Check for existing Write token OR create new one
- [ ] Copy the token value
- [ ] This is your `EDGE_CONFIG_WRITE_TOKEN` value

### **Step 4: Add Missing Variables**
- [ ] Add `EDGE_CONFIG_ID`:
  - Key: `EDGE_CONFIG_ID`
  - Value: (the ID you extracted)
  - Check: Production, Preview, Development
- [ ] Add `EDGE_CONFIG_WRITE_TOKEN`:
  - Key: `EDGE_CONFIG_WRITE_TOKEN`
  - Value: (the write token you copied)
  - Check: Production, Preview, Development

### **Step 5: Redeploy**
- [ ] Go to: Deployments
- [ ] Click: Redeploy
- [ ] Wait for completion

---

## 🎯 Example Walkthrough

### **Example Connection String:**
```
https://edge-config.vercel.com/ecfg_2a3b4c5d6e7f?token=vercel_token_read_abc123
```

### **Step 1: Extract ID**
- Look between `/` and `?`
- ID: `ecfg_2a3b4c5d6e7f`
- This goes in `EDGE_CONFIG_ID` variable

### **Step 2: Get Write Token**
- Go to Edge Config → Settings → Tokens
- Create Write token
- Token: `vercel_token_write_xyz789`
- This goes in `EDGE_CONFIG_WRITE_TOKEN` variable

### **Step 3: Add Variables**
1. **EDGE_CONFIG_ID**
   - Key: `EDGE_CONFIG_ID`
   - Value: `ecfg_2a3b4c5d6e7f`

2. **EDGE_CONFIG_WRITE_TOKEN**
   - Key: `EDGE_CONFIG_WRITE_TOKEN`
   - Value: `vercel_token_write_xyz789`

---

## ⚠️ Important Notes

1. **EDGE_CONFIG:**
   - ✅ You already have this
   - Full connection string
   - Contains ID + read token

2. **EDGE_CONFIG_ID:**
   - ❌ Need to add this
   - Extract from `EDGE_CONFIG` connection string
   - Part between `/` and `?`
   - Starts with `ecfg_`

3. **EDGE_CONFIG_WRITE_TOKEN:**
   - ❌ Need to add this
   - Create in Edge Config → Settings → Tokens
   - Must be "Write" or "Full Access" type
   - Different from read token in connection string

---

## 🆘 Troubleshooting

### **Can't See EDGE_CONFIG Value?**
- It might show as "Encrypted"
- Click on the variable row to expand and view
- Or check Edge Config dashboard → Connection section

### **Can't Find Write Token?**
- Make sure you're in Edge Config → Settings → Tokens
- Create a new one if none exists
- Select "Write" type when creating

### **Token Copy Failed?**
- You only see write tokens once!
- If you lost it, create a new one
- Delete old one and create fresh

---

**Follow these steps to find all 3 variables, then add the 2 missing ones!** ✅

