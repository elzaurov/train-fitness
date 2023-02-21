export const SET_UPGRADE_MODAL_VISIBILITY = 'SET_UPGRADE_MODAL_VISIBILITY';

export const showUpgradeModal = () => (dispatch) => {  
  dispatch({
    type: SET_UPGRADE_MODAL_VISIBILITY,
    payload: true,
  });
};

export const hideUpgradeModal = () => (dispatch) => {
  dispatch({
    type: SET_UPGRADE_MODAL_VISIBILITY,
    payload: false,
  });
};
