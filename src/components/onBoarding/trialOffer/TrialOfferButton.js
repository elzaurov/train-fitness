import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button, RegularText } from '../../layout';
import { useSubscriptions } from '../../../hooks';
import { useNavigation } from '@react-navigation/native';

const TrialOfferButtons = ({topText, bottomText, holding, style, ...props }) => {
  const {
    loading,
    subscribing,
    popularPlan,
    subscribe,
  } = useSubscriptions();

  const navigation = useNavigation();

  const handleStartTrialPress = async () => {
    const verified = await subscribe(popularPlan);
    if (verified) {
      navigation.push('Recommendations');
    }
  };

  return (
    <Button
      disabled={holding || loading}
      loading={holding || subscribing}
      onPress={handleStartTrialPress}
      {...props}>
      <View style={[styles.textContainer, style]}>
        {topText && <RegularText style={styles.text}>{topText}</RegularText>}
        {bottomText && <RegularText style={styles.text}>{bottomText}</RegularText>}
      </View>
    </Button>
  );
};

TrialOfferButtons.propTypes = {
  holding: PropTypes.bool,
  topText: PropTypes.string,
  bottomText: PropTypes.string,
  style: PropTypes.any,
};

TrialOfferButtons.defaultProps = {
  holding: false,
  firstLineText: '',
  secondLineText: '',
  style: null,
};

export default TrialOfferButtons;

const styles = StyleSheet.create({
  textContainer: {
    height: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
