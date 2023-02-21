import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegularText} from '../layout';
import {Colors, Layout} from '../../constants';

const Completed = ({t}) => (
  <TouchableOpacity style={styles.completed} disabled>
    <RegularText style={styles.text}>{t('completed')}</RegularText>
  </TouchableOpacity>
);

Completed.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('completedComponent')(Completed);

const styles = StyleSheet.create({
  completed: {
    backgroundColor: Colors.secondary,
    padding: Layout.padding,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
