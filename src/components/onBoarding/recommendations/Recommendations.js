import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {addScheduleItem, loadActivity} from '../../../actions';
import {
    ANALYTICS_RECOMMENDATIONS_OPENED,
    DATE_FORMAT,
    Layout,
    USER_ROLE_PREMIUM,
} from '../../../constants';
import {getRouteNameFromType, parseVideoPath} from '../../../utils/helpers';
import {OnBoardingContainer, OnBoardingTemplate} from '../../layout';
import OnBoardingButton from '../OnBoardingButton';
import OnBoardingTitle from '../OnBoardingTitle';

// sections
import RecommendedCategories from './RecommendationCategories';
import RecommendationCategoriesLoading from './RecommendationCategoriesLoading';
import RecommendationsHeader from './RecommendationsHeader';

const CATEGORIES_ACTION_TITLES = {
    workout: 'Start Technical Training Now',
    tactical: 'Watch Tactical Analysis Now',
    mentality: 'Watch Mentality Training Now',
};

const Recommendations = () => {
    const date = moment().format(DATE_FORMAT);

    const [selectedRecommendation, setSelectedRecommendation] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    // loading and prescheduling recommendations and pre-schedules
    const position = useSelector(state => state.onBoarding.position);
    const userRole = useSelector(state => state.userRole);
    const {
        onboarding_recommendations_mappings: mappings,
        preschedule_items: preschedules,
    } = useSelector(state => state.remoteConfigs);

    const mapping = mappings?.[position];

    useEffect(() => {
        const loadAndSchedule = async () => {
            setLoading(true);

            const recommendationPaths = Object.values(mapping ?? {});

            const allPreschedules = [...preschedules, ...recommendationPaths];
            const loadTasks = allPreschedules.map(path =>
                dispatch(loadActivity(path)),
            );

            const activities = await Promise.all(loadTasks);

            const scheduleTasks = activities
                .filter(activity => activity)
                .filter(activity =>
                    activity.isPremium ? userRole === USER_ROLE_PREMIUM : true,
                )
                .filter(
                    activity =>
                        !dateSchedule?.some(item => item.key === activity.key),
                )
                .map(activity =>
                    dispatch(addScheduleItem({date, scheduleItem: activity})),
                );

            await Promise.all(scheduleTasks);

            setLoading(false);
        };

        loadAndSchedule();
    }, [
        position,
        mapping,
        preschedules,
        date,
        userRole,
        dateSchedule,
        dispatch,
    ]);

    // getting recommendations
    const {byKey: activities} = useSelector(state => state.activities);
    const dateSchedule = useSelector(state => state.schedule[date]);

    const recommendations = useMemo(
        () =>
            Object.entries(mapping ?? {}).map(([key, path]) => {
                const {key: activityKey, type} = parseVideoPath(path);
                const activity = activities[activityKey];
                const schedule = dateSchedule?.find(
                    item => item.key === activityKey,
                );

                return {key, type, activity, schedule};
            }),
        [mapping, activities, dateSchedule],
    );

    // setting the initial selected recommendation
    useEffect(() => {
        setSelectedRecommendation(recommendations?.[1]);
    }, [recommendations]);

    // handling start trial
    const navigation = useNavigation();

    const handleTrainNow = async () => {
        const {type, schedule, activity} = selectedRecommendation;
        const route = getRouteNameFromType(type);

        if (schedule) {
            const params = {
                screen: route,
                params: {
                    scheduleId: schedule.uid,
                    type: schedule.type,
                    id: schedule.key,
                    date,
                },
            };
            navigation.push('Performing', params);
        } else {
            const params = {
                id: activity.key,
            };

            if (route === 'Course') {
                params.viewMode = 'preview';
                params.onAddToCalendarPress = () => {
                    navigation.navigate('CourseVideos', {
                        id: activity.key,
                        type: 'course',
                        viewMode: 'learning',
                    });
                };
            }
            navigation.navigate(route, params);
        }
    };

    return (
        <OnBoardingTemplate
            bottomBar={
                <OnBoardingButton
                    onPress={handleTrainNow}
                    style={styles.actionButton}
                    disabled={!selectedRecommendation}
                    loading={loading}>
                    {CATEGORIES_ACTION_TITLES[selectedRecommendation?.key]}
                </OnBoardingButton>
            }>
            <OnBoardingContainer>
                <OnBoardingTitle text="Ready to train like a pro?" />
                {!Layout.isSmallDevice ? <RecommendationsHeader /> : null}
                {loading ? (
                    <RecommendationCategoriesLoading />
                ) : (
                    <RecommendedCategories
                        categories={recommendations}
                        selectedCategory={selectedRecommendation}
                        onSelect={setSelectedRecommendation}
                    />
                )}
            </OnBoardingContainer>
        </OnBoardingTemplate>
    );
};

export default Recommendations;

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
});
