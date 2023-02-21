import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import {ActivityVideo} from '../../player';
import {Colors} from '../../../constants';

const Exercise = ({exercise, t}) => (
  <View style={styles.container}>
    <ActivityVideo activity={exercise} />
  </View>
);

Exercise.propTypes = {
  exercise: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('exerciseComponent')(Exercise);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
