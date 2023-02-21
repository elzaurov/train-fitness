import React from 'react';
import {PaymentSuccess} from '../../components';
import PaymentSuccessHOC from './PaymentSuccessScreenHOC';

const PaymentSuccessScreen = ({...props}) => <PaymentSuccess {...props} />;

export default PaymentSuccessHOC(PaymentSuccessScreen);
