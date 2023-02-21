import { useEffect } from 'react';
import { inAppMessaging } from '../config';

export const useInAppMessaging = () => {
    useEffect(() => {
        inAppMessaging.setMessagesDisplaySuppressed(true);
    }, []);
};
