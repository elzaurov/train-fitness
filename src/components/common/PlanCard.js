import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {RegularText} from '../layout';
import {Colors, Layout} from '../../constants';

const PlanCard = ({plan, backgroundColor, onSelectProduct, submitting}) => {
  let fontSize = 28;

  if (Layout.isSmallDevice && plan.localizedPrice.length >= 6) {
    fontSize = 19;
  } else if (!Layout.isSmallDevice && plan.localizedPrice.length >= 6) {
    fontSize = 22;
  }

  let content;

  if (submitting) {
    content = <ActivityIndicator color={Colors.white} />;
  } else {
    content = (
      <Fragment>
        <RegularText style={styles.title}>
          {plan.introductoryPrice ? 'TRIAL!' : ''}
          {plan.title
            .toUpperCase()
            .replace(' (TRAIN EFFECTIVE SOCCER ACADEMY)', '')}
        </RegularText>
        <RegularText
          style={[
            styles.price,
            {
              fontSize,
            },
          ]}>
          {plan.localizedPrice}
        </RegularText>
      </Fragment>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => onSelectProduct(plan)}
      disabled={submitting}>
      <View style={[styles.container]}>
        {plan.isPopular && (
          <View style={styles.popularContainer}>
            <RegularText style={styles.popularText}>MOST POPULAR</RegularText>
          </View>
        )}
        <View
          style={[
            styles.planContainer,
            {
              backgroundColor,
              borderTopLeftRadius: plan.isPopular ? 0 : 10,
              borderTopRightRadius: plan.isPopular ? 0 : 10,
            },
          ]}>
          {content}
        </View>
      </View>
    </TouchableOpacity>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.objectOf(PropTypes.any).isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onSelectProduct: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

PlanCard.defaultProps = {
  submitting: false,
};

export default PlanCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: (Layout.window.width - 2 * Layout.padding) / 3 - 5,
  },
  planContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 3,
    paddingRight: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 110,
  },
  popularContainer: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: Colors.gray4,
  },
  popularText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    letterSpacing: -1,
    fontWeight: '400',
    marginTop: 0,
  },
  duration: {
    marginTop: 5,
    fontSize: 13,
  },
  month: {
    fontSize: 10,
    marginTop: 5,
  },
});
