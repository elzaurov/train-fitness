import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Image} from 'react-native';
import {TitleText, RegularText} from '../../layout';
import {Colors} from '../../../constants';

const CoachSlide = ({name, description, imgSource}) => (
  <View style={styles.container}>
    <Image style={styles.image} source={imgSource} />
    <View style={styles.textContainer}>
      <TitleText style={styles.titleText}>{name}</TitleText>
      <RegularText style={styles.descriptionText}>{description}</RegularText>
    </View>
  </View>
);

CoachSlide.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  imgSource: PropTypes.number,
};

CoachSlide.defaultProps = {
  name: null,
  description: null,
  imgSource: null,
};

export default CoachSlide;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'red',
  },
  image: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    backgroundColor: `${Colors.background}88`,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 45,
  },
  titleText: {
    flex: 0,
    fontSize: 14,
    marginBottom: 4,
  },
  descriptionText: {
    flex: 0,
    fontSize: 12,
  },
});
