import React from 'react';

import {
  QuoteScreen,
  PositionScreen,
  ImprovementScreen,
  DailyGoalScreen,
  CreatingPlanScreen,
} from '../../screens';

const getOnBoardingScreens = (Stack) => (
  <>
    <Stack.Screen
      name="PositionOnBoarding"
      component={PositionScreen}
      options={PositionScreen.navigationOptions}
    />
    <Stack.Screen
      name="ImprovementOnBoarding"
      component={ImprovementScreen}
      options={ImprovementScreen.navigationOptions}
    />
    <Stack.Screen
      name="DailyGoalOnBoarding"
      component={DailyGoalScreen}
      options={DailyGoalScreen.navigationOptions}
    />
    <Stack.Screen
      name="CreatingPlanOnBoarding"
      component={CreatingPlanScreen}
      options={CreatingPlanScreen.navigationOptions}
    />
    <Stack.Screen
      name="Quote"
      component={QuoteScreen}
      options={QuoteScreen.navigationOptions}
    />
  </>
);

export default getOnBoardingScreens;
