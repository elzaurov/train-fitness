import {database} from '../config';
import {handleError} from './error';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export const loadCategories = (type) => async (dispatch, getState) => {
  try {
    const url = `/authentication/allMembers/categories/${type}`;
    // const categoriesCache = getState().categories;

    // if (categoriesCache[type]) {
    //   return categoriesCache[type];
    // }

    const snap = await database.ref(url).once('value');
    const categoriesList = Object.entries(
      snap.val() || [],
    ).map(([key, value]) => ({key, ...value}));

    if (categoriesList[0].name !== 'All') {
      categoriesList.unshift({key: 'all', name: 'All'});
    }

    const categories = categoriesList.map(({key, name}) => ({
      key,
      label: name,
    }));

    dispatch({
      type: LOAD_CATEGORIES,
      payload: {
        [type]: categories,
      },
    });

    return categories;
  } catch (error) {
    dispatch(handleError(error));
  }
};
