import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    setDailyGoal,
    setDefaultDailyGoal,
    setGoalSettings,
} from '../../../actions';

const SetDailyGoalHOCWrapper = InnerComponent => {
    class SetDailyGoalHOC extends Component {
        state = {
            submitting: false,
            weeklyGoal: {
                minutes: 0,
                hours: 0,
                days: 0,
            },
            isDisabled: true,
        };

        handleSetGoal = async (type, value) => {
            const {weeklyGoal} = this.state;
            weeklyGoal[type] = value;

            const enabled = weeklyGoal.days != 0 && (weeklyGoal.minutes != 0 || weeklyGoal.hours != 0);

            this.setState({ weeklyGoal, isDisabled: !enabled });
        };

        handleNavigateBack = async () => {
            const {weeklyGoal} = this.state;
            const {minutes, hours} = weeklyGoal;
            const dailyGoal = hours * 60 + minutes;

            const d = new Date();
            let month = `${d.getMonth() + 1}`;
            let day = `${d.getDate()}`;
            const year = d.getFullYear();

            if (month.length < 2) month = `0${month}`;
            if (day.length < 2) day = `0${day}`;

            const date = new Date([year, month, day].join('-'));

            const monday =
                date.getDate() - (date.getDay() === 0 ? 7 : date.getDay()) + 1;

            const mondayDate = [monday, month, day].join('-');

            await Promise.all([
                this.props.setDailyGoal({
                    date: mondayDate,
                    dailyGoal,
                }),
                this.props.setDefaultDailyGoal(dailyGoal),
                this.props.setGoalSettings(date, weeklyGoal),
            ]);
        };

        setGoalFrGuideScreen = (goal) => {
            this.setState({weeklyGoal: goal})
        }

        handleOptionsPress = () => {
            this.props.navigation.setParams({setGoalFrGuideScreen:this.setGoalFrGuideScreen})
            this.props.navigation.navigate('Guide');
        };

        render() {
            const {weeklyGoal} = this.state;
            const {days, hours, minutes} = weeklyGoal;
            const isDisabled = days === 0 || (hours === 0 && minutes === 0);

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    isDisabled={isDisabled}
                    handleSetGoal={this.handleSetGoal}
                    handleNavigateBack={this.handleNavigateBack}
                    goal={this.state.weeklyGoal}
                    handleOptionsPress={this.handleOptionsPress}
                    goalsDayTitle="How long will you train per day?"
                    goalsDaySubtitle="Select the right time for you"
                    goalsWeekTitle="How often will you train per week?"
                    goalsWeekSubtitle="You can choose from 1 to 7 days"
                />
            );
        }
    }

    SetDailyGoalHOC.propTypes = {
        show: PropTypes.bool,
        setDailyGoal: PropTypes.func.isRequired,
        setDefaultDailyGoal: PropTypes.func.isRequired,
        setGoalSettings: PropTypes.func.isRequired,
        selectedDate: PropTypes.string,
        dailyGoal: PropTypes.object,
        onSetGoal: PropTypes.func,
    };

    SetDailyGoalHOC.defaultProps = {
        show: false,
        selectedDate: null,
        dailyGoal: null,
        onSetGoal: null,
    };

    const mapDispatchToProps = {
        setDailyGoal,
        setDefaultDailyGoal,
        setGoalSettings,
    };

    const mapStateToProps = state => ({
        trackerScreenInfo: state.trackerScreenInfo,
    });

    return connect(mapStateToProps, mapDispatchToProps)(SetDailyGoalHOC);
};

export default SetDailyGoalHOCWrapper;
