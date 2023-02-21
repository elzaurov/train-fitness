import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';

const QuestionInput = ({question, input}) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.leftContainer}>
        <RegularText style={styles.questionText}>{question}</RegularText>
      </View>
      <View style={styles.rightContainer}>{input}</View>
    </View>
  );
};

QuestionInput.propTypes = {
  question: PropTypes.string.isRequired,
  input: PropTypes.any.isRequired,
};

export default QuestionInput;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Layout.margin / 2,
    marginBottom: Layout.margin / 2,
    marginLeft: Layout.margin,
    marginRight: Layout.margin,
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 17,
    color: Colors.gray1,
  },
});
