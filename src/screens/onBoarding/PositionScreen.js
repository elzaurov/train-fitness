import React from 'react';
import {OnBoardingHeader, Position} from '../../components';

const PositionScreen = ({...props}) => <Position {...props} />;

PositionScreen.navigationOptions = {
  headerTransparent: true,
  header: (props) => <OnBoardingHeader {...props} />,
};

export default PositionScreen;
