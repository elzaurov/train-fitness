import React, {useRef, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {ScrollView, View} from 'react-native';
import DoingCrossTrainingScreenHOC from './DoingCrossTrainingScreenHOC';
import {Layout, Colors} from '../../constants';
import {
  LoadingFullScreen,
  TimerOverlay,
  RegularText,
  ScrollViewHeaderScreenTemplate,
  Button,
} from '../../components';

const DoingCrossTrainingScreen = ({
  navigation,
  loading,
  activity,
  date,
  canStart,
  scheduledDate,
  onFinishActivity,
  onGoBackToTracker,
}) => {
  const scrollViewRef = useRef();
  const [openedTimer, setOpenedTimer] = useState(false);
  const onChangeTimerState = useCallback(
    (opened) => {
      setOpenedTimer(opened);
      if (opened) {
        scrollViewRef.current?.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      }
    },
    [scrollViewRef],
  );

  if (loading) {
    return <LoadingFullScreen secondary hideImage />;
  }

  let bottomButton;
  if (!canStart) {
    const buttonText = moment().isAfter(scheduledDate)
      ? 'Not Available'
      : `Available on ${scheduledDate.format('MMMM Do')}`;

    bottomButton = <Button disabled>{buttonText}</Button>;
  }

  return (
    <TimerOverlay
      exercise={activity}
      onChangeState={onChangeTimerState}
      currentExerciseIndex={1}
      lastExerciseIndex={1}
      canStart={canStart}
      bottomButton={bottomButton}
      onCompleteExercise={onFinishActivity}
      disabled={!date}>
      <ScrollViewHeaderScreenTemplate
        navigation={navigation}
        title={activity.name}
        uri={activity.thumbnail}
        scrollRef={scrollViewRef}
        scrollEnabled={!openedTimer}
        onLeftAction={onGoBackToTracker}>
        <View style={styles.container}>
          <RegularText style={styles.descriptionText}>
            {activity.description
              .replace(/\n|\r/g, ' ')
              .replace(/\s{2,}/g, ' ')}
          </RegularText>
        </View>
      </ScrollViewHeaderScreenTemplate>
    </TimerOverlay>
  );
};

DoingCrossTrainingScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  date: PropTypes.string,
  activity: PropTypes.objectOf(PropTypes.any).isRequired,
  canStart: PropTypes.bool,
  scheduledDate: PropTypes.any.isRequired,
  onFinishActivity: PropTypes.func.isRequired,
  onGoBackToTracker: PropTypes.func.isRequired,
};

DoingCrossTrainingScreen.defaultProps = {
  date: null,
  canStart: false,
};

export default DoingCrossTrainingScreenHOC(DoingCrossTrainingScreen);

const styles = {
  container: {
    paddingTop: 1.5 * Layout.padding,
    paddingLeft: 2 * Layout.padding,
    paddingRight: 2 * Layout.padding,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.white,
  },
};
