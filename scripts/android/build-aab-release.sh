cp android/app/google-services.production.json android/app/google-services.json
cd android
ENVFILE=../.env.production
./gradlew bundleRelease --warning-mode all
