import React from 'react';
import {LatestNotes} from '../../components';
import LatestNotesScreenHOC from './LatestNotesScreenHOC';

const LatestNotesScreen = (props) => <LatestNotes {...props} />;

export default LatestNotesScreenHOC(LatestNotesScreen);
