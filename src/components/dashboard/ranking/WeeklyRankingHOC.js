import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import {loadWeeklyRanking} from '../../../actions';

const WeeklyRankingHOCWrapper = InnerComponent => {
    class WeeklyRankingHOC extends Component {
        state = {
            loading: true,
            currentStartOfWeek: moment().startOf('isoWeek'),
            isCurrentMonth: true,
        };

        async componentDidMount() {
            const startOfWeek = moment().startOf('isoWeek');

            await this.props.loadWeeklyRanking(startOfWeek.valueOf());

            this.setState({loading: false});
        }

        handleChangeWeek = value => {
            const {currentStartOfWeek} = this.state;
            const startOfWeek = moment().startOf('isoWeek');
            const newWeek = moment(currentStartOfWeek)
                .add(value, 'week')
                .startOf('isoWeek');

            if (newWeek <= startOfWeek) {
                this.setState(
                    {
                        loading: true,
                        currentStartOfWeek: newWeek,
                        isCurrentMonth: newWeek === startOfWeek,
                    },
                    () => {
                        this.props
                            .loadWeeklyRanking(newWeek.valueOf())
                            .then(() => {
                                this.setState({loading: false});
                            });
                    },
                );
            }
        };

        render() {
            const {currentStartOfWeek} = this.state;
            const {profile, weeklyRanking} = this.props;
            const userRanking = weeklyRanking.filter(
                ({uid}) => uid === profile.uid,
            )[0];
            const start = moment(currentStartOfWeek).format('DD/MM/YYYY');
            const end = moment(currentStartOfWeek)
                .endOf('isoWeek')
                .format('DD/MM/YYYY');
            const weekLabel = `${start} to ${end}`;

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    weekLabel={weekLabel}
                    weeklyRanking={weeklyRanking.slice(0, 50)}
                    userRanking={
                        userRanking || {uid: profile.uid, experience: 0}
                    }
                    onChangeWeek={this.handleChangeWeek}
                />
            );
        }
    }

    WeeklyRankingHOC.propTypes = {
        profile: PropTypes.objectOf(PropTypes.any).isRequired,
        weeklyRanking: PropTypes.arrayOf(PropTypes.object).isRequired,
        loadWeeklyRanking: PropTypes.func.isRequired,
    };

    function mapStateToProps({profile, weeklyRanking}) {
        return {profile, weeklyRanking};
    }

    return connect(mapStateToProps, {
        loadWeeklyRanking,
    })(WeeklyRankingHOC);
};

export default WeeklyRankingHOCWrapper;
