import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import DoingWorkoutEvaluationScreenHOC from './DoingWorkoutEvaluationScreenHOC';
import {
  LoadingFullScreen,
  BottomBarTemplate,
  RegularText,
  Input,
  KeyboardView,
  Button,
  DismissKeyboard,
} from '../../components';
import {Colors, Layout} from '../../constants';

const DoingWorkoutEvaluationScreen = ({
  loading,
  duration,
  remoteConfigs,
  submitting,
  onChangeDuration,
  onFinishActivity,
  individually,
}) => {
  if (loading) {
    return <LoadingFullScreen secondary hideImage />;
  }

  return (
    <BottomBarTemplate
      bottomBar={
        <Button
          onPress={onFinishActivity}
          loading={submitting}
          disabled={
            Math.floor(duration / 60000) > remoteConfigs.max_activity_duration || submitting
          }>
          Submit
        </Button>
      }>
      <DismissKeyboard>
        <View style={styles.container}>
          <KeyboardView keyboardVerticalOffset={76}>
            <RegularText style={styles.text1}>WELL DONE</RegularText>
            <RegularText style={styles.text2}>
              Confirm {individually ? 'exercise' : 'workout'} duration
            </RegularText>
            <View style={styles.timeItem}>
              <Input
                style={styles.durationInput}
                maxLength={3}
                placeholder={Math.floor(duration / 60000).toString()}
                value={Math.floor(duration / 60000).toString()}
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

DoingWorkoutEvaluationScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  remoteConfigs: PropTypes.object.isRequired,
  duration: PropTypes.number,
  submitting: PropTypes.bool.isRequired,
  onFinishActivity: PropTypes.func.isRequired,
  onChangeDuration: PropTypes.func.isRequired,
};

DoingWorkoutEvaluationScreen.defaultProps = {
  duration: 0,
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

export default DoingWorkoutEvaluationScreenHOC(DoingWorkoutEvaluationScreen);
