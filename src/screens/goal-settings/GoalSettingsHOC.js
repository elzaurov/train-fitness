import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {withNavigation} from '@react-navigation/compat';
import {setGoalSettings} from '../../actions';

const GoalSettingsHOCWrapper = InnerComponent => {
    class GoalSettingsHOC extends Component {
        state = {
            isDisabled: true,
            weeklyGoal: {},
        };

        componentDidMount() {
            const weeklyGoal = {
                days: this.props.trackerScreenInfo?.weeklyProgress?.goal?.days,
                minutes:
                    this.props.trackerScreenInfo?.weeklyProgress?.goal?.minutes,
                hours: this.props.trackerScreenInfo?.weeklyProgress?.goal
                    ?.hours,
            };

            this.setState({weeklyGoal});
        }

        handleSetGoal = (type, value) => {
            const {weeklyGoal} = this.state;
            weeklyGoal[type] = value;
            const enabled = weeklyGoal.days != 0 && (weeklyGoal.minutes != 0 || weeklyGoal.hours != 0);

            this.setState({weeklyGoal, isDisabled: !enabled});
        };

        handleNavigateBack = () => {
            const day =
                this.props.trackerScreenInfo?.weeklyProgress?.daily?.find(
                    x => x.id === 1,
                )?.date;
            this.props.setGoalSettings(day, this.state.weeklyGoal);
            this.props.navigation.goBack();
        };

        handleOptionsPress = () => {
            this.props.navigation.navigate('Guide');
        };

        render() {
            return (
                <InnerComponent
                    isDisabled={this.state.isDisabled}
                    handleSetGoal={this.handleSetGoal}
                    handleNavigateBack={this.handleNavigateBack}
                    handleOptionsPress={this.handleOptionsPress}
                    goal={{
                        days: this.state.weeklyGoal?.days || 0,
                        minutes: this.state.weeklyGoal?.minutes || 0,
                        hours: this.state.weeklyGoal?.hours || 0,
                    }}
                    goalsDayTitle={this.props.t('goalsDayTitle')}
                    goalsDaySubtitle={this.props.t('goalsDaySubtitle')}
                    goalsWeekTitle={this.props.t('goalsWeekTitle')}
                    goalsWeekSubtitle={this.props.t('goalsWeekSubtitle')}
                />
            );
        }
    }

    const mapStateToProps = ({trackerScreenInfo}) => ({
        trackerScreenInfo,
    });

    const mapDispatchToProps = {
        setGoalSettings,
    };

    GoalSettingsHOC.propTypes = {
        setGoalSettings: PropTypes.func.isRequired,
        trackerScreenInfo: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
        t: PropTypes.func.isRequired,
    };

    const translatedGoalSettingsHOC = withTranslation('goalSettings')(
        connect(
            mapStateToProps,
            mapDispatchToProps,
        )(withNavigation(GoalSettingsHOC)),
    );
    return translatedGoalSettingsHOC;
};

export default GoalSettingsHOCWrapper;
