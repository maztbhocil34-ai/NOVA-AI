# NOVA AI V1

Prototype Android AI chat app built with Expo React Native.

## Run
1. Install Node.js and Expo tooling on a computer, or use Expo-compatible development tools.
2. `npm install`
3. `npx expo start`

## Build APK
For a cloud Android build:
`npm install -g eas-cli`
`eas login`
`eas build:configure`
`eas build -p android --profile preview`

This V1 uses a placeholder local AI response. Connect an AI backend/API before production. Never put a private API key directly in the mobile app.
