import React from 'react';
import {WriteNote} from '../../components';
import WriteNoteScreenHOC from './WriteNoteScreenHOC';

const WriteNoteScreen = (props) => <WriteNote {...props} />;

export default WriteNoteScreenHOC(WriteNoteScreen);
