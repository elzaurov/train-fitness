import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image, SafeAreaView} from 'react-native';
import Position from './FieldPosition';
import {Layout, Colors, POSITIONS} from '../../../constants';
import imageSource from '../../../assets/images/onBoarding/football-field.jpg';
import {FitView} from '../../layout';

const POS_WIDTH = Layout.window.width * 0.15;
const POS_HEIGHT = POS_WIDTH;

const FIELD_RATIO = 1 / 1.43;

const SelectPosition = ({selectedPosition, onSelect}) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.fieldContainer}>
      <FitView aspectRatio={FIELD_RATIO} style={styles.field}>
        <Image style={styles.image} source={imageSource} />
        {POSITIONS.map(({id, title}) => (
          <Position
            width={POS_WIDTH}
            height={POS_HEIGHT}
            key={id}
            onSelect={() => onSelect(id)}
            isSelected={id === selectedPosition}
            text={title}
            style={[
              styles.position,
              styles[`pos_${id}`],
              {
                transform: [
                  {translateX: -POS_WIDTH / 2},
                  {translateY: -POS_HEIGHT / 2},
                  {scale: id === selectedPosition ? 1.2 : 1},
                ],
              },
            ]}
          />
        ))}
      </FitView>
    </View>
  </SafeAreaView>
);

SelectPosition.propTypes = {
  selectedPosition: PropTypes.string,
  onSelect: PropTypes.func,
};

SelectPosition.defaultProps = {
  selectedPosition: null,
  onSelect: () => {},
};

export default SelectPosition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.padding,
  },
  field: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 8,
    height: '100%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  positionName: {
    fontSize: 25,
    color: Colors.gray1,
    textAlign: 'center',
  },
  position: {
    position: 'absolute',
  },
  pos_st: {
    left: '50%',
    top: '12%',
  },
  pos_lw: {
    left: '25%',
    top: '32%',
  },
  pos_cam: {
    left: '50%',
    top: '32%',
  },
  pos_rw: {
    left: '75%',
    top: '32%',
  },
  pos_cm_left: {
    left: '35%',
    top: '50%',
  },
  pos_cm_right: {
    left: '65%',
    top: '50%',
  },
  pos_lb: {
    left: '15%',
    top: '70%',
  },
  pos_cb_left: {
    left: '38%',
    top: '70%',
  },
  pos_cb_right: {
    left: '62%',
    top: '70%',
  },
  pos_rb: {
    left: '85%',
    top: '70%',
  },
  pos_gk: {
    left: '50%',
    top: '90%',
  },
});
