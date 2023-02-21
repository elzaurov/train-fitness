import {Colors} from '../constants';

export const LOAD_NOTES_FEELINGS = 'LOAD_NOTES_FEELINGS';

export const loadNotesFeelings = () => async (dispatch) => {
  const notesFeelings = [
    {feeling: 'happy', icon: 'emoticon-happy-outline', color: Colors.green},
    {
      feeling: 'neutral',
      icon: 'emoticon-neutral-outline',
      color: Colors.seaBuckthorn,
    },
    {
      feeling: 'sad',
      icon: 'emoticon-sad-outline',
      color: Colors.alizarinCrimson,
    },
  ];

  dispatch({
    type: LOAD_NOTES_FEELINGS,
    payload: notesFeelings,
  });

  return notesFeelings;
};
