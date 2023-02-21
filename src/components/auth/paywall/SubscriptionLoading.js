import React from 'react';
import {Rect} from 'react-content-loader/native';
import Loading from '../../loading/Loading';

const SubscriptionLoading = ({...props}) => (
  <Loading viewBox="0 0 320 292" height="292" {...props}>
    <Rect x={0} y={0} width={320} height={92} rx={4} />
    <Rect x={0} y={100} width={320} height={92} rx={4} />
    <Rect x={0} y={200} width={320} height={92} rx={4} />
  </Loading>
);

export default SubscriptionLoading;
