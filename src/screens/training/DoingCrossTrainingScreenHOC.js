import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {loadCrossTraining} from '../../actions';
import {DATE_FORMAT, FINISH_IN_PAST_MAX_DAYS} from '../../constants';

const DoingCrossTrainingScreenHOCWrapper = InnerComponent => {
    class DoingCrossTrainingScreenHOC extends Component {
        static navigationOptions = {
            header: () => null,
        };

        state = {
            canStart: false,
            loading: true,
            activity: {},
        };

        async componentDidMount() {
            const {id, date, scheduleId, type} = this.props.route.params ?? {};

            const activity = await this.props.loadCrossTraining({
                type,
                id,
                date,
                scheduleId,
            });

            const canStart =
                moment(date, DATE_FORMAT).isSameOrBefore(moment()) &&
                moment().diff(moment(date, DATE_FORMAT), 'days') <
                    FINISH_IN_PAST_MAX_DAYS;

            const scheduledDate = moment(date);

            this.setState({
                activity,
                loading: false,
                date,
                canStart,
                scheduledDate,
            });
        }

        handleGoBackToTracker = () => {
            this.props.navigation.goBack();
        };

        handleFinishActivity = duration => {
            const {navigation} = this.props;
            const {activity} = this.state;

            navigation.navigate('CrossTrainingEvaluation', {
                activity,
                duration,
            });
        };

        render() {
            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    onFinishActivity={this.handleFinishActivity}
                    onGoBackToTracker={this.handleGoBackToTracker}
                />
            );
        }
    }

    DoingCrossTrainingScreenHOC.propTypes = {
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        route: PropTypes.object.isRequired,
        loadCrossTraining: PropTypes.func.isRequired,
    };

    function mapStateToProps({workouts}) {
        return {workouts};
    }

    return connect(mapStateToProps, {
        loadCrossTraining,
    })(DoingCrossTrainingScreenHOC);
};

export default DoingCrossTrainingScreenHOCWrapper;
