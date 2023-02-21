import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, Easing} from 'react-native';
import {connect} from 'react-redux';
import {Layout} from '../../constants';
import {updateStreak} from '../../actions';

const PlaylistVideoHOCWrapper = InnerComponent => {
    class PlaylistVideoHOC extends Component {
        state = {
            isVideoChecked: false,
            reps: 0,
            sets: 0,
            translateX: new Animated.Value(Layout.window.width),
        };

        componentDidMount() {
            const {video, isChecked} = this.props;

            let reps = 0;
            let sets = 0;

            if (video && video.stats) {
                reps = video.stats.reps;
                sets = video.stats.sets;
            }

            this.setState({
                isVideoChecked: isChecked,
                reps: Number(reps),
                sets: Number(sets),
            });
        }

        handleToggleCheckbox = isVideoChecked => {
            const {video} = this.props;

            this.setState({isVideoChecked}, () => {
                if (isVideoChecked) {
                    Animated.timing(this.state.translateX, {
                        toValue: 0,
                        duration: 300,
                        easing: Easing.linear,
                    }).start();
                } else {
                    this.props.onRemoveCompleteVideo(video.key);
                }
            });
        };

        handleCompleteVideo = () => {
            const {video, type} = this.props;
            const {reps, sets} = this.state;

            this.setState({isVideoChecked: false}, () => {
                Animated.timing(this.state.translateX, {
                    toValue: Layout.window.width,
                    duration: 300,
                    easing: Easing.linear,
                }).start();

                this.props.onCompleteVideo({[type]: video, reps, sets});
                this.props.updateStreak();
            });
        };

        handleUpdateStats = (key, value) => {
            const {stats} = this.props.video;
            const maxValue = stats[key] * 2;
            const item = this.state[key];
            let newValue = item + value;

            if (newValue < 0) {
                newValue = 0;
            } else if (newValue > maxValue) {
                newValue = maxValue;
            }

            this.setState({[key]: newValue});
        };

        render() {
            return (
                <InnerComponent
                    {...this.props}
                    {...this.state}
                    onCompleteVideo={this.handleCompleteVideo}
                    onToggleCheckbox={this.handleToggleCheckbox}
                    onUpdateStats={this.handleUpdateStats}
                />
            );
        }
    }

    PlaylistVideoHOC.propTypes = {
        video: PropTypes.objectOf(PropTypes.any).isRequired,
        isChecked: PropTypes.bool.isRequired,
        onCompleteVideo: PropTypes.func.isRequired,
        onRemoveCompleteVideo: PropTypes.func.isRequired,
        updateStreak: PropTypes.func.isRequired,
    };

    const mapStateToProps = (state, props) => ({
        
      });

    const mapDispatchToProps = {
        updateStreak,
    };

    return connect(mapStateToProps, mapDispatchToProps)(PlaylistVideoHOC);
};

export default PlaylistVideoHOCWrapper;
