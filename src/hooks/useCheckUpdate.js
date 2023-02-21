import {useTranslation} from 'react-i18next';
import {Alert, Linking, Platform} from 'react-native';
import {checkVersion} from 'react-native-check-version';
import { useCallback, useEffect } from 'react';

export const useCheckUpdate = async () => {
    const {t} = useTranslation('updateModal');
    const handleClick = useCallback((version) => async () => {
        try {
            const url = Platform.select({
                ios: `itms-apps${version.url.replace('https', '')}`,
                android: `market://details?id=${version.bundleId}`,
            });
            const canOpenUrl = await Linking.canOpenURL(url);
            if (canOpenUrl) {
                Linking.openURL(url);
            } else if (version.url) {
                Linking.openURL(version.url);
            }
        } catch (error) {
            throw error;
        }

    }, []);
    const check = useCallback(async () => {
        try {
            const result = await checkVersion();
            if (result?.needsUpdate === true) {
                Alert.alert(
                    t('newVersionAvailable'),
                    t('trainEffectiveNewVersionAvailable'),
                    [
                        {
                            text: t('notNow'),
                        },
                        {
                            text: t('update'),
                            onPress: handleClick(result),
                        },
                    ],
                );
            }
        } catch(error) {
            throw error;
        }
    }, []);
    useEffect(() => {
        check();
    }, []);
};
