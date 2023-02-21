import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabView, TabBar, ScrollPager} from 'react-native-tab-view';
import {StyleSheet} from 'react-native';
import LearningScreenHOC from './LearningScreenHOC';
import CoursesScreen from './CoursesScreen';
import GameBrainTeasersScreen from './GameBrainTeasersScreen';
import ClassroomTeasersScreen from './ClassroomTeasersScreen';
import {CheckPlanWrapper} from '../../layout';
import {Colors, Layout} from '../../constants';

// temporary imports
// import CoursesScreen from '../activity/CoursesScreen';

const LearningScreen = ({hideCourses, index, navigation, onIndexChange, t}) => (
  <CheckPlanWrapper navigation={navigation}>
    <TabView
      navigationState={{
        index,
        routes: [
          ...(hideCourses ? [] : [{key: 'course', title: t('courses')}]),
          {key: 'gamebrain', title: t('gamebrain')},
          {key: 'classroom', title: t('classroom')},
        ],
      }}
      renderScene={({route}) => {
        switch (route.key) {
          case 'course':
            return (
              <CoursesScreen
                startWithSequencialList={false}
                navigation={navigation}
              />
            );
          case 'gamebrain':
            return <GameBrainTeasersScreen navigation={navigation} />;
          case 'classroom':
            return <ClassroomTeasersScreen navigation={navigation} />;
          default:
            return null;
        }
      }}
      onIndexChange={onIndexChange}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabs}
          labelStyle={Layout.isSmallDevice ? {fontSize: 11} : {}}
          pressOpacity={1}
          indicatorStyle={{
            backgroundColor: Colors.secondary,
          }}
        />
      )}
    />
  </CheckPlanWrapper>
);

LearningScreen.propTypes = {
  index: PropTypes.number.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  plan: PropTypes.objectOf(PropTypes.any).isRequired,
  onIndexChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  hideCourses: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  hideCourses: state.remoteConfigs.ux_browse_home,
});

export default LearningScreenHOC(
  connect(mapStateToProps)(withTranslation('learningScreen')(LearningScreen)),
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
