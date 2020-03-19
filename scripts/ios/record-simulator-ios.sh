printf "Enter file name without extension -> "
read NAME
rm -f "$NAME.mov"
echo "Recoding ...   press Ctrl + C to Stop"
echo "File: $NAME.mov  will be save after stop record."
xcrun simctl io booted recordVideo "$NAME.mov"
