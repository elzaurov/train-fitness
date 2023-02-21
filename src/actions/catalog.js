import {catalog} from '../api';
import {handleError} from './error';

export const SET_CATALOG = 'SET_CATALOG';

export const getCatalog = () => async (dispatch, getState) => {
  try {
    const {userRole} = getState();
    const matchedCatalogs = await catalog.getTemplate({userRole});
    const matchedCatalog = matchedCatalogs ? matchedCatalogs[0] : null;

    dispatch({
      type: SET_CATALOG,
      payload: matchedCatalog,
    });
  } catch (error) {
    dispatch(handleError(error));
    console.error(error);
  }
};
