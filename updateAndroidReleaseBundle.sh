yarn android:bundle &&
cd android &&
rm -rf app/src/main/res/raw &&
cd app/src/main/res/drawable-mdpi && find . \! -name 'ic_stat_ic_notification.png' -delete && cd ..
cd drawable-hdpi && find . \! -name 'ic_stat_ic_notification.png' -delete && cd ..
cd drawable-xhdpi && find . \! -name 'ic_stat_ic_notification.png' -delete && cd ..
cd drawable-xxhdpi && find . \! -name 'ic_stat_ic_notification.png' -delete && cd ..
cd drawable-xxxhdpi && find . \! -name 'ic_stat_ic_notification.png' -delete

