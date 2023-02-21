import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    completeCrossTraining,
    updateStats,
    updateStreak,
} from '../../../actions';
import {CROSS_TRAINING_MAPPING, TEAM_MAPPING} from '../../../constants';

const CrossTrainingEvaluationHOCWrapper = InnerComponent => {
    class CrossTrainingEvaluationHOC extends Component {
        state = {
            minutes: 60,
            rating: 0,
            submitting: false,
        };

        handleStarRatingPress = rating => {
            this.setState({rating});
        };

        handleMinutesChange = minutesStr => {
            let minutes = Number(minutesStr);

            if (Number.isNaN(minutes) || minutes < 0) {
                minutes = 0;
            }

            this.setState({minutes: minutes > 240 ? 240 : minutes});
        };

        handleComplete = () => {
            const {crossTraining, navigation, type} = this.props;
            const {rating, minutes} = this.state;
            const {name, thumbnail, url, sizedImages} = crossTraining;
            const experience = this.calculateCrossTrainingExp();
            const mappings = {
                team: TEAM_MAPPING,
                'cross-training': CROSS_TRAINING_MAPPING,
            };
            const mapping = mappings[type];
            const key = mapping[name] || name.replace(/ /g, '').toLowerCase();
            const stats = {
                exp: experience,
                [key]: 1,
                metadata: {
                    ...crossTraining,
                    key: crossTraining.id,
                },
            };

            this.setState({submitting: true, experience}, () => {
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
                                    ...crossTraining,
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
            const {rating, minutes} = this.state;
            const baseScore = 400;
            const ratingScore = 0.85 + rating * 0.05;
            let durationScore = Number(minutes) / 50;

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
                    onComplete={this.handleComplete}
                    onMinutesChange={this.handleMinutesChange}
                    onStarRatingPress={this.handleStarRatingPress}
                />
            );
        }
    }

    CrossTrainingEvaluationHOC.propTypes = {
        crossTraining: PropTypes.objectOf(PropTypes.any).isRequired,
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        type: PropTypes.string.isRequired,
        completeCrossTraining: PropTypes.func.isRequired,
        updateStats: PropTypes.func.isRequired,
        updateStreak: PropTypes.func.isRequired,
    };

    return connect(null, {
        completeCrossTraining,
        updateStats,
        updateStreak,
    })(CrossTrainingEvaluationHOC);
};

export default CrossTrainingEvaluationHOCWrapper;
