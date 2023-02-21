import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegularText} from '../layout';
import {Section} from '../common';
import {Layout, Colors} from '../../constants';

const IntendedResults = ({intendedResults, title}) => {
  if (!intendedResults || !intendedResults.length) {
    return null;
  }

  return (
    <Section title={title}>
      {intendedResults.map((result) => (
        <View key={result} style={styles.item}>
          <MaterialCommunityIcons
            name="check-circle"
            color={Colors.green}
            size={24}
          />
          <RegularText style={styles.itemText}>{result}</RegularText>
        </View>
      ))}
    </Section>
  );
};

IntendedResults.propTypes = {
  intendedResults: PropTypes.array,
  title: PropTypes.string,
};

IntendedResults.defaultProps = {
  title: 'You will improve',
  intendedResults: null,
};

export default IntendedResults;

const styles = {
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: Layout.padding,
    marginTop: 3,
  },
  itemText: {
    marginLeft: 16,
    fontSize: 16,
    color: Colors.text,
  },
};
