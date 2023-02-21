export const SET_PAYWALL_MODAL_VISIBILITY = 'SET_PAYWALL_MODAL_VISIBILITY';

export const showPaywallModal = () => (dispatch) => {
  dispatch({
    type: SET_PAYWALL_MODAL_VISIBILITY,
    payload: true,
  });
};

export const hidePaywallModal = () => (dispatch) => {
  dispatch({
    type: SET_PAYWALL_MODAL_VISIBILITY,
    payload: false,
  });
};
