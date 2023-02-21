import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';

const Resume = ({exercise}) => (
  <View style={styles.container}>
    <View style={styles.topContainer} />
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <RegularText style={[styles.resumeText, styles.repText]}>
          SET
        </RegularText>
      </View>
      <View style={styles.textContainer}>
        <RegularText style={[styles.resumeText, styles.timeText]}>
          TIME
        </RegularText>
      </View>
    </View>
    {exercise.setsTime.map((t, i) => (
      <View key={i} style={styles.row}>
        <View style={styles.textContainer}>
          <RegularText style={[styles.resumeText, styles.repText]}>
            {i + 1}
          </RegularText>
        </View>
        <View style={styles.textContainer}>
          <RegularText style={[styles.resumeText, styles.timeText]}>
            {t.toFixed(1)}s
          </RegularText>
        </View>
      </View>
    ))}
  </View>
);

export default Resume;

Resume.propTypes = {
  exercise: PropTypes.objectOf(PropTypes.any).isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 1.5 * Layout.padding,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  topContainer: {
    height: Layout.window.height * 0.17,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    width: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resumeText: {
    fontSize: 35,
    textAlign: 'center',
  },
  repText: {
    color: Colors.secondary2,
  },
  timeText: {
    color: Colors.white,
  },
});
