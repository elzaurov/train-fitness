import {auth, database} from '../config';
import {NOTES_CATEGORIES_MAPPING} from '../constants';
import {handleError} from './error';

export const LOAD_NOTES_CATEGORIES = 'LOAD_NOTES_CATEGORIES';
export const INSERT_NOTES_CATEGORY = 'INSERT_NOTES_CATEGORY';
export const UPDATE_NOTES_CATEGORY = 'UPDATE_NOTES_CATEGORY';
export const DELETE_NOTES_CATEGORY = 'DELETE_NOTES_CATEGORY';

export const loadNotesCategories = () => async (dispatch, getState) => {
  try {
    const cachedCategories = getState().notesCategories;

    if (cachedCategories && cachedCategories.length > 0) {
      return cachedCategories;
    }

    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/categories/notes/${uid}`;

    const snap = await database.ref(url).once('value');
    const notesCategories = Object.entries(
      snap.val() || [],
    ).map(([key, value]) => ({key, ...value}));

    const categories = await insertDefaultNotesCategories({
      notesCategories,
      dispatch,
    });

    for (let i = 0, len = categories.length; i < len; i += 1) {
      if (NOTES_CATEGORIES_MAPPING[categories[i].name]) {
        categories[i].name = NOTES_CATEGORIES_MAPPING[categories[i].name];
      }
    }

    const sortedCategories = categories
      .sort((c1, c2) => (c1.name > c2.name ? 1 : -1))
      .map(({key, name}) => ({key, label: name}));

    dispatch({
      type: LOAD_NOTES_CATEGORIES,
      payload: sortedCategories,
    });

    return sortedCategories;
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const insertNotesCategory = (notesCategory) => async (dispatch) => {
  try {
    const {uid} = auth.currentUser;
    const url = `/authentication/userOwned/categories/notes/${uid}`;

    const {key} = await database.ref(url).push(notesCategory);

    dispatch({
      type: INSERT_NOTES_CATEGORY,
      payload: {...notesCategory, key},
    });

    return {...notesCategory, key};
  } catch (error) {
    dispatch(handleError(error));
  }
};

async function insertDefaultNotesCategories({notesCategories, dispatch}) {
  const defaultNotesCategories = [
    'classroom',
    'cross-training',
    'exercises',
    'game-brain',
    'others',
    'programs',
    'team',
    'workouts',
    'courses',
  ];
  const promises = [];
  const names = notesCategories.map(({name}) => name);

  for (let i = 0; i < defaultNotesCategories.length; i += 1) {
    const name = defaultNotesCategories[i];
    if (!names.includes(name)) {
      const notesCategory = {name};
      promises.push(insertNotesCategory(notesCategory)(dispatch));
    }
  }

  if (promises.length === 0) {
    return notesCategories;
  }

  const categories = await Promise.all(promises);
  return [...notesCategories, ...categories];
}
