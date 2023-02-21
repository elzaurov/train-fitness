import React from 'react';
import PropTypes from 'prop-types';
import {Notes} from '../../components';
import {CheckPlanWrapper} from '../../layout';
import NotesScreenHOC from './NotesScreenHOC';

const NotesScreen = (props) => (
  <CheckPlanWrapper navigation={props.navigation}>
    <Notes {...props} />
  </CheckPlanWrapper>
);

NotesScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NotesScreenHOC(NotesScreen);
