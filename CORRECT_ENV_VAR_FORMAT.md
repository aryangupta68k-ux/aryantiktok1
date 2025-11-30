# Fix: "Invalid Characters" Error - Correct Format

## ❌ The Error

```
The name contains invalid characters. Only letters, digits, and underscores are allowed.
```

This happens when you put the **wrong value** in the **Key** field!

---

## ✅ Correct Format

### **Variable 1: EDGE_CONFIG_ID**

- **Key (Name)**: Must be exactly this: `EDGE_CONFIG_ID`
  - ✅ Letters, digits, and underscores only
  - ✅ No special characters
  - ✅ No spaces
  
- **Value**: Your actual Edge Config ID
  - Example: `ecfg_abc123xyz`
  - This goes in the **Value** field, NOT the Key field!

### **Variable 2: EDGE_CONFIG_WRITE_TOKEN**

- **Key (Name)**: Must be exactly this: `EDGE_CONFIG_WRITE_TOKEN`
  - ✅ Letters, digits, and underscores only
  - ✅ No special characters
  - ✅ No spaces
  
- **Value**: Your actual Write Token
  - Example: `vercel_token_write_xyz789`
  - This goes in the **Value** field, NOT the Key field!

---

## 📝 Step-by-Step with Exact Values

### **Step 1: Add EDGE_CONFIG_ID**

1. **Click "Add New"**
2. **In the Key/Name field:** Type exactly this (don't copy-paste your ID here!):
   ```
   EDGE_CONFIG_ID
   ```
3. **In the Value field:** Paste your Edge Config ID (this is where your value goes):
   ```
   ecfg_xxxxxxxxxxxxx
   ```
4. **Check environments:** ✅ Production, ✅ Preview, ✅ Development
5. **Click "Save"**

### **Step 2: Add EDGE_CONFIG_WRITE_TOKEN**

1. **Click "Add New"** again
2. **In the Key/Name field:** Type exactly this:
   ```
   EDGE_CONFIG_WRITE_TOKEN
   ```
3. **In the Value field:** Paste your Write Token (this is where your value goes):
   ```
   vercel_token_write_xxxxxxxxxxxxx
   ```
4. **Check environments:** ✅ Production, ✅ Preview, ✅ Development
5. **Click "Save"**

---

## 🎯 Visual Guide

When adding the variable, you'll see fields like this:

```
┌─────────────────────────────────────┐
│ Key (Name):                         │
│ [EDGE_CONFIG_ID              ]      │ ← Type exactly this (no values!)
├─────────────────────────────────────┤
│ Value:                              │
│ [ecfg_abc123xyz             ]       │ ← Paste your actual ID here
├─────────────────────────────────────┤
│ Environments:                       │
│ ☑ Production                        │
│ ☑ Preview                           │
│ ☑ Development                       │
└─────────────────────────────────────┘
```

---

## ⚠️ Common Mistakes

### **Mistake 1: Putting value in Key field**
- ❌ Key: `ecfg_abc123xyz` (this is wrong!)
- ✅ Key: `EDGE_CONFIG_ID` (this is correct)
- ✅ Value: `ecfg_abc123xyz` (value goes here)

### **Mistake 2: Special characters in Key**
- ❌ Key: `EDGE-CONFIG-ID` (has hyphen - invalid!)
- ❌ Key: `EDGE_CONFIG_ID.` (has dot - invalid!)
- ✅ Key: `EDGE_CONFIG_ID` (only letters, digits, underscores)

### **Mistake 3: Spaces in Key**
- ❌ Key: `EDGE CONFIG ID` (has spaces - invalid!)
- ✅ Key: `EDGE_CONFIG_ID` (no spaces)

---

## ✅ Correct Examples

### **Variable 1:**
```
Key:   EDGE_CONFIG_ID
Value: ecfg_2a3b4c5d6e7f
```

### **Variable 2:**
```
Key:   EDGE_CONFIG_WRITE_TOKEN
Value: vercel_token_write_xyz789abc123
```

---

## 🔍 How to Verify

After adding, you should see:

1. **Environment Variables List Shows:**
   - `EDGE_CONFIG` ✅
   - `EDGE_CONFIG_ID` ✅ (newly added)
   - `EDGE_CONFIG_WRITE_TOKEN` ✅ (newly added)

2. **Each variable has:**
   - Correct key name (exactly as shown above)
   - Value shown as "Encrypted" (this is normal)
   - Environments checked ✅

---

## 🚀 After Adding Correctly

1. **Redeploy:**
   - Go to: Deployments → Redeploy

2. **Test:**
   ```
   https://addtok.com/api/postback?offer_id=123&offer_name=Test&payout=1.50&session_ip=127.0.0.1
   ```
   Should return: `OK` ✅

---

## 📋 Quick Reference

**What goes in Key field:**
- `EDGE_CONFIG_ID` (exactly this text)
- `EDGE_CONFIG_WRITE_TOKEN` (exactly this text)

**What goes in Value field:**
- Your actual Edge Config ID (starts with `ecfg_`)
- Your actual Write Token (starts with `vercel_token_`)

**Key = The name (fixed text)**
**Value = Your actual data (pasted)**

---

**Remember: Key is the variable NAME, Value is YOUR DATA!** ✅

