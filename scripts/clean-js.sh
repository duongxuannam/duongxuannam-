watchman watch-del-all
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*
rm -rf .rncache
rm -rf ~/Library/Caches/com.facebook.ReactNativeBuild
rm -rf node_modules/
npm cache verify
npm cache clean --force
yarn cache clean
