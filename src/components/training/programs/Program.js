import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import {TabBar, ScrollPager} from 'react-native-tab-view';
import {RegularText, TabView} from '../../layout';
import {Colors, Layout} from '../../../constants';
import ProgramPhases from './ProgramPhases';
import ProgramDetails from './ProgramDetails';
import ProgramWorkout from './ProgramWorkout';

const Program = ({currentProgram, currentWorkout, program, schedule, t}) => {
  const {phases, thumbnail} = program;
  const [height, setHeight] = useState(Layout.window.height - Layout.headerHeight); 

  const routes = [
    {key: 'workouts', title: t('workouts')},
    {key: 'details', title: t('details')},
  ];

  if (currentWorkout) {
    routes.unshift({key: 'scheduled', title: t('scheduled')});
  }

  const content = (
    <View style={[styles.content, {height}]}>
      <TabView
        routes={routes}
        outerHandleIndexChange={(index)=>{
          setHeight(index ===1 ? '100%' : Layout.window.height - Layout.headerHeight);
        }}
        renderScene={({route}) => {
          switch (route.key) {
            case 'scheduled':
              return (
                <View style={styles.currentWorkout}>
                  <RegularText style={styles.currentWorkoutText}>
                    {t('currentWorkout')}
                  </RegularText>
                  <ProgramWorkout
                    currentProgram={currentProgram}
                    schedule={schedule}
                    workoutId={currentWorkout}
                    isScheduled={true}
                  />
                </View>
              );
            case 'workouts':
              return (
                <ProgramPhases
                  phases={phases}
                  currentWorkout={currentWorkout}
                />
              );
            case 'details':
              return <ProgramDetails program={program} />;
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
    </View>
  );

  return content;
};

Program.propTypes = {
  currentProgram: PropTypes.objectOf(PropTypes.any),
  currentWorkout: PropTypes.string,
  program: PropTypes.objectOf(PropTypes.any).isRequired,
  schedule: PropTypes.objectOf(PropTypes.any),
  onAddToCalendarPress: PropTypes.func,
  t: PropTypes.func.isRequired,
};

Program.defaultProps = {
  currentProgram: undefined,
  currentWorkout: undefined,
  schedule: undefined,
  onAddToCalendarPress: undefined,
};

export default withTranslation('programComponent')(Program);

const styles = StyleSheet.create({
  thumbnail: {
    height: Layout.window.width,
    width: Layout.window.width,
  },
  tabs: {
    backgroundColor: Colors.background2,
    borderBottomWidth: 1,
    borderColor: Colors.separator,
  },
  content: {
    backgroundColor: Colors.background2,
  },
  currentWorkout: {
    padding: Layout.padding,
  },
  currentWorkoutText: {
    paddingBottom: Layout.padding / 2,
  },
});
