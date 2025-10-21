# Clerk "Forgot Password" Bug - Minimal Reproduction

This repository contains a minimal reproduction of a bug in Clerk's authentication flow where the **"Forgot password" link does not appear** when browser autofill is used.

## 🐛 Bug Description

**Issue:** Missing "Forgot Password" button when using browser autofill

**Expected Behavior:**  
When authentication fails, the "Forgot password" link should always appear, regardless of how the form fields were filled.

**Actual Behavior:**  
The "Forgot password" link only appears when credentials are manually typed. When browser autofills both email and password fields simultaneously, the link is missing after authentication failure.

## 📹 Video Demonstration

**Side-by-side comparison:**  
[https://jam.dev/c/24922cbf-59d2-4dc5-b471-24278bec7719](https://jam.dev/c/24922cbf-59d2-4dc5-b471-24278bec7719)

- **Scenario 1 (Manual typing):** ✅ "Forgot password" link appears
- **Scenario 2 (Browser autofill):** ❌ "Forgot password" link missing

## 🚀 Quick Start (2 Steps)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Your Clerk Key

Edit `.env.local` and add your Clerk publishable key:

```env
CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_FRONTEND_API=https://your-clerk-domain.clerk.accounts.dev
```

### 3. Run the Demo

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🔍 How to Reproduce the Bug

1. Navigate to `/login.html`
2. **Important:** Let your browser **autofill both email AND password** (don't type manually)
3. Click "Continue"
4. Enter an incorrect password
5. **Observe:** The "Forgot password" link is missing

### Comparison: Manual Entry (Works Correctly)

1. Navigate to `/login.html`
2. **Manually type** the email address
3. **Manually type** the password
4. Click "Continue"
5. Enter an incorrect password
6. **Observe:** The "Forgot password" link appears correctly

## 📋 Technical Details

- **Framework:** Vanilla JavaScript with Vite
- **Clerk SDK:** `@clerk/clerk-js` v5.99.0
- **Browser Tested:** Chrome, Safari, Firefox (all show the same issue)
- **Root Cause:** Component doesn't redirect to `/factor-one` page when autofill is used

## 💡 Proposed Solution

Whenever the password field is visible (regardless of how it was filled - manual typing or autofill), the "Forgot password" link should be displayed.

## 📁 Project Structure

```
demo-clerk-forgot-pass-bug/
├── login.html              # Login page with Clerk sign-in component
├── register.html           # Registration page  
├── callback.html           # Authentication callback handler
├── dashboard.html          # Protected dashboard (post-login)
├── clerk-auth-base.js      # Base class for Clerk authentication
├── clerk-sign-in.js        # Sign-in component handler
├── clerk-sign-up.js        # Sign-up component handler
├── clerk-callback.js       # Callback validation logic
├── .env.local              # Clerk configuration (YOUR KEY HERE)
└── package.json            # Dependencies
```

## 🛠️ For Clerk Engineering Team

### What This Demo Provides

- ✅ Minimal, isolated reproduction
- ✅ Clean codebase using official `@clerk/clerk-js` SDK
- ✅ Console logging for debugging
- ✅ Easy to run (2 commands)
- ✅ No external dependencies beyond Clerk

### Key Files to Review

**`login.html`** - Contains the Clerk SignIn component where the bug occurs

**`clerk-sign-in.js`** - Handles mounting the SignIn component with standard configuration

### Testing Notes

- The bug is **browser-specific behavior** related to autofill events
- Test in Chrome, Safari, or Firefox with saved credentials
- The issue does NOT occur when typing manually
- The issue ONLY occurs when browser autofills both fields simultaneously

## 📞 Need Help?

If you need any clarification or would like to schedule a technical meeting to debug this together, please let me know. I'm happy to screen share and demonstrate the exact behavior in real-time.

## 📄 License

MIT - This is a bug reproduction demo for Clerk support.
