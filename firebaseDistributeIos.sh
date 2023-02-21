#!/bin/bash


FILE=ios/firebase-credentials.json
APP_STORE_KEY_FILE=ios/AuthKey_4V7QYU8ZHV.p8

echo $VAR
if [ ! -f "$FILE" ]; then
    echo "$FILE does not exist."
    echo "Download the file from our account in 1password.com. \nhttps://start.1password.com/open/i?a=DPGBG5MJ6ZHHHFP4YLYUDPLICI&h=my.1password.com&i=l3gdvzyqo53haa53qz3dweoj5i&v=uwn2oac5t3dscf2q4jzvuxjswe\n\n"
    noFirebaseFile=true
fi

if [ ! -f "$APP_STORE_KEY_FILE" ]; then
    echo "$APP_STORE_KEY_FILE does not exist."
    echo "Download the file from our account in 1password.com. \nhttps://start.1password.com/open/i?a=DPGBG5MJ6ZHHHFP4YLYUDPLICI&h=my.1password.com&i=khx6m3rxlyzpmwxnjjcabmjnoy&v=kfjd4sqdayymgnftwlr63eu44a\n\n"
    noAppStoreFile=true
fi

if [ ! -z "$noAppStoreFile" ] || [ ! -z "$noFirebaseFile" ] ; then
    echo "Could not proceed with build and distribution. Please provide the necessary files. \n"
    exit 1
fi

echo "Release Notes:"
read releaseNotes

echo "\n\n"

echo "When prompted for fastlane match passphrase, get it from our 1password account.\nhttps://start.1password.com/open/i?a=DPGBG5MJ6ZHHHFP4YLYUDPLICI&h=my.1password.com&i=22lsgeegufbu7ip5fwus6fxjdi&v=uwn2oac5t3dscf2q4jzvuxjswe\n"
echo "Press enter to continue. "
read continueKey

#yarn clean 
cd ios
brew install fastlane | true
FIREBASE_RELEASE_NOTES=$releaseNotes fastlane distribute_dev