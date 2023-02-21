import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import WorkoutExercisesHOC from './WorkoutExercisesHOC';
import {RegularText} from '../layout';
import {Colors, Layout, PREMIUM_HIDE_BARRIER} from '../../constants';
import {Section, Card} from '../common';
import {PremiumWrapper} from '../premium';
import SubItemsPlaceholder from './SubItemsPlaceholder';

const Exercises = ({exercises, loading, onExerciseSelect, isPremium}) => {
  let content;

  if (!exercises) {
    return null;
  }

  if (loading === true) {
    content = <ActivityIndicator size="large" />;
  } else {
    content = exercises.map(({name, stats, thumbnail, rsr, key}) => {
      // let exerciseCategories;
      let recovery;

      if (rsr && rsr.recovery && rsr.recovery !== '0') {
        recovery = (
          <Card style={styles.restCard}>{`Rest for: ${rsr.recovery}`}</Card>
        );
      }

      // if (categories && categories.length) {
      //   exerciseCategories = (
      //     <View style={styles.categories}>
      //       {categories.map(category => (
      //         <RegularText key={category.key} style={styles.category}>
      //           {category.label}
      //         </RegularText>
      //       ))}
      //     </View>
      //   );
      // }

      return (
        <View style={styles.exercise} key={key}>
          <TouchableOpacity onPress={() => onExerciseSelect({key, name})}>
            <View style={styles.exerciseContent}>
              <View style={styles.exerciseItems}>
                <Card
                  thumbnail={thumbnail}
                  style={styles.exerciseCard}
                  thumbnailStyle={styles.exerciseCardThumbnail}>
                  <RegularText style={styles.name}>{name}</RegularText>
                  {/* {exerciseCategories} */}
                </Card>
                {recovery}
              </View>
              <View style={styles.exerciseSets}>
                <RegularText style={styles.exerciseSetsText}>
                  x{stats.sets ? stats.sets : '1'}
                </RegularText>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  }

  return (
    <Section title="Exercises" titleStyle={styles.titleStyle}>
      <PremiumWrapper
        isPremium={isPremium}
        placeholder={<SubItemsPlaceholder />}
        overlay>
        {content}
      </PremiumWrapper>
    </Section>
  );
};

Exercises.propTypes = {
  exercises: PropTypes.array,
  loading: PropTypes.bool,
  onExerciseSelect: PropTypes.func.isRequired,
  isPremium: PropTypes.bool,
};

Exercises.defaultProps = {
  exercises: [],
  loading: false,
  isPremium: false,
};

export default WorkoutExercisesHOC(Exercises);

const styles = StyleSheet.create({
  titleStyle: {
    marginBottom: 17,
  },
  exercise: {
    flex: 1,
    marginBottom: 24,
  },
  exerciseItems: {
    flex: 1,
  },
  exerciseCard: {
    minHeight: 90,
  },
  exerciseCardThumbnail: {
    minHeight: 90,
    width: Layout.isSmallDevice ? 120 : 155,
  },
  restCard: {
    height: 60,
    marginTop: 8,
  },
  name: {
    color: Colors.black,
    fontSize: 14,
    marginBottom: 8,
    width: '100%',
  },
  exerciseContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseSets: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.silver,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: Layout.padding,
  },
  exerciseSetsText: {
    flex: 1,
    fontSize: 17,
    color: Colors.silver,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
    height: 18,
    width: '100%',
  },
  categories: {
    flexDirection: 'row',
  },
  category: {
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 10,
    color: Colors.emperor,
    borderWidth: 1,
    borderColor: Colors.emperor,
    borderRadius: 10,
    marginRight: 8,
  },
});
