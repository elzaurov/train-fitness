import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet} from 'react-native';
import WorkoutsLoading from '../../components/activity/WorkoutsLoading';
import {ScreenScrollView} from '../../components';
import WorkoutsScreenHOC from './WorkoutsScreenHOC';

// temporary imports
import Workouts from '../../components/activity/Workouts';
import Categories from '../../components/activity/Categories';
import {Layout} from '../../constants';

const WorkoutsScreen = ({loading, ...rest}) => {
  if (loading === true) {
    return <WorkoutsLoading />;
  }

  return (
    <ScreenScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.filters}>
        <Categories
          {...rest}
          selectable
          categorySize="small"
          isOnBlackBackground
          isFilter
        />
      </ScrollView>
      <Workouts style={styles.workouts} {...rest} />
    </ScreenScrollView>
  );
};

WorkoutsScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  workouts: PropTypes.array.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
};

export default WorkoutsScreenHOC(WorkoutsScreen);

const styles = StyleSheet.create({
  filters: {
    padding: Layout.padding,
  },
  workouts: {
    padding: Layout.padding,
  },
});
