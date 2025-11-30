# The 3 Required Environment Variables

## 📋 Complete List

You need these **3 environment variables** in your Vercel project:

---

### **1. EDGE_CONFIG** ✅ (You already have this!)

**What it is:**
- Full connection string to your Edge Config
- Contains both the ID and read token

**Format:**
```
https://edge-config.vercel.com/ecfg_xxxxx?token=vercel_token_yyyyy
```

**Where to get it:**
- Vercel Dashboard → Storage → Your Edge Config
- Copy the connection string
- Or it's already in your `EDGE_CONFIG` variable

**Status:** ✅ You already have this set!

---

### **2. EDGE_CONFIG_ID** ❌ (You need to add this!)

**What it is:**
- Just the Edge Config ID (extracted from connection string)
- Used to identify which Edge Config to use

**Format:**
```
ecfg_xxxxxxxxxxxxx
```

**Where to get it:**
- Extract from your `EDGE_CONFIG` connection string
- It's the part between `/` and `?`
- Example: If connection string is `https://edge-config.vercel.com/ecfg_abc123?token=xyz`
  - The ID is: `ecfg_abc123`

**How to add:**
1. Go to: Settings → Environment Variables
2. Click "Add New"
3. **Key:** `EDGE_CONFIG_ID`
4. **Value:** Your Edge Config ID (e.g., `ecfg_abc123`)
5. Check: Production, Preview, Development
6. Save

---

### **3. EDGE_CONFIG_WRITE_TOKEN** ❌ (You need to add this!)

**What it is:**
- Write token that allows your code to write data to Edge Config
- Different from the read token in connection string

**Format:**
```
vercel_token_write_xxxxxxxxxxxxx
```
or
```
vercel_token_xxxxxxxxxxxxx
```

**Where to get it:**
1. Go to: Vercel Dashboard → Storage → Your Edge Config
2. Click: Settings → Tokens
3. Look for token with type: **"Write"** or **"Full Access"**
4. If none exists: Click "Create Token" → Select "Write" → Copy token
5. Copy the token value (you'll only see it once!)

**How to add:**
1. Go to: Settings → Environment Variables
2. Click "Add New"
3. **Key:** `EDGE_CONFIG_WRITE_TOKEN`
4. **Value:** Your write token
5. Check: Production, Preview, Development
6. Save

---

## 📊 Summary Table

| Variable Name | What It Contains | Status | Where to Get It |
|--------------|------------------|--------|-----------------|
| `EDGE_CONFIG` | Full connection string | ✅ You have it | Already in your env vars |
| `EDGE_CONFIG_ID` | Just the ID part | ❌ Need to add | Extract from `EDGE_CONFIG` connection string |
| `EDGE_CONFIG_WRITE_TOKEN` | Write token | ❌ Need to add | Create in Edge Config → Settings → Tokens |

---

## 🔍 How to Extract EDGE_CONFIG_ID

Your `EDGE_CONFIG` variable has a connection string like:
```
https://edge-config.vercel.com/ecfg_abc123xyz?token=vercel_token_yyy789
```

The **ID** is the part between `/` and `?`:
```
ecfg_abc123xyz
```

**Visual breakdown:**
```
https://edge-config.vercel.com/[THIS IS THE ID]?token=...
                            └──────────────┘
                            Extract this part!
```

---

## ✅ Quick Checklist

- [ ] ✅ `EDGE_CONFIG` - Already have it
- [ ] ❌ `EDGE_CONFIG_ID` - Need to add (extract from `EDGE_CONFIG`)
- [ ] ❌ `EDGE_CONFIG_WRITE_TOKEN` - Need to add (create in Edge Config settings)

---

## 🚀 After Adding All 3

1. **Redeploy** your project
2. **Test** the postback endpoint
3. **Verify** it returns `OK`

---

**You need to add 2 more variables: `EDGE_CONFIG_ID` and `EDGE_CONFIG_WRITE_TOKEN`!**

