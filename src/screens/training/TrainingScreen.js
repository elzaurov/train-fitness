import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabView, TabBar, ScrollPager} from 'react-native-tab-view';
import {StyleSheet} from 'react-native';
import TrainingScreenHOC from './TrainingScreenHOC';
import ProgramsScreen from './ProgramsScreen';
// import WorkoutsScreen from './WorkoutsScreen';
import ExercisesScreen from './ExercisesScreen';
import {CheckPlanWrapper} from '../../layout';
import {Colors, Layout} from '../../constants';

// temporary imports
// import ProgramsScreen from '../../screens/activity/ProgramsScreen';
import WorkoutsScreen from '../../screens/activity/WorkoutsScreen';

const TrainingScreen = ({
  index,
  navigation,
  remoteConfigs,
  onIndexChange,
  hidePrograms,
  t,
}) => (
  <CheckPlanWrapper navigation={navigation}>
    <TabView
      navigationState={{
        index,
        routes: [
          ...(hidePrograms ? [] : [{key: 'programs', title: t('programs')}]),
          {key: 'workouts', title: t('workouts')},
          {key: 'exercises', title: t('exercises')},
        ],
      }}
      renderScene={({route}) => {
        switch (route.key) {
          case 'programs':
            return (
              <ProgramsScreen
                startWithSequencialList={false}
                navigation={navigation}
              />
            );
          case 'workouts':
            return <WorkoutsScreen navigation={navigation} />;
          default:
            return <ExercisesScreen navigation={navigation} />;
        }
      }}
      onIndexChange={onIndexChange}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabs}
          labelStyle={Layout.isSmallDevice ? {fontSize: 12} : {}}
          pressOpacity={1}
          indicatorStyle={{
            backgroundColor: Colors.secondary,
          }}
        />
      )}
    />
  </CheckPlanWrapper>
);

TrainingScreen.propTypes = {
  index: PropTypes.number.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  onIndexChange: PropTypes.func.isRequired,
  hidePrograms: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  hidePrograms: state.remoteConfigs.ux_browse_home,
});

export default TrainingScreenHOC(
  connect(mapStateToProps)(withTranslation('trainingScreen')(TrainingScreen)),
);

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: Colors.mineShaft,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
});
