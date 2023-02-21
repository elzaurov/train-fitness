import React from 'react';
import {Rect} from 'react-content-loader/native';
import {StyleSheet, ViewPropTypes, View} from 'react-native';
import {Layout} from '../../../constants';
import {Loading} from '../../loading';

const RecommendationCategoriesLoading = ({style}) => (
  <View style={[styles.container, style]}>
    <Loading viewBox="0 0 100 100" height="100%">
      <Rect x={0} y={0} width={100} height={14} rx={2} />
      <Rect x={0} y={18} width={100} height={60} rx={2} />
      <Rect x={0} y={82} width={100} height={4} rx={2} />
      <Rect x={0} y={88} width={100} height={4} rx={2} />
      <Rect x={0} y={94} width={80} height={4} rx={2} />
    </Loading>
  </View>
);

RecommendationCategoriesLoading.propTypes = {
  style: ViewPropTypes.style,
};

RecommendationCategoriesLoading.defaultProps = {
  style: null,
};

export default RecommendationCategoriesLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.padding,
  },
});
