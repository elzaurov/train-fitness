import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {HeaderProgress} from '../../layout';
import {analytics} from '../../config';
import {COMPLETE_CALENDAR_ITEM_EVENT} from '../../constants';
import {setDailyGoal, setDefaultDailyGoal} from '../../actions';

const RewardMenuScreenHOCWrapper = InnerComponent => {
    class RewardMenuScreenHOC extends Component {
        static navigationOptions = {
            header: props => {
                return (
                    <HeaderProgress
                        {...props}
                        title="REWARD"
                        disableBackButton
                    />
                );
            },
        };

        state = {
            metadata: {},
            noteId: undefined,
            schedule: {},
            stats: {},
            badge: {},
            loading: true,
        };

        async componentDidMount() {
            const {metadata, schedule, stats, badge} =
                this.props.route.params?.data ?? {};

            const {id, key, name, type, date, uid, time, rating} =
                schedule || {};
            const eventParams = {
                item_id: id || key,
                item_name: name,
                item_type: type,
                schedule_id: uid,
                date,
                experience: stats.exp,
                percentageSeen: stats.percentageSeen,
                badge,
                ...(time ? {time} : {}),
                ...(rating ? {rating} : {}),
            };

            if (schedule) {
                analytics.logEvent(COMPLETE_CALENDAR_ITEM_EVENT, eventParams);
            }

            const {dailyGoal} = this.props;

            if (date && !dailyGoal.days[date]) {
                const {default: defaultDailyGoal} = dailyGoal;

                await Promise.all([
                    this.props.setDailyGoal({
                        dailyGoal: defaultDailyGoal,
                        date,
                    }),
                    this.props.setDefaultDailyGoal(defaultDailyGoal),
                ]);
            }

            this.setState({
                metadata,
                schedule,
                stats,
                badge,
                loading: false,
            });
        }

        handleWriteNote = noteId => {
            this.setState({noteId});
        };

        navigateAfterDone = () => {
            const {metadata} = this.props.route.params?.data ?? {};

            // TODO: metadata.navigateAfterDone is always undefined,
            // understand why it's not passed with all other metadata
            if (metadata?.navigateAfterDone) {
                metadata?.navigateAfterDone();
            } else {
                this.props.navigation.replace('Main', {
                    // navigate
                    screen: 'Progress',
                });
            }
        };

        render() {
            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    onWriteNote={this.handleWriteNote}
                    navigateAfterDone={this.navigateAfterDone}
                />
            );
        }
    }

    RewardMenuScreenHOC.propTypes = {
        route: PropTypes.object.isRequired,
        dailyGoal: PropTypes.shape({
            default: PropTypes.number,
            days: PropTypes.object,
        }).isRequired,
        setDailyGoal: PropTypes.func.isRequired,
        setDefaultDailyGoal: PropTypes.func.isRequired,
    };

    function mapStateToProps({gamification, profile, dailyGoal}) {
        return {gamification, profile, dailyGoal};
    }

    return connect(mapStateToProps, {
        setDailyGoal,
        setDefaultDailyGoal,
    })(RewardMenuScreenHOC);
};

export default RewardMenuScreenHOCWrapper;
