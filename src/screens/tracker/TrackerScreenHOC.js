import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import moment from 'moment-timezone';
import {withTranslation} from 'react-i18next';
import {
    loadSchedule,
    upgradeSchedule,
    loadDailyGoal,
    loadDefaultDailyGoal,
    upgradeDailyGoal,
    removeScheduleItem,
    removeStats,
    toggleWatchDate,
    toggleWatchWeek,
    toggleWatchMonth,
    UPGRADING_SCHEDULE,
    updateStreak,
} from '../../actions';
import {
    DATE_FORMAT,
    LOAD_DAYS_MARGIN,
    ANALYTICS_TRACKER_OPENED,
} from '../../constants';
import {logEvent} from '../../utils';

const TrackerScreenHOCWrapper = InnerComponent => {
    class TrackerScreenHOC extends Component {
        state = {
            selectedDate: moment().format(DATE_FORMAT),
            selectedMonth: moment().format('YYYY-MM'),
            startDate: moment()
                .subtract(LOAD_DAYS_MARGIN, 'd')
                .format(DATE_FORMAT),
            endDate: moment().add(LOAD_DAYS_MARGIN, 'd').format(DATE_FORMAT),
            modalVisible: false,
            isLoading: false,
            showAskReview: false,
        };

        async componentDidMount() {
            const {navigation} = this.props;
            const {selectedDate} = this.state;

            logEvent(ANALYTICS_TRACKER_OPENED);

            this.setState({
                isLoading: true,
            });

            await Promise.all([
                this.props.loadDefaultDailyGoal(),
                // this.props.loadWeeklyProgress(),
                this.props.toggleWatchDate('start'),
                this.props.toggleWatchWeek('start', selectedDate),
            ]);

            this.setState({
                isLoading: false,
            });

            // running the upgrade schedule scripts in the background
            this.props.toggleWatchMonth('start');
            this.props.upgradeSchedule();
            this.props.upgradeDailyGoal();

            setTimeout(() => this.setState({isUpgrading: false}), 5000);

            // navigate to the specified date
            const targetActivity = this.props.route.params?.activity ?? null;

            if (targetActivity) {
                await this.setState({
                    selectedDate: moment(targetActivity.date).format(
                        DATE_FORMAT,
                    ),
                    showAskReview: true, // ask user reivew if available
                });

                navigation.setParams({activity: null});
            }

            // if returning from the activity finish page, try to ask for review
            const activityFinished = this.props.route.params?.activityFinished;

            if (activityFinished === true) {
                this.setState({showAskReview: true});
                navigation.setParams({activityFinished: false});
            }
        }

        handleDateChange = async direction => {
            const currentDate = this.state.selectedDate;
            const tomorrowsDate = moment(currentDate)
                .add(1, 'd')
                .format(DATE_FORMAT);
            const yesterdaysDate = moment(currentDate)
                .subtract(1, 'd')
                .format(DATE_FORMAT);

            const nextDate =
                direction === 'left' ? yesterdaysDate : tomorrowsDate;
            this.setState({selectedDate: nextDate, isLoading: true});
            await this.props.toggleWatchDate('start', nextDate);

            // Note >> we need to cache this dates and stop them when TrackerScreen is getting unmounted or the is getting closed
            // await this.props.toggleWatchDate('stop', currentDate);

            this.setState({isLoading: false});
        };

        handleChangeCalendarMonth = async month => {
            if (month && month !== this.state.selectedMonth) {
                this.setState({selectedMonth: month});
                await this.props.toggleWatchMonth('once', month);
            }
        };

        handlePressCalendarDate = async date => {
            this.setState({selectedDate: date, isLoading: true});
            await this.props.toggleWatchDate('start', date);
            this.setState({isLoading: false});
        };

        handleGoalTimeChange = time => {
            this.setState({
                goalTime: time,
            });
        };

        handleSetGoal = () => {
            this.setState({
                modalVisible: false,
            });
        };

        handleEditDailyGoal = () => {
            this.setState({
                modalVisible: true,
            });
        };

        handleCancelEditDailyGoal = () => {
            this.setState({
                modalVisible: false,
            });
        };

        handleDeleteTrainingPress = (
            completed,
            scheduleId,
            stats,
            experience,
        ) => {
            const {t} = this.props;
            Alert.alert(t('alert.title'), t('alert.message'), [
                {text: t('alert.buttons.cancel'), onPress: () => {}},
                {
                    text: t('alert.buttons.ok'),
                    onPress: () =>
                        this.removeActivity(scheduleId, stats, experience),
                },
            ]);
        };

        loadScheduleData = async () => {
            const {startDate, endDate} = this.state;

            await this.setState({isLoading: true});

            await Promise.all([
                this.props.loadSchedule({startDate, endDate}),
                this.props.loadDailyGoal({startDate, endDate}),
            ]);

            await this.setState({isLoading: false});
        };

        removeActivity = async (scheduleId, stats, experience) => {
            await this.props.removeScheduleItem({
                date: this.state.selectedDate,
                scheduleId,
            });

            if (stats) {
                await this.props.removeStats({
                    stats: {...stats, exp: experience},
                });
            }
        };

        handleTrainingPress = (type, key, scheduleId) => {
            let screen = type
                ?.replace(/(^|-)(\w)/g, c => c.toUpperCase())
                ?.replace(/-/g, '');

            if (type === 'team') {
                screen = 'CrossTraining';
            }

            const navigationParams = {
                id: key,
                type,
                canStart: true,
                date: this.state.selectedDate,
                scheduleId,
            };
            if (screen === 'Course') {
                navigationParams.viewMode = 'learning';
            }

            this.props.navigation.navigate('Performing', {
                screen,
                params: navigationParams,
            });
        };

        render() {
            return (
                <>
                    <InnerComponent
                        {...this.state}
                        {...this.props}
                        monthlyProgress={
                            this.props?.trackerScreenInfo?.monthlyProgress[
                                this.state.selectedMonth
                            ] ?? []
                        }
                        dailyProgress={
                            this.props?.trackerScreenInfo[
                                this.state.selectedDate
                            ] ?? null
                        }
                        weeklyProgress={
                            this.props?.trackerScreenInfo?.weeklyProgress ??
                            null
                        }
                        onDateChange={this.handleDateChange}
                        onPressCalendarArrows={this.handleChangeCalendarMonth}
                        onPressCalendarDate={this.handlePressCalendarDate}
                        onGoalTimeChange={this.handleGoalTimeChange}
                        onSetGoal={this.handleSetGoal}
                        onEditPress={this.handleEditDailyGoal}
                        onCancel={this.handleCancelEditDailyGoal}
                        onRemoveSchedule={this.handleRemoveActivity}
                        isUpgrading={this.props.waiters.includes(
                            UPGRADING_SCHEDULE,
                        )}
                        handleTrainingPress={this.handleTrainingPress}
                        handleDeleteTrainingPress={
                            this.handleDeleteTrainingPress
                        }
                    />
                </>
            );
        }
    }

    const mapStateToProps = ({
        schedule,
        dailyGoal,
        waiters,
        profile,
        remoteConfigs,
        onBoarding,
        trackerScreenInfo,
    }) => ({
        schedule,
        dailyGoal,
        waiters,
        profile,
        remoteConfigs,
        onBoarding,
        trackerScreenInfo,
    });

    const mapDispatchToProps = {
        loadSchedule,
        loadDailyGoal,
        loadDefaultDailyGoal,
        removeScheduleItem,
        removeStats,
        toggleWatchDate,
        toggleWatchWeek,
        toggleWatchMonth,
        // upgrading legacy schedule
        upgradeSchedule,
        upgradeDailyGoal,
        updateStreak,
    };

    TrackerScreenHOC.propTypes = {
        navigation: PropTypes.object.isRequired,
        route: PropTypes.object.isRequired,
        dailyGoal: PropTypes.shape({
            default: PropTypes.number,
            days: PropTypes.object,
        }),
        schedule: PropTypes.object,
        loadDailyGoal: PropTypes.func.isRequired,
        loadDefaultDailyGoal: PropTypes.func.isRequired,
        upgradeDailyGoal: PropTypes.func.isRequired,
        loadSchedule: PropTypes.func.isRequired,
        toggleWatchDate: PropTypes.func.isRequired,
        toggleWatchWeek: PropTypes.func.isRequired,
        toggleWatchMonth: PropTypes.func.isRequired,
        upgradeSchedule: PropTypes.func.isRequired,
        removeScheduleItem: PropTypes.func.isRequired,
        removeStats: PropTypes.func.isRequired,
        waiters: PropTypes.array,
        profile: PropTypes.object.isRequired,
        onBoarding: PropTypes.object.isRequired,
        trackerScreenInfo: PropTypes.object.isRequired,
        updateStreak: PropTypes.func.isRequired,
    };

    TrackerScreenHOC.defaultProps = {
        dailyGoal: null,
        schedule: null,
        waiters: [],
    };

    const translatedTrackerScreenHOC = withTranslation('trackerScreen')(
        connect(mapStateToProps, mapDispatchToProps)(TrackerScreenHOC),
    );

    // chaining the navigation options
    translatedTrackerScreenHOC.navigationOptions =
        TrackerScreenHOC.navigationOptions;

    return translatedTrackerScreenHOC;
};

export default TrackerScreenHOCWrapper;
