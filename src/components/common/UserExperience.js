import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {RegularText} from '../layout';
import {Colors} from '../../constants';
import {levelExperience} from '../../utils';

const UserExperience = ({experience}) => {
  const upperBoundIdx = levelExperience.findIndex((exp) => experience <= exp);

  const lowerBound = levelExperience[upperBoundIdx - 1] || 0;
  const upperBound = levelExperience[upperBoundIdx] || experience;

  const percent = Math.round(
    ((experience - lowerBound) * 100) / (upperBound - lowerBound),
  );

  return (
    <View>
      <View style={styles.bar}>
        <View
          style={[
            styles.exp,
            {
              width: `${percent}%`,
            },
          ]}
        />
      </View>
      <RegularText style={styles.text}>
        {experience} / {upperBound}
      </RegularText>
    </View>
  );
};

UserExperience.propTypes = {
  experience: PropTypes.number,
};

UserExperience.defaultProps = {
  experience: 0,
};

export default UserExperience;

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 5,
    height: 5,
    width: 60,
  },
  exp: {
    backgroundColor: Colors.white,
    position: 'absolute',
    height: '100%',
    left: 0,
    top: 0,
  },
  text: {
    fontSize: 7,
    textAlign: 'right',
  },
});
