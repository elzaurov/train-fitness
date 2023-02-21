import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {RegularText} from '../layout';
import {Colors} from '../../constants';

const DateSelector = ({
  onNextPress,
  onPrevPress,
  titleTemplate,
  subtitleTemplate,
  selectedDate,
}) => {
  let title = '';
  let subtitle = '';

  if (titleTemplate) {
    title = (
      <RegularText style={styles.title}>
        {titleTemplate(selectedDate)}
      </RegularText>
    );
  }

  if (subtitleTemplate) {
    subtitle = (
      <RegularText style={styles.subtitle}>
        {subtitleTemplate(selectedDate)}
      </RegularText>
    );
  }

  return (
    <View style={styles.datePicker}>
      <TouchableOpacity onPress={onPrevPress}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={32}
          color={Colors.white}
        />
      </TouchableOpacity>
      <View>
        {title}

        {/* THIS IS THE PIECE OF CODE THAT SHOULD BE FIX */}

        {/* {subtitle} */}
      </View>
      <TouchableOpacity onPress={onNextPress}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={32}
          color={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

DateSelector.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  onNextPress: PropTypes.func.isRequired,
  onPrevPress: PropTypes.func.isRequired,
  titleTemplate: PropTypes.func,
  subtitleTemplate: PropTypes.func,
};

DateSelector.defaultProps = {
  titleTemplate: (date) => date.format('MMM Do'),
  subtitleTemplate: null,
};

export default DateSelector;

const styles = StyleSheet.create({
  datePicker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
  },
});
