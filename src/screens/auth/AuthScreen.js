import React, {useEffect} from 'react';
import {LoadingFullScreen} from '../../components';
import {useDispatch} from 'react-redux';
import {listenUserAuth} from '../../actions';

const AuthScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = dispatch(listenUserAuth());
    return unsub;
  }, [dispatch]);

  return <LoadingFullScreen />;
};

export default AuthScreen;
