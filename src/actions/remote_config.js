import {config} from '../config';
import {handleError} from './error';

export const SET_REMOTE_CONFIGS = 'SET_REMOTE_CONFIGS';

export const loadRemoteConfigs = () => async (dispatch) => {
  try {
    const cacheTime = __DEV__ ? 1 : undefined;

    await config.fetch(cacheTime);
    await config.activate();

    const configs = await config.getAll();

    const entries = Object.entries(configs).map(([key, configValue]) => {
      let value;

      try {
        value = JSON.parse(configValue.asString());
      } catch (err) {
        value = configValue.asString();
      }

      return [key, value];
    });

    const remoteConfigs = Object.fromEntries(entries);

    dispatch({
      type: SET_REMOTE_CONFIGS,
      payload: remoteConfigs,
    });
  } catch (error) {
    // do nothing yet, use the default values instead
    dispatch(handleError(error));
  }
};
