cp android/app/google-services.development.json android/app/google-services.json
cp -a src/assets/fonts/ android/app/src/main/assets/fonts
ENVFILE=.env.development
react-native run-android
