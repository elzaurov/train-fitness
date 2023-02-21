import React from 'react';
import PropTypes from 'prop-types';
import {NewSchedule} from '../../components';
import NewScheduleScreenHOC from './NewScheduleScreenHOC';

const NewScheduleScreen = (props) => <NewSchedule {...props} />;

NewScheduleScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NewScheduleScreenHOC(NewScheduleScreen);
