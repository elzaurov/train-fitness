import React from 'react';
import PropTypes from 'prop-types';
import {Replies} from '../../components';
import RepliesScreenHOC from './RepliesScreenHOC';

const RepliesScreen = (props) => <Replies {...props} />;

RepliesScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RepliesScreenHOC(RepliesScreen);
