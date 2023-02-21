import {functions} from '../config';
import {handleError} from './error';

export const SET_VIMEO_DOWNLOAD_LINK = 'SET_VIMEO_DOWNLOAD_LINK';

export const getVimeoDownloads = (videoId: string) => async dispatch => {
    try {
        const getDownloadData = functions.httpsCallable('getVimeoDownloadUrl');
        const {data} = await getDownloadData(videoId);

        // result is an array of all the video quality available and their download data
    } catch (error: any) {
        dispatch(handleError(error));
    }
};

export const getVimeoDownloadByQuality =
    (videoId: string) => async dispatch => {
        try {
            const getDownloadData = functions.httpsCallable(
                'getVimeoDownloadUrlByQuality',
            );
            // can provide parameter quality to request to customize, defaults to hd
            const request = {videoId};
            const {data} = await getDownloadData(request);

            dispatch({
                type: SET_VIMEO_DOWNLOAD_LINK,
                payload: {[videoId]: data},
            });
        } catch (error: any) {
            dispatch(handleError(error));
        }
    };
