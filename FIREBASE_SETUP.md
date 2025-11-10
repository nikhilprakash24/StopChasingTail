# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name your project: **StopChasingTail**
4. Disable Google Analytics (not needed for MVP)
5. Click "Create project"

## Step 2: Register Web App

1. In your Firebase project, click the Web icon `</>`
2. Register app nickname: **StopChasingTail Web**
3. Check "Also set up Firebase Hosting" (optional for now)
4. Click "Register app"
5. Copy the Firebase configuration

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase credentials in `.env.local`:
   ```
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=stopchasingtail.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=stopchasingtail
   VITE_FIREBASE_STORAGE_BUCKET=stopchasingtail.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

## Step 4: Enable Authentication Methods

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Go to "Sign-in method" tab

### Enable Email/Password
1. Click on "Email/Password"
2. Enable the first toggle (Email/Password)
3. Click "Save"

### Enable Google Sign-In
1. Click on "Google"
2. Enable the toggle
3. Enter support email (your email)
4. Click "Save"

## Step 5: Setup Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select location closest to your users
5. Click "Enable"

## Step 6: Configure Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Usage entries
    match /usageEntries/{entryId} {
      allow read, write: if request.auth != null
        && resource.data.userId == request.auth.uid;
    }
  }
}
```

### Storage Rules (if using Firebase Storage later)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 7: Test Configuration

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Check browser console for Firebase connection
3. No errors should appear

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check that all environment variables are set correctly
- Restart the dev server after changing `.env.local`

### "Firebase: Uh oh, a quotacyber-exceeded error occurred"
- You've exceeded Firebase's free tier limits
- Check the Firebase Console Quotes page

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to Firebase authorized domains
- Go to Authentication > Settings > Authorized domains
- Add `localhost` and your deployment domain

## Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Your project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket URL |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

## Firebase Emulator (Optional for Local Development)

For local development without using production Firebase:

1. Install Firebase tools:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize emulators:
   ```bash
   firebase init emulators
   ```

4. Start emulators:
   ```bash
   firebase emulators:start
   ```

5. Update Firebase config to use emulators (see `src/core/firebase/config.ts`)

---

**Note:** Never commit `.env.local` or any files containing Firebase credentials to version control!
