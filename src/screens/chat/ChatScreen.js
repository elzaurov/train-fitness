import React from 'react';
import {ScreenScrollView} from '../../components';
import ChatScreenHOC from './ChatScreenHOC';

const ChatScreen = () => <ScreenScrollView />;

export default ChatScreenHOC(ChatScreen);
