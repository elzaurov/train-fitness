import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Layout} from '../../constants';
import {RegularText, TitleText} from '../layout';

const PaymentSuccessHeader = () => (
  <View style={styles.container}>
    <MaterialCommunityIcons
      color={Colors.green}
      name="checkbox-marked-circle-outline"
      size={64}
    />
    <TitleText>You're now Premium!</TitleText>
    <RegularText>
      Enjoy the full access to the TrainEffective academy content.
    </RegularText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: Layout.padding * 3,
    alignItems: 'center',
    padding: Layout.padding,
  },
});

export default PaymentSuccessHeader;
