import React from 'react';
import AuthLoadingScreenHOC from './AuthLoadingScreenHOC';
import {LoadingFullScreen} from '../../components/loading';

const AuthLoadingScreen = () => <LoadingFullScreen />;

export default AuthLoadingScreenHOC(AuthLoadingScreen);
