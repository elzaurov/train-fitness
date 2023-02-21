import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {withNavigation} from '@react-navigation/compat';
import {setGoalSettings} from '../../actions';

const GuideHOCWrapper = InnerComponent => {
    class GuideHOC extends Component {
        static navigationOptions = {
            header: () => null,
        };

        handleNavigateBack = () => {
            // update goal settings
            this.props.navigation.navigate('GoalSettings');
        };

        handleSetGuideData = guideData => {
            let minutes;
            const {daysText, hoursText} = guideData;
            const {getState} = this.props.navigation;

            const hasMinutes = hoursText % 1 !== 0;
            const getMinutes = (hoursText % 1) * 60;
            hasMinutes ? (minutes = getMinutes) : null;

            const flooredHours = Math.floor(hoursText)?.toString();

            var d = new Date(date);
            var n = d.getDay();
            (month = '' + (d.getMonth() + 1)),
                (day = '' + d.getDate()),
                (year = d.getFullYear());

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            const date = [year, month, day].join('-');

            const guide = {
                days: daysText,
                hours: minutes ? flooredHours : hoursText,
                minutes: minutes?.toString() ?? '0',
            };

            this.props.setGoalSettings(date, guide);

            this.props.navigation.navigate('Tracker');
            if (getState().routes[0].params) {
                const {setGoalFrGuideScreen} = getState().routes[0]?.params;
                setGoalFrGuideScreen(guide)
            }else{
                const day =
                this.props.trackerScreenInfo?.weeklyProgress?.daily?.find(
                    x => x.id === 1,
                )?.date;
                this.props.setGoalSettings(day, guide);
            }
            this.props.navigation.navigate('Tracker');
        };

        render() {
            return (
                <InnerComponent
                    handleNavigateBack={this.handleNavigateBack}
                    handleSetGuideData={this.handleSetGuideData}
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

    GuideHOC.propTypes = {
        navigation: PropTypes.object.isRequired,
        trackerScreenInfo: PropTypes.object.isRequired,
        setGoalSettings: PropTypes.func.isRequired,
    };

    // return GuideHOC;

    const translatedGuideHOC = withTranslation('guide')(
        connect(mapStateToProps, mapDispatchToProps)(withNavigation(GuideHOC)),
    );
    return translatedGuideHOC;
};

export default GuideHOCWrapper;
