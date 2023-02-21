import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  ViewPropTypes,
} from 'react-native';
import {RegularText, TitleText} from '../../layout';
import {Colors, Layout} from '../../../constants';
import {UIBadge} from '../../common';

const SubscriptionPlan = ({
  id,
  title,
  description,
  price,
  popular,
  waiting,
  selected,
  onSelect,
  disabled,
  style,
}) => (
  <TouchableOpacity onPress={() => onSelect(id)} disabled={disabled}>
    <View style={[styles.container, selected ? styles.selected : null, style]}>
      {waiting ? (
        <View style={styles.waiterContainer}>
          <ActivityIndicator size="small" color={Colors.white} />
        </View>
      ) : null}
      <View style={styles.brief}>
        <View style={styles.header}>
          <TitleText style={styles.titleText} numberOfLines={1}>
            {title}
          </TitleText>
          {popular ? <UIBadge size="small" text="Most Popular!" /> : null}
        </View>
        <RegularText style={styles.descriptionText}>{description}</RegularText>
      </View>
      <TitleText style={styles.price}>{price}</TitleText>
    </View>
  </TouchableOpacity>
);

SubscriptionPlan.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string,
  popular: PropTypes.bool,
  waiting: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  style: ViewPropTypes.style,
};

SubscriptionPlan.defaultProps = {
  description: null,
  popular: false,
  waiting: false,
  disabled: false,
  selected: false,
  onSelect: () => {},
  style: null,
};

export default SubscriptionPlan;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.gray4,
    padding: Layout.padding,
    borderRadius: 4,
    shadowColor: Colors.shadowColor,
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: [{scale: 0.98}],
  },
  selected: {
    backgroundColor: Colors.gray6,
    transform: [{scale: 1.02}],
  },
  waiterContainer: {
    position: 'absolute',
    backgroundColor: Colors.mineShaft,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brief: {
    flex: 1,
    alignContent: 'stretch',
  },
  price: {
    flex: 0,
    fontSize: 24,
    marginBottom: 0,
  },
  header: {
    marginRight: 8,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    flexShrink: 0.1,
    fontSize: 14,
    marginRight: 8,
    marginBottom: 0,
  },
  descriptionText: {
    fontSize: 12,
  },
});
