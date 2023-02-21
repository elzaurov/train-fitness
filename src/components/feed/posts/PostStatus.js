import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, View} from 'react-native';
import {RegularText} from '../../layout';
import {Feeling} from '../../notes';
import {Layout, Colors} from '../../../constants';
import PostStatusHOC from './PostStatusHOC';

const PostStatus = ({duration, experience, postFeeling}) => (
  <View style={styles.container}>
    <View style={styles.activityEvaluationContainer}>
      {experience && (
        <View style={styles.experienceContainer}>
          <MaterialCommunityIcons
            name="trophy-outline"
            color={Colors.green}
            size={24}
          />
          <RegularText style={styles.experience}>{experience}</RegularText>
        </View>
      )}
      {/* {
        rating && (
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            emptyStar="star-outline"
            fullStar="star"
            halfStar="star-half"
            iconSet="MaterialCommunityIcons"
            fullStarColor={Colors.seaBuckthorn}
            starSize={experience ? 20 : 25}
          />
        )
      } */}
    </View>
    <View style={styles.noteEvaluationContainer}>
      {postFeeling && (
        <View style={styles.feelingContainer}>
          <Feeling {...postFeeling} size={27} />
        </View>
      )}
      {duration && (
        <Fragment>
          <MaterialCommunityIcons
            name="clock"
            color={Colors.dustyGray}
            size={25}
          />
          <RegularText style={styles.duration}>{duration}</RegularText>
        </Fragment>
      )}
    </View>
  </View>
);

export default PostStatusHOC(PostStatus);

PostStatus.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  duration: PropTypes.string,
  experience: PropTypes.string,
  postFeeling: PropTypes.objectOf(PropTypes.any),
};

PostStatus.defaultProps = {
  duration: null,
  experience: null,
  postFeeling: null,
};

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width - 2 * Layout.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: Layout.margin,
    marginRight: Layout.margin,
    marginBottom: 13,
  },
  activityEvaluationContainer: {
    width: '62%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  experienceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  noteEvaluationContainer: {
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  duration: {
    color: Colors.text,
    fontSize: 18,
    marginLeft: 7,
  },
  experience: {
    color: Colors.green,
    fontSize: 18,
    marginLeft: 7,
  },
  feelingContainer: {
    marginRight: 10,
  },
});
