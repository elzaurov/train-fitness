import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Specialist} from '../common';
import {Requirements} from '../activity';
import {Layout, Colors} from '../../constants';
import BodyActivityIcon from '../svg/BodyActvityIcon';
import MindActivityIcon from '../svg/MindActivityIcon';

const RecommendedItem = ({item, onPress}) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
    <View style={styles.imageContainer}>
      <FastImage style={styles.thumbnail} source={{uri: item.thumbnail}} />
      <View
        style={[
          styles.triangle,
          {borderTopColor: item.phases ? Colors.secondary2 : Colors.blue},
        ]}
      />
      <View style={styles.triangleTextContainer}>
        {item.phases ? (
          <BodyActivityIcon fill={Colors.white} style={styles.icon} />
        ) : (
          <MindActivityIcon fill={Colors.white} style={styles.icon} />
        )}
      </View>
    </View>
    <View style={styles.specialistContainer}>
      {item.designedBy && (
        <Specialist
          imageStyle={{
            width: 50,
            height: 50,
          }}
          key={item.designedBy}
          id={item.designedBy}
          showDescription={false}
          isCompactDesign
        />
      )}
    </View>
  </TouchableOpacity>
);

RecommendedItem.propTypes = {
  item: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default RecommendedItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: Layout.isIphoneX ? 50 : 20,
    backgroundColor: Colors.gray2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 7,
    overflow: 'hidden',
  },
  triangle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 60,
    borderTopWidth: 60,
    borderRightColor: 'transparent',
    borderTopLeftRadius: 6,
    transform: [{rotate: '90deg'}],
  },
  triangleTextContainer: {
    position: 'absolute',
    top: 5,
    right: -7,
  },
  icon: {
    maxHeight: 27,
  },
  triangleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
  },
  requirementsContainer: {
    flex: 0.25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
  },
  specialistContainer: {
    flex: 0.25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.padding,
  },
  thumbnail: {
    flex: 1,
  },
  specialistStyle: {
    flex: 0,
    width: 'auto',
  },
});
