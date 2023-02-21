export const WAITERS_ADD = 'WAITERS_ADD';
export const WAITERS_REMOVE = 'WAITERS_REMOVE';

export const startWaiter = (waiter) => (dispatch) => {
  dispatch({
    type: WAITERS_ADD,
    payload: waiter,
  });
};

export const endWaiter = (waiter) => (dispatch) => {
  dispatch({
    type: WAITERS_REMOVE,
    payload: waiter,
  });
};
