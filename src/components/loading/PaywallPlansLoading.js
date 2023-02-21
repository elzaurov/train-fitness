import React from 'react';
import {Rect} from 'react-content-loader/native';
import Loading from './Loading';

const PaywallPlansLoading = ({...props}) => (
  <Loading viewBox="0 0 320 120" {...props}>
    <Rect x={0} y={10} width={100} height={100} rx={8} />
    <Rect x={110} y={0} width={100} height={120} rx={8} />
    <Rect x={220} y={10} width={100} height={100} rx={8} />
  </Loading>
);

export default PaywallPlansLoading;
