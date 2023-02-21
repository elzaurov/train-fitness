import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {ModifyPlan, ModifyPlanIAP} from '../../components';
import SubscribeToPlanScreenHOC from './SubscribeToPlanScreenHOC';
import {Layout, Colors} from '../../constants';

const SubscribeToPlanScreen = (props) => {
  const {isAuth, isIAP} = props.route.params ?? {};

  return (
    <View style={styles.content}>
      {(isAuth || isIAP) && Layout.isIOS && (
        <ModifyPlanIAP {...props} isAuth={isAuth} />
      )}
      {!isAuth && !isIAP && <ModifyPlan {...props} />}
    </View>
  );
};

SubscribeToPlanScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default SubscribeToPlanScreenHOC(SubscribeToPlanScreen);

const styles = StyleSheet.create({
  title: {
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    marginBottom: 30,
    fontSize: 30,
    textAlign: 'center',
  },
  content: {
    backgroundColor: Colors.background,
    height: Layout.window.height,
    paddingTop: 20,
  },
});
