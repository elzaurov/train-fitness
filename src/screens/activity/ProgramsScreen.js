import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import ProgramsScreenHOC from './ProgramsScreenHOC';
import {ScreenView} from '../../components';

// temporary imports
import PracticesCarousel from '../../components/activity/PracticesCarousel';
import PracticesLoading from '../../components/activity/PracticesLoading';
import {Layout} from '../../constants';

const ProgramsScreen = ({loading, programs, onProgramSelect}) => {
  let content;

  if (loading === true) {
    content = <PracticesLoading />;
  } else {
    content = (
      <PracticesCarousel
        practices={programs}
        onPracticeSelect={onProgramSelect}
      />
    );
  }

  return <ScreenView style={styles.container}>{content}</ScreenView>;
};

ProgramsScreen.propTypes = {
  programs: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  onProgramSelect: PropTypes.func.isRequired,
};

ProgramsScreen.defaultProps = {
  programs: null,
};

export default ProgramsScreenHOC(ProgramsScreen);

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: Layout.padding * 2,
    paddingBottom: Layout.padding * 2,
  },
});
