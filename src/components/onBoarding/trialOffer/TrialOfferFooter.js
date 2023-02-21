import React from 'react';
import {View, ViewPropTypes, StyleSheet} from 'react-native';
import {Layout} from '../../../constants';
import {RegularText} from '../../layout';

const TrialOfferFooter = ({style}) => (
  <View style={[styles.container, style]}>
    <RegularText style={styles.text}>
      A week of premium for free is our way of saying
    </RegularText>
    <RegularText style={styles.text}>
      "Thanks for joining the Train Effective family!"
    </RegularText>
  </View>
);

TrialOfferFooter.propTypes = {
  style: ViewPropTypes.style,
};

TrialOfferFooter.defaultProps = {
  style: null,
};

export default TrialOfferFooter;

const styles = StyleSheet.create({
  container: {
    paddingTop: Layout.padding / 2,
    paddingRight: Layout.padding * 2,
    paddingBottom: Layout.padding / 2,
    paddingLeft: Layout.padding * 2,
  },
  text: {
    textAlign: 'center',
  },
});
