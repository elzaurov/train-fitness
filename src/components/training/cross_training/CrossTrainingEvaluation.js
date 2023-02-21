import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import StarRating from 'react-native-star-rating';
import {Button, Input, RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';
import CrossTrainingEvaluationHOC from './CrossTrainingEvaluationHOC';

const CrossTrainingEvaluation = ({
  minutes,
  rating,
  submitting,
  onComplete,
  onMinutesChange,
  onStarRatingPress,
  t,
}) => (
  <ScrollView bounces={false}>
    <View style={styles.container}>
      <RegularText style={styles.evaluate}>{t('evaluateMessage')}</RegularText>
      <View style={styles.stars}>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={rating}
          fullStarColor={Colors.seaBuckthorn}
          starSize={56}
          selectedStar={onStarRatingPress}
        />
      </View>
      <View style={styles.minutes}>
        <Input
          style={styles.minutesInput}
          value={minutes.toString()}
          maxLength={3}
          keyboardType="numeric"
          onChangeText={onMinutesChange}
        />
        <RegularText>{t('minutes')}</RegularText>
      </View>
      <Button
        style={styles.completeButton}
        onPress={onComplete}
        disabled={submitting || rating === 0}>
        {submitting ? t('completing') : t('complete')}
      </Button>
    </View>
  </ScrollView>
);

CrossTrainingEvaluation.propTypes = {
  minutes: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  submitting: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onMinutesChange: PropTypes.func.isRequired,
  onStarRatingPress: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default CrossTrainingEvaluationHOC(
  withTranslation('crossTrainingEvaluationComponent')(CrossTrainingEvaluation),
);

const styles = StyleSheet.create({
  drillSetup: {
    height: Layout.window.width - Layout.padding * 2,
    width: Layout.window.width - Layout.padding * 2,
  },
  evaluate: {
    fontSize: 18,
    marginTop: Layout.margin / 2,
  },
  container: {
    padding: Layout.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stars: {
    marginTop: Layout.margin,
    marginBottom: Layout.margin,
  },
  minutes: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  minutesInput: {
    width: 96,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 24,
    textAlign: 'center',
  },
  completeButton: {
    marginTop: Layout.margin * 2,
  },
});
