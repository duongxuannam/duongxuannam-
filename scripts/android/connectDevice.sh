export PATH=~/Library/Android/sdk/tools:$PATH
export PATH=~/Library/Android/sdk/platform-tools:$PATH
adb reverse tcp:8081 tcp:8081
react-native run-android
