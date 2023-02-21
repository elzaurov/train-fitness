import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {ScreenScrollView} from '../layout';
import {ActivityCard} from '../activity';
import {Layout} from '../../constants';
import BrowseCollectionHOC from './BrowseCollectionHOC';

const BrowseCollection = ({activities, onActivitySelect}) => (
  <ScreenScrollView style={styles.container}>
    {activities.map((activity) => (
      <ActivityCard
        key={activity.title}
        style={styles.activity}
        onSelect={() => onActivitySelect(activity)}
        {...activity}
      />
    ))}
    <View style={styles.spacer} />
  </ScreenScrollView>
);

BrowseCollection.propTypes = {
  activities: PropTypes.array.isRequired,
  onActivitySelect: PropTypes.func.isRequired,
};

export default BrowseCollectionHOC(BrowseCollection);

const styles = StyleSheet.create({
  container: {
    padding: Layout.padding,
  },
  activity: {
    marginBottom: 16,
  },
  spacer: {
    height: 96,
  },
});
