import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Layout, Colors} from '../../constants';
import {BottomBarTemplate, Button} from '../layout';

const QuestionScreenTemplate = ({
  nextDisabled,
  buttonText,
  onNext,
  children,
}) => (
  <BottomBarTemplate
    bottomBar={
      <Button disabled={nextDisabled} onPress={onNext}>
        {buttonText}
      </Button>
    }>
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.children}>{children}</View>
      </View>
    </View>
  </BottomBarTemplate>
);

QuestionScreenTemplate.propTypes = {
  nextDisabled: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.any,
  onNext: PropTypes.func.isRequired,
};

QuestionScreenTemplate.defaultProps = {
  children: null,
  nextDisabled: false,
};

export default QuestionScreenTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background2,
    padding: Layout.padding,
  },
  contentContainer: {
    flex: 0.95,
    paddingLeft: Layout.padding / 2,
    paddingRight: Layout.padding / 2,
  },
  questionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.gray1,
    lineHeight: 36,
    marginTop: Layout.isSmallDevice ? 7 : 13,
  },
  descriptionText: {
    fontSize: 18,
    color: Colors.gray1,
    marginTop: 13,
  },
  children: {
    marginTop: Layout.isSmallDevice ? 15 : 40,
    flex: 1,
  },
});
