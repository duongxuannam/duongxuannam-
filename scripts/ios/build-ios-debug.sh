cp ios/GoogleService-Info.development.plist ios/GoogleService-Info.plist
# cp ios/GoogleService-Info.production.plist ios/GoogleService-Info.plist
ENVFILE=.env.development
react-native bundle --platform ios --dev false --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ios
react-native run-ios --scheme \"Release\"
