import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import StarRating from 'react-native-star-rating';
import DoingCrossTrainingEvaluationScreenHOC from './DoingCrossTrainingEvaluationScreenHOC';
import {
  LoadingFullScreen,
  BottomBarTemplate,
  RegularText,
  KeyboardView,
  Input,
  Button,
  DismissKeyboard,
} from '../../components';
import {Colors, Layout} from '../../constants';

const DoingCrossTrainingEvaluationScreen = ({
  loading,
  rating,
  duration,
  submitting,
  remoteConfigs,
  onStarRatingPress,
  onChangeDuration,
  onFinishActivity,
}) => {
  if (loading) {
    return <LoadingFullScreen secondary hideImage />;
  }
  return (
    <BottomBarTemplate
      bottomBar={
        <Button
          disabled={
            Math.floor(duration / 60000) >
              remoteConfigs.max_activity_duration || rating === 0 || submitting
          }
          onPress={onFinishActivity}
          loading={submitting}>
          Submit
        </Button>
      }>
      <DismissKeyboard>
        <View style={styles.container}>
          <KeyboardView keyboardVerticalOffset={76}>
            <RegularText style={styles.text1}>WELL DONE</RegularText>
            <RegularText style={styles.text2}>
              Evaluate your training
            </RegularText>
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
            <View style={styles.timeItem}>
              <Input
                style={styles.durationInput}
                placeholder={Math.floor(duration / 60000).toString()}
                value={Math.floor(duration / 60000).toString()}
                maxLength={3}
                keyboardType="numeric"
                onChangeText={(val) => {
                  onChangeDuration(parseInt(val, 10) * 60000);
                }}
              />
              {Math.floor(duration / 60000) >
                remoteConfigs.max_activity_duration && (
                <RegularText style={styles.warningText}>
                  Maximum 240
                </RegularText>
              )}
              <RegularText style={styles.timeText}>Minute(s)</RegularText>
            </View>
          </KeyboardView>
        </View>
      </DismissKeyboard>
    </BottomBarTemplate>
  );
};

DoingCrossTrainingEvaluationScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  submitting: PropTypes.bool.isRequired,
  remoteConfigs: PropTypes.object.isRequired,
  onStarRatingPress: PropTypes.func.isRequired,
  onFinishActivity: PropTypes.func.isRequired,
  onChangeDuration: PropTypes.func.isRequired,
};

const styles = {
  container: {
    padding: Layout.padding,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontSize: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  text2: {
    fontSize: 30,
    marginBottom: 50,
    textAlign: 'center',
  },
  stars: {
    marginBottom: 50,
    marginLeft: Layout.padding * 2,
    marginRight: Layout.padding * 2,
  },
  timeItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: Colors.dustyGray,
    marginTop: Layout.halfMargin / 4,
    fontSize: 20,
  },
  durationInput: {
    textAlign: 'center',
    width: 76,
    fontSize: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  warningText: {
    fontSize: 16,
    color: Colors.secondary2,
  },
};

export default DoingCrossTrainingEvaluationScreenHOC(
  DoingCrossTrainingEvaluationScreen,
);
