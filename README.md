# b2rist-native

## Description

This react-native project for mobile platforms.

## Installation

### 1. Install mobile emulator
- Download and install [android studio](https://developer.android.com/) 
- Add and run android device

### 2. Install npm dependencies
- Run
  ``npm ci``
- 
### 3. Build gradle project
- Create new file project.properties in the android folder and put [key params](https://developer.android.com/studio/publish/app-signing).
- Put GEO_API_KEY into the project.properties to link GOOGLE_MAPS [GEO_API_KEY](https://developers.google.com/maps/documentation/geolocation/get-api-key).
- Add google-services.json to the android/app folder [Manual Step3](https://firebase.google.com/docs/android/setup)
- For Intellij Idea: Open android folder and run "Link to Gradle" in the popup menu and run "reload gradle project"

## Running
- To start locally run ``npm run-script android`` or ``android`` script from package.json

### Build apk
- Run ``react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/``
- Run ``gradlew assembleRelease`` or ``gradlew assembleDebug``
Note: remove android/app/src/main/res/drawable-mdpi directory on ERROR:[drawable-mdpi-v4/node_modules_reactnativepaper_lib_module_assets_backchevron] 

## Links
Emulator:
[android studio](https://developer.android.com/)

Core:
[react-native](https://reactnative.dev/)

UI:
[react-native-paper](https://reactnativepaper.com/)
[icons](https://oblador.github.io/react-native-vector-icons/) - note MaterialCommunityIcons available
