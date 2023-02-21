import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RegularText} from '../layout';
import {Colors, Layout} from '../../constants';

const Card = ({sizedImages, thumbnail, children, style, thumbnailStyle, ...rest}) => (
  <View style={[styles.container, style]} {...rest}>
    {!!thumbnail && (
      <Image
        style={[styles.thumbnail, thumbnailStyle]}
        source={sizedImages || {uri: thumbnail}}
      />
    )}
    <View style={[styles.content]}>
      {typeof children === 'string' ? (
        <RegularText style={styles.text}>{children}</RegularText>
      ) : (
        children
      )}
    </View>
  </View>
);

export default Card;

Card.propTypes = {
  thumbnail: PropTypes.string,
  style: PropTypes.any,
  children: PropTypes.any.isRequired,
  thumbnailStyle: PropTypes.any,
};

Card.defaultProps = {
  thumbnail: '',
  style: {},
  thumbnailStyle: null,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 4,
    overflow: 'hidden',
  },
  loadingCard: {
    backgroundColor: Colors.dustyGray,
  },
  content: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: Layout.padding / 2,
    paddingBottom: Layout.padding / 2,
    paddingLeft: Layout.padding / 2,
    paddingRight: Layout.padding / 2,
  },
  text: {
    color: Colors.black,
  },
  thumbnail: {
    width: Layout.window.width * 0.25,
    height: '100%',
    resizeMode: 'cover',
  },
});
