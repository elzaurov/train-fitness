import React, {useState, useCallback, useRef, createRef} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  LoadingFullScreen,
  RegularText,
  TimerOverlay,
  ActivityVideo,
  CachedImage,
  RepSets,
  CollapsibleView,
  Modal,
  PersonalBestModal,
} from '../../components';
import ExerciseScreenHOC from './ExerciseScreenHOC';
import {Colors, Layout} from '../../constants';
import {personalBest} from '../../utils';

const ExerciseScreen = ({
  loading,
  exercise,
  currentExerciseIndex,
  lastExerciseIndex,
  disableTimer,
  onCompleteExercise,
  canStart,
}) => {
  const scrollViewRef = useRef();
  const [openedTimer, setOpenedTimer] = useState(false);

  const [isVideoPaused, setIsVideoPaused] = useState(false);
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

  const [savedTimeSpent, setSavedTimeSpent] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const onCloseModal = useCallback(() => {
    onCompleteExercise(savedTimeSpent);
    setSavedTimeSpent(0);
    setModalVisible(false);
  }, [savedTimeSpent, onCompleteExercise]);
  const onComplete = useCallback(
    (timeSpent) => {
      onCompleteExercise(timeSpent);
      // @PersonalBest
      // if (personalBest.getExerciseById(exercise.key)) {
      //   setSavedTimeSpent(timeSpent);
      //   setModalVisible(true);
      // } else {
      //   onCompleteExercise(timeSpent);
      // }
    },
    [exercise, onCompleteExercise],
  );

  const fullscreen = useSelector((state) => state.android_player.fullscreen);

  if (loading) {
    return <LoadingFullScreen secondary hideImage />;
  }

  const {drillSetup, stats, rsr, equipments, tips} = exercise;

  const descriptionContent = (
    <CollapsibleView title="Description">
      <View style={styles.descriptionContainer}>
        <RegularText style={styles.descriptionText}>
          {exercise.intendedResults
            .replace(/\n|\r/g, ' ')
            .replace(/\s{2,}/g, ' ')}
        </RegularText>
        {exercise.how
          ? exercise.how.map((h, i) => (
              <RegularText key={i} style={styles.descriptionText}>
                {h.replace(/\n|\r/g, ' ').replace(/\s{2,}/g, ' ')}
              </RegularText>
            ))
          : null}
      </View>
    </CollapsibleView>
  );

  const equipmentContent = equipments ? (
    <CollapsibleView title="Equipment" initialCollapsed={true}>
      {equipments.map((equipment) => (
        <RegularText key={equipment}>{equipment}</RegularText>
      ))}
    </CollapsibleView>
  ) : null;

  const drillSetupContent = drillSetup ? (
    <CollapsibleView
      title="Drill Setup"
      style={styles.drillSetupContainer}
      initialCollapsed={true}>
      <CachedImage source={{uri: drillSetup}} style={styles.drillSetup} />
    </CollapsibleView>
  ) : null;

  const toggleIsVideoPaused = (paused) => {    
    setIsVideoPaused(paused);
  };

  return (
    <TimerOverlay
      videoOverlay
      onChangeState={onChangeTimerState}
      exercise={exercise}
      currentExerciseIndex={currentExerciseIndex}
      lastExerciseIndex={lastExerciseIndex}
      disabled={disableTimer}
      canStart={canStart}
      onPauseVideo={toggleIsVideoPaused}
      onCompleteExercise={onComplete}>
      {/*@PersonalBest*/}
      {/*<Modal modalVisible={modalVisible} onClose={onCloseModal}>*/}
      {/*  <PersonalBestModal exercise={exercise} onFinish={onCloseModal} />*/}
      {/*</Modal>*/}
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        scrollEnabled={!openedTimer && !fullscreen}>
        <View style={styles.videoContainer}>
          <ActivityVideo
            toggleIsVideoPaused={toggleIsVideoPaused}
            paused={isVideoPaused}
            activity={exercise}
          />
        </View>
        <RepSets reps={stats.reps} sets={stats.sets} rsr={rsr} tips={tips} />
        {descriptionContent}
        {equipmentContent}
        {drillSetupContent}
      </ScrollView>
    </TimerOverlay>
  );
};

ExerciseScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentExerciseIndex: PropTypes.number.isRequired,
  lastExerciseIndex: PropTypes.number.isRequired,
  disableTimer: PropTypes.bool,
  onCompleteExercise: PropTypes.func,
  exercise: PropTypes.objectOf(PropTypes.any).isRequired,
  canStart: PropTypes.bool,
};

ExerciseScreen.defaultProps = {
  disableTimer: false,
  onCompleteExercise: null,
  canStart: false,
};

export default ExerciseScreenHOC(ExerciseScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background2,
  },
  videoContainer: {
    paddingBottom: Layout.padding + 5,
  },
  resumeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.padding,
  },
  descriptionContainer: {
    padding: Layout.padding,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  icon: {
    paddingRight: 7,
  },
  drillSetupTitle: {
    fontSize: 14,
  },
  drillSetup: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});
