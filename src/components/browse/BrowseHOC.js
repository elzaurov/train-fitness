import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/compat';
import {getCatalog, updateStreak} from '../../actions';
import {parseVideoPath, getRouteNameFromType, sumStats} from '../../utils';

const BrowseHOCWrapper = InnerComponent => {
    class BrowseHOC extends Component {
        state = {
            loading: true,
        };

        async componentDidMount() {
            this.setState({loading: true});

            try {
                await this.props.getCatalog();
            } finally {
                this.setState({loading: false});
            }
        }

        calculateStats = exercises => {
            const totalStats = {};

            for (const key in exercises) {
                const {stats} = exercises[key];
                const totalReps = stats.reps * stats.sets || 0;
                sumStats(totalStats, stats, totalReps);
            }

            if (!totalStats.exp) {
                totalStats.exp = 0;
            }

            delete totalStats.reps;
            delete totalStats.sets;

            return totalStats;
        };

        handleCompleteExercise = async (item, timeSpent) => {
            const {navigation, exercises, updateStreak} = this.props;
            await updateStreak();

            navigation.push('WorkoutEvaluation', {
                duration: timeSpent,
                individually: true,
                onFinishActivity: async duration => {
                    const {navigation} = this.props;
                    const {key} = item.rtdb;
                    const exercise = exercises[key];

                    const seconds = Math.floor(duration / 1000);
                    const minutes = seconds / 60;

                    const stats = this.calculateStats({key: exercise});

                    navigation.push('RewardMenu', {
                        data: {
                            stats,
                            metadata: {
                                key,
                                name: exercise.name,
                                thumbnail: exercise.thumbnail,
                                sizedImages: exercise.sizedImages,
                                url: null,
                                navigateAfterDone: () =>
                                    navigation.replace('Main', {
                                        screen: 'train', //Changed as name change from training to train now 
                                    }),
                                category: 'Exercises',
                                time: minutes,
                                experience: stats.exp,
                            },
                        },
                    });
                },
            });
        };

        handleSelect = item => {
            const {type, key} = parseVideoPath(item.rtdb.path);
            const route = getRouteNameFromType(type);

            let videoPath = null;

            if (type === 'classroom') {
                videoPath = 'classroom';
            } else if (type === 'gamebrain') {
                videoPath = 'game-brain';
            }

            const {navigation} = this.props;
            if (route === 'Exercise') {
                navigation.navigate('Performing', {
                    screen: route,
                    params: {
                        id: key,
                        videoPath,
                        name: item.title,
                        canStart: true,
                        onCompleteExercise: duration =>
                            this.handleCompleteExercise(item, duration),
                    },
                });
            } else {
                navigation.push(route, {
                    id: key,
                    videoPath,
                    name: item.title,
                    canStart: true,
                });
            }
        };

        handleSeeAllPress = sectionId => {
            const {navigation} = this.props;
            navigation.push('Collection', {id: sectionId});
        };

        render() {
            return (
                <InnerComponent
                    {...this.props}
                    {...this.state}
                    onSelect={this.handleSelect}
                    onSeeAllPress={this.handleSeeAllPress}
                />
            );
        }
    }

    BrowseHOC.propTypes = {
        exercises: PropTypes.object,
        getCatalog: PropTypes.func.isRequired,
        updateStreak: PropTypes.func.isRequired,
        navigation: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };

    BrowseHOC.defaultProps = {
        exercises: [],
    };

    const mapStateToProps = state => ({
        catalog: state.catalog,
        exercises: state.exercises,
    });

    const mapDispatchToProps = {
        getCatalog,
        updateStreak,
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(withNavigation(BrowseHOC));
};

export default BrowseHOCWrapper;
