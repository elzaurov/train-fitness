import {useNetInfo} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
import {addEvent} from '../../actions';
import {
  EVENT_TYPE_SUCCESS,
  EVENT_TYPE_ERROR,
} from '../../constants';
import {useDispatch} from 'react-redux';

const NetworkStatus = () => {
  const dispatch = useDispatch();
  const {isConnected} = useNetInfo();
  const [firstChange, setFirstChange] = useState(false);
  const [previous, setPrevious] = useState(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    setPrevious(current);
    setCurrent(isConnected);
  }, [current, isConnected]);

  useEffect(() => {
    if (current !== previous && previous !== null) {
      if (firstChange) {
        dispatch(
          addEvent({
            text: `You're ${current ? 'online' : 'offline'}!`,
            type: current ? EVENT_TYPE_SUCCESS : EVENT_TYPE_ERROR,
          }),
        );
      } else {
        setFirstChange(true);
      }
    }
  }, [dispatch, firstChange, current, previous]);

  return null;
};

export default NetworkStatus;
