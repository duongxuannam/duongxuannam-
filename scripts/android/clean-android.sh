cd android

rm -rf app/src/main/assets/index.android.bundle
rm -rf app/src/main/res/drawable-mdpi
rm -rf app/src/main/res/drawable-hdpi
rm -rf app/src/main/res/drawable-xhdpi
rm -rf app/src/main/res/drawable-xxhdpi
rm -rf app/src/main/res/drawable-xxxhdpi

./gradlew clean

rm -rf build
rm -rf app/build

