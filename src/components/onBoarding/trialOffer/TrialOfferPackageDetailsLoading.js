import React from 'react';
import {Loading} from '../../loading';
import {Rect} from 'react-content-loader/native';
import {Layout} from '../../../constants';

const SECTION_HEIGHT = Layout.padding * 2 + 40 * 1.5;

const TrialOfferPackageDetailsLoading = () => (
  <Loading
    viewBox="0 0 100 20"
    height={SECTION_HEIGHT}
    style={styles.container}>
    <Rect x={10} y={3} width={80} height={5} rx={1} />
    <Rect x={10} y={12} width={80} height={5} rx={1} />
  </Loading>
);

export default TrialOfferPackageDetailsLoading;

const styles = {
  container: {
    width: '100%',
    height: SECTION_HEIGHT,
  },
};
