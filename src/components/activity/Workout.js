import React from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet} from 'react-native';
import {Card} from '../common';
import {PremiumWrapper} from '../premium';
import {RegularText} from '../layout';
import {Colors, Layout} from '../../constants';

// temporary imports
import Categories from '../../components/activity/Categories';

const Workout = ({thumbnail, name, isPremium, duration, ...rest}) => {
  // let durationElement;

  // if (Number(duration)) {
  //   durationElement = (
  //     <View style={styles.duration}>
  //       <MaterialCommunityIcons
  //         name="clock"
  //         size={14}
  //         color={Colors.mineShaft}
  //       />
  //       <RegularText style={styles.durationText}>{duration} Mins</RegularText>
  //     </View>
  //   );
  // }

  return (
    <PremiumWrapper isPremium={isPremium} overlay>
      <Card
        style={styles.workoutCard}
        thumbnail={thumbnail}
        thumbnailStyle={styles.workoutCardThumbnail}
        {...rest}>
        <View style={styles.mainInfoContainer}>
          <RegularText style={styles.name}>{name.toUpperCase()}</RegularText>
          {/* {durationElement} */}
        </View>
        {rest.categories && <Categories {...rest} />}
      </Card>
    </PremiumWrapper>
  );
};

Workout.propTypes = {
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  categories: PropTypes.array,
  duration: PropTypes.number,
  isPremium: PropTypes.bool,
};

Workout.defaultProps = {
  thumbnail: null,
  name: '',
  categories: null,
  duration: 0,
  isPremium: false,
};

export default Workout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  workoutCard: {
    height: Layout.window.width * 0.35,
  },
  workoutCardThumbnail: {
    height: Layout.window.width * 0.35,
    width: Layout.window.width * 0.35,
  },
  mainInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  name: {
    flex: 1,
    color: Colors.black,
    fontSize: Layout.isSmallDevice ? 11 : 14,
  },
  duration: {
    flex: 0,
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    color: Colors.mineShaft,
    marginLeft: 8,
  },
});
