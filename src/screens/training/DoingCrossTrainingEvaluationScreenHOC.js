import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {HeaderProgress} from '../../layout';
import {
    updateStats,
    completeScheduleItem,
    completeCrossTraining,
    updateStreak,
} from '../../actions';
import {CROSS_TRAINING_MAPPING, TEAM_MAPPING} from '../../constants';

const DoingCrossTrainingEvaluationScreenHOCWrapper = InnerComponent => {
    class DoingCrossTrainingEvaluationScreenHOC extends PureComponent {
        static navigationOptions = {
            header: props => (
                <HeaderProgress
                    {...props}
                    title="CROSS TRAIN"
                    disableBackButton
                />
            ),
        };

        state = {
            loading: true,
            activity: {},
            submitting: false,
            rating: 0,
        };

        async componentDidMount() {
            const {activity, timestamp, duration, type} =
                this.props.route.params ?? {};

            this.setState({
                activity,
                timestamp,
                duration,
                type,
                loading: false,
                submitting: false,
            });
        }

        handleStarRatingPress = rating => {
            this.setState({rating});
        };

        handleDurationChange = duration => {
            Number.isNaN(duration)
                ? this.setState({duration: 0})
                : this.setState({duration});
        };

        handleFinishActivity = mins => {
            const {activity, rating, duration} = this.state;
            const {navigation} = this.props;

            const minutes = Math.floor(duration / 60000);

            const {name, thumbnail, url, sizedImages} = activity;
            const experience = this.calculateCrossTrainingExp();

            const mappings = {
                team: TEAM_MAPPING,
                'cross-training': CROSS_TRAINING_MAPPING,
            };

            // We have 2 types: (This shloud come from a props)
            // cross-training
            // team
            const type = 'cross-training';

            const mapping = mappings[type];

            const key = mapping[name] || name.replace(/ /g, '').toLowerCase();
            const stats = {
                exp: experience,
                [key]: 1,
                metadata: {
                    ...activity,
                    key: activity.id,
                },
            };

            this.setState({submitting: true}, () => {
                Promise.all([
                    this.props.updateStats({action: type, stats}),
                    this.props.completeCrossTraining({
                        stats: {[key]: 1},
                        rating,
                        minutes,
                        experience,
                    }),
                    this.props.updateStreak(),
                ]).then(() => {
                    this.setState({submitting: false}, () => {
                        navigation.push('RewardMenu', {
                            data: {
                                stats,
                                schedule: {
                                    ...activity,
                                    rating,
                                    time: Number(minutes) * 60,
                                },
                                metadata: {
                                    rating,
                                    thumbnail,
                                    name,
                                    url,
                                    sizedImages,
                                    time: minutes,
                                    experience,
                                    category: 'Cross Trainings',
                                },
                            },
                        });
                    });
                });
            });
        };

        calculateCrossTrainingExp() {
            const {rating, duration} = this.state;
            const baseScore = 400;
            const ratingScore = 0.85 + rating * 0.05;
            let durationScore = Math.floor(duration / 1000) / 50;

            if (durationScore < 0.3) {
                durationScore = 0.3;
            } else if (durationScore > 1.9) {
                durationScore = 1.9;
            }

            const earnedExp = baseScore * ((ratingScore + durationScore) / 2);
            return Math.round(earnedExp);
        }

        render() {
            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    onStarRatingPress={this.handleStarRatingPress}
                    onFinishActivity={this.handleFinishActivity}
                    onChangeDuration={this.handleDurationChange}
                    duration={this.state.duration}
                />
            );
        }
    }

    DoingCrossTrainingEvaluationScreenHOC.propTypes = {
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        route: PropTypes.objectOf(PropTypes.any).isRequired,
        updateStats: PropTypes.func.isRequired,
        completeCrossTraining: PropTypes.func.isRequired,
        completeScheduleItem: PropTypes.func.isRequired,
        updateStreak: PropTypes.func.isRequired,
    };

    const mapStateToProps = state => ({
        userRole: state.userRole,
        profile: state.profile,
        remoteConfigs: state.remoteConfigs,
        schedule: state.schedule,
        isBrowseHome: state.remoteConfigs.ux_browse_home,
    });

    return connect(mapStateToProps, {
        updateStats,
        completeScheduleItem,
        completeCrossTraining,
        updateStreak,
    })(DoingCrossTrainingEvaluationScreenHOC);
};

export default DoingCrossTrainingEvaluationScreenHOCWrapper;
