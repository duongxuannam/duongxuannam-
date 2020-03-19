cp ios/GoogleService-Info.production.plist ios/GoogleService-Info.plist
ENVFILE=.env.production
react-native run-ios --scheme="Release" --simulator="iPhone 6"
