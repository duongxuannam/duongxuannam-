cd ios
pod cache clean --all
pod repo update
rm -rf Pods
rm -rf Podfile.lock
pod install