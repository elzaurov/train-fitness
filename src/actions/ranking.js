import {database} from '../config';
import {handleError} from './error';

export const LOAD_RANKING = 'LOAD_RANKING';

export const loadRanking = () => async dispatch => {
    try {
        const url = '/authentication/allMembers/ranking';

        const snap = await database.ref(url).limitToFirst(50).once('value');

        const ranking = Object.entries(snap.val() || []).map(
            ([key, value]) => ({
                key,
                ...value,
            }),
        );

        const newRanking = ranking.map((r, index) => ({
            ...r,
            position: index + 1,
            positionDiff: (r.lastPosition || index + 1) - (index + 1),
        }));

        dispatch({
            type: LOAD_RANKING,
            payload: newRanking,
        });

        return newRanking;
    } catch (error) {
        dispatch(handleError(error));
    }
};
