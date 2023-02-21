import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { initialize, registerListenerSubscriptions } from '../analytics';
import { listenUserAuth, loadMilestonesFromStorage, loadUserData, updateUserSignInData } from '../actions';

export const useUser = () => {
    const dispatch = useDispatch();
    const [initAnalytic, setInitAnalytic] = useState(false);
    const [initMilestones, setInitMilestones] = useState(false);
    const user = useSelector((state) => state.user?.user);

    useEffect(() => {
        let analyticsUnsub;
        dispatch(listenUserAuth());
        initialize().then(() => {
            setInitAnalytic(true);
            registerListenerSubscriptions().then(unsub => {
                analyticsUnsub = unsub;
            });
        });
        return () => {
            if (typeof analyticsUnsub === 'function') {
                analyticsUnsub();
            }
        };
    }, []);

    useEffect(() => {
        if (user) {
            dispatch(loadMilestonesFromStorage())
                .finally(() => {
                    setInitMilestones(true);
                });
            dispatch(loadUserData())
                .then(() => {
                    dispatch(updateUserSignInData());
                });
        }
    }, [user]);

    return [
        initAnalytic && (user ? initMilestones : true),
        user,
    ];
};