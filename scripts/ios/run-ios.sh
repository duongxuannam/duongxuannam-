# cp ios/GoogleService-Info.development.plist ios/GoogleService-Info.plist
# cp -a src/assets/fonts/ android/app/src/main/assets/fonts
ENVFILE=.env.development
react-native run-ios --scheme="Test" --simulator="iPhone 8"
