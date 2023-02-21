import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TabBar, ScrollPager} from 'react-native-tab-view';
import {AddToCalendarButton} from '../../common';
import {RegularText, TabView} from '../../layout';
import {ActivityVideo} from '../../player';
import {VideoLoading} from '../../loading';
import {Colors, Layout} from '../../../constants';
import {ExerciseDetails} from '../exercises';
import WorkoutExerciseList from './WorkoutExerciseList';
import WorkoutDetails from './WorkoutDetails';
import WorkoutHOC from './WorkoutHOC';
import Timer from './Timer';

const Workout = ({
  exercises,
  hasCheckedItems,
  hasUncheckedItems,
  loading,
  playlist,
  schedule,
  selectedExercise,
  workout,
  onAddToCalendarPress,
  onCompleteExercise,
  onRemoveCompleteExercise,
  onSelectExercise,
  onFinish,
  t,
}) => (
  <View style={styles.content}>
    {loading ? <VideoLoading /> : <ActivityVideo activity={selectedExercise} />}
    {onAddToCalendarPress && (
      <AddToCalendarButton onAddToCalendarPress={onAddToCalendarPress} />
    )}
    <TabView
      routes={[
        {key: 'exercises', title: t('exercises')},
        {key: 'details', title: t('details')},
        {key: 'overview', title: t('overview')},
      ]}
      renderScene={({route}) => {
        switch (route.key) {
          case 'exercises':
            return loading ? (
              <RegularText style={styles.loading}>{t('loading')}</RegularText>
            ) : (
              <WorkoutExerciseList
                hasSchedule={!!schedule && !schedule.completed}
                exercises={exercises}
                selectedExerciseKey={selectedExercise.key}
                playlist={playlist}
                onCompleteExercise={onCompleteExercise}
                onRemoveCompleteExercise={onRemoveCompleteExercise}
                onSelectExercise={onSelectExercise}
              />
            );
          case 'details':
            return loading ? (
              <RegularText style={styles.loading}>{t('loading')}</RegularText>
            ) : (
              <ExerciseDetails exercise={selectedExercise} />
            );
          case 'overview':
            return <WorkoutDetails workout={workout} />;
          default:
            return null;
        }
      }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabs}
          pressOpacity={1}
          indicatorStyle={{
            backgroundColor: Colors.white,
          }}
        />
      )}
    />
    {schedule && (
      <Timer
        scheduleId={schedule.uid}
        hasCheckedItems={hasCheckedItems}
        hasUncheckedItems={hasUncheckedItems}
        onFinish={onFinish}
      />
    )}
  </View>
);

Workout.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasCheckedItems: PropTypes.bool.isRequired,
  hasUncheckedItems: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  playlist: PropTypes.objectOf(PropTypes.any),
  schedule: PropTypes.objectOf(PropTypes.any),
  selectedExercise: PropTypes.objectOf(PropTypes.any).isRequired,
  workout: PropTypes.objectOf(PropTypes.any).isRequired,
  onAddToCalendarPress: PropTypes.func,
  onCompleteExercise: PropTypes.func.isRequired,
  onRemoveCompleteExercise: PropTypes.func.isRequired,
  onSelectExercise: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

Workout.defaultProps = {
  playlist: undefined,
  schedule: undefined,
  onAddToCalendarPress: undefined,
};

export default WorkoutHOC(withTranslation('workoutComponent')(Workout));

const styles = StyleSheet.create({
  loading: {
    padding: Layout.padding,
  },
  thumbnail: {
    height: Layout.window.width,
    width: Layout.window.width,
  },
  name: {
    padding: Layout.padding,
    fontSize: 18,
  },
  tabs: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderColor: Colors.separator,
  },
  content: {
    flex: 1,
    // height: Layout.window.height - Layout.headerHeight,
    backgroundColor: Colors.background,
  },
});
