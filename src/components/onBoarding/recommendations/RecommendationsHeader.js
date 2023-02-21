import React from 'react';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import {RegularText} from '../../layout';
import {Layout} from '../../../constants';

const RecommendationsHeader = ({style}) => (
  <View style={[styles.container, style]}>
    <RegularText style={styles.text}>
      We picked these 3 training programs
    </RegularText>
    <RegularText style={styles.text}>just for you</RegularText>
  </View>
);

RecommendationsHeader.propTypes = {
  style: ViewPropTypes.style,
};

RecommendationsHeader.defaultProps = {
  style: null,
};

export default RecommendationsHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: Layout.padding / 2,
    paddingRight: Layout.padding * 2,
    paddingBottom: Layout.padding / 2,
    paddingLeft: Layout.padding * 2,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
