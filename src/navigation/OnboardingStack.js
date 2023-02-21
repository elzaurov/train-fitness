import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {updateMilestones} from '../actions';
import {MILESTONE_ONBOARDED} from '../constants';
import {
    NewProgramScreen,
    NewWorkoutScreen,
    PositionScreen,
    IntroScreen,
    RecommendationsScreen,
    OnBoardingFeaturesScreen,
    OnBoardingPaywallScreen,
    OnBoardingPlansScreen,
} from '../screens';
import {CourseScreenContainer} from '../containers';

const Stack = createStackNavigator();

const OnBoardingStack = ({navigation}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsub = navigation.addListener('blur', () => {
            dispatch(updateMilestones({[MILESTONE_ONBOARDED]: true}));
        });

        return () => {
            unsub();
        };
    }, [navigation, dispatch]);

    return (
        <Stack.Navigator headerMode="screen">
            <Stack.Screen
                name="Position"
                component={PositionScreen}
                options={PositionScreen.navigationOptions}
            />
            <Stack.Screen
                name="Intro"
                component={IntroScreen}
                options={IntroScreen.navigationOptions}
            />
            <Stack.Screen
                name="Recommendations"
                component={RecommendationsScreen}
                options={RecommendationsScreen.navigationOptions}
            />
            <Stack.Screen
                name="OnBoardingPaywall"
                component={OnBoardingPaywallScreen}
                options={OnBoardingPaywallScreen.navigationOptions}
            />
            <Stack.Screen
                name="OnBoardingFeatures"
                component={OnBoardingFeaturesScreen}
                options={OnBoardingFeaturesScreen.navigationOptions}
            />
            <Stack.Screen
                name="OnBoardingPlans"
                component={OnBoardingPlansScreen}
                options={OnBoardingPlansScreen.navigationOptions}
            />
            <Stack.Screen
                name="Workout"
                component={NewWorkoutScreen}
                options={NewWorkoutScreen.navigationOptions}
            />
            <Stack.Screen
                name="Program"
                component={NewProgramScreen}
                options={NewProgramScreen.navigationOptions}
            />
            <Stack.Screen
                name="Course"
                component={CourseScreenContainer}
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen
                name="CourseVideos"
                component={CourseScreenContainer}
                options={CourseScreenContainer.navigationOptions}
            />
        </Stack.Navigator>
    );
};

OnBoardingStack.propTypes = {
    navigation: PropTypes.shape({addListener: PropTypes.func}).isRequired,
};

export default OnBoardingStack;
