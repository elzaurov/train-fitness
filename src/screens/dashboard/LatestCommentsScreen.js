import React from 'react';
import {LatestComments} from '../../components';
import LatestCommentsScreenHOC from './LatestCommentsScreenHOC';

const LatestCommentsScreen = (props) => <LatestComments {...props} />;

export default LatestCommentsScreenHOC(LatestCommentsScreen);
