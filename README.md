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
- Create new file keystore.properties in the android folder and put [key params](https://developer.android.com/studio/publish/app-signing).
- Add google-services.json to the android/app folder [Manual Step3](https://firebase.google.com/docs/android/setup)
- Open android folder and run "Link to Gradle" in the popup menu
- Run "reload gradle project"

> Note: To force application to use High-Accuracy Geo position go to [PlayServicesLocationManager](node_modules/@react-native-community/geolocation/android/src/main/java/com/reactnativecommunity/geolocation/PlayServicesLocationManager.java) and change code below.
> !!!Need to find out the way how to set PRIORITY_HIGH_ACCURACY from the configuration. enableHighAccuracy option not working!!!
>>locationRequest.setPriority(locationOptions.highAccuracy ? LocationRequest.PRIORITY_HIGH_ACCURACY : LocationRequest.PRIORITY_LOW_POWER);
>> => 
>>locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);

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
