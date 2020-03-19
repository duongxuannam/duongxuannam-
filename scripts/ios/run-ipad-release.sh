cp ios/GoogleService-Info.production.plist ios/GoogleService-Info.plist
ENVFILE=.env.production react-native run-ios --simulator="iPad (5th generation)" --scheme="Release"