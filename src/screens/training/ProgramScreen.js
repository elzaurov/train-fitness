import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollViewHeaderScreenTemplate,
  LoadingFullScreen,
  Program,
} from '../../components';
import ProgramScreenHOC from './ProgramScreenHOC';

const ProgramScreen = ({
  navigation,
  currentProgram,
  currentWorkout,
  loading,
  program,
  schedule,
}) => {
  if (loading) {
    return <LoadingFullScreen secondary hideImage />;
  }

  return (
    <ScrollViewHeaderScreenTemplate
      navigation={navigation}
      title={program.name}
      uri={program.thumbnail}>
      <Program
        currentProgram={currentProgram}
        currentWorkout={currentWorkout}
        program={program}
        schedule={schedule}
      />
    </ScrollViewHeaderScreenTemplate>
  );
};

ProgramScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  currentProgram: PropTypes.objectOf(PropTypes.any),
  currentWorkout: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  program: PropTypes.objectOf(PropTypes.any).isRequired,
  schedule: PropTypes.objectOf(PropTypes.any),
};

ProgramScreen.defaultProps = {
  currentProgram: undefined,
  currentWorkout: undefined,
  schedule: undefined,
};

export default ProgramScreenHOC(ProgramScreen);
