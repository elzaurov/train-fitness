import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    loadSingleLearningVideo,
    updateStats,
    completeCourse,
    updateStreak,
    updateCurrentCourse,
    loadCurrentCourse,
    removeCurrentCourseProgress,
    addBadge,
    loadBadge,
} from '../../../actions';
import {withMilestones} from '../../../hocs';
import {
    MILESTONE_FINISHED_FIRST_ACTIVITY,
    MILESTONE_FINISHED_FIRST_MIND_ACTIVITY,
    MILESTONE_STARTED_FIRST_ACTIVITY,
    MILESTONE_STARTED_FIRST_MIND_ACTIVITY,
} from '../../../constants';

const CourseHOCWrapper = InnerComponent => {
    class CourseHOC extends Component {
        state = {
            videos: [],
            loading: true,
            isCompleted: false,
            selectedVideo: {},
            playlist: {},
            percentageSeen: 0,
            currentCourse: {},
            oldExperience: 0,
            oldTimeSpent: 0,
            isCourseComplete: false,
            enableFinishButton: false,
            isDidMount: true,
            isHidden: true,
            badge: {},
        };

        async componentDidMount() {
            const {course, assertMilestone} = this.props;
            const currentCourse = await this.props.loadCurrentCourse(
                course.key,
            );

            assertMilestone(
                [
                    MILESTONE_STARTED_FIRST_ACTIVITY,
                    MILESTONE_STARTED_FIRST_MIND_ACTIVITY,
                ],
                {activityType: 'course'},
            );

            const promisesVideosArray = course.videos.map(async videoUrl =>
                this.props.loadSingleLearningVideo(
                    videoUrl.split('/')[0],
                    videoUrl.split('/')[1],
                ),
            );
            const videos = await Promise.all(promisesVideosArray);

            const badge = await this.props.loadBadge(course.badge);

            let playlist = videos.slice(0, currentCourse.nextVideo);
            let oldExperience = 0;
            let oldTimeSpent = 0;

            if (Object.keys(playlist).length > 0) {
                playlist = playlist.map(v => ({
                    [v.key]: {
                        video: v,
                    },
                }));
                playlist = playlist.reduce((acc, obj) => ({...acc, ...obj}));

                oldExperience = Object.values(playlist)
                    .map(e => (e.video.exp ? e.video.exp : 0))
                    .reduce((c1, c2) => c1 + c2);
                oldTimeSpent = Object.values(playlist)
                    .map(e => (e.video.duration ? e.video.duration : 0))
                    .reduce((c1, c2) => c1 + c2);
            } else {
                playlist = {};
            }

            this.setState(
                {
                    loading: false,
                    selectedVideo: videos[0] || {},
                    videos,
                    playlist,
                    currentCourse,
                    oldExperience,
                    oldTimeSpent,
                    badge,
                },
                () => {
                    this.handlePercentageSeen();
                },
            );
        }

        handlePercentageSeen = (afterStateCallback) => {
            const {videos, playlist} = this.state;
            let {isCourseComplete, isDidMount, enableFinishButton} = this.state;
            let percentageSeen = 0;

            const playlistLength = Object.keys(playlist).length;

            if (playlistLength > 0) {
                percentageSeen =
                    (videos.filter(c => Object.keys(playlist).includes(c.key))
                        .length /
                        videos.length) *
                    100;

                enableFinishButton = videos.length - playlistLength <= 1;

                if (isDidMount) {
                    isCourseComplete = percentageSeen === 100;
                    isDidMount = false;
                }
            }

            this.setState({
                percentageSeen,
                isCourseComplete,
                enableFinishButton,
                isHidden: false,
                isDidMount,
            },()=>{
                if(afterStateCallback){
                    afterStateCallback();
                }
            });
        };

        handleSelectVideo = selectedVideo => {
            this.setState({selectedVideo});
        };

        handleCompleteVideo = ({video, reps, sets}, afterStateCallback) => {

            const {course} = this.props;
            const {playlist, currentCourse, videos} = this.state;
            playlist[video.key] = {video, reps, sets};

            this.props
                .updateCurrentCourse(currentCourse, course)
                .then(updatedCurrentCourse => {
                    this.setState({currentCourse: updatedCurrentCourse});
                });

            const nextVideo = videos[videos.indexOf(video) + 1]
                ? videos[videos.indexOf(video) + 1]
                : videos[videos.indexOf(video)];

            this.setState(
                {
                    playlist,
                    selectedVideo: nextVideo,
                },
                () => {
                    this.handlePercentageSeen(afterStateCallback);
                },
            );
        };

        handleRemoveCompleteVideo = () => {};

        handleRemoveCourse = () => {
            const {course} = this.props;
            this.props.removeCurrentCourseProgress(course).then(() => {
                this.props.navigation.navigate('Main', {
                    onGoBack: () => this.refresh(),
                });
            });
        };

        preProcessHandleFinish = () =>{
            const {t} = this.props;
            const {
                playlist,
                videos
            } = this.state;

            const playlistLength = Object.keys(playlist).length;

            if(videos.length - playlistLength <= 1){
                const res = videos.filter(c => !Object.keys(playlist).includes(c.key));
                if(res && res.length>0){
                    const video = res[0];
                    this.handleCompleteVideo({video}, this.handleFinish);
                }else{
                    this.handleFinish();
                }
            }else{
                Alert.alert(
                    t('uncheckedAlert.title'),
                    t('uncheckedAlert.message'),
                    [
                      {
                        text: t('uncheckedAlert.buttons.cancel'),
                        onPress: () => {}
                      },
                      {
                        text: t('uncheckedAlert.buttons.ok'),
                        onPress: () => this.handleFinish(),
                      },
                    ],
                    {cancelable: true},
                  );
            }
        }

        handleFinish = () => {
            const {course, schedule, navigation, assertMilestone, t} = this.props;
            const {
                playlist,
                percentageSeen,
                oldExperience,
                oldTimeSpent,
                badge,
                videos
            } = this.state;

            assertMilestone(
                [
                    MILESTONE_FINISHED_FIRST_ACTIVITY,
                    MILESTONE_FINISHED_FIRST_MIND_ACTIVITY,
                ],
                {activityType: 'course'},
            );

            // Time spent in seconds
            const timeSpent =
                Object.values(playlist)
                    .map(e => (e.video.duration ? e.video.duration : 0))
                    .reduce((c1, c2) => c1 + c2) - oldTimeSpent;

            let experience =
                Object.values(playlist)
                    .map(e => (e.video.exp ? e.video.exp : 0))
                    .reduce((c1, c2) => c1 + c2) - oldExperience;

            // Extra XP after finish the course
            if (percentageSeen === 100) {
                experience += 500;
                this.props.addBadge(course.badge, 'course');
            }

            const stats = {
                exp: experience,
                percentageSeen: percentageSeen.toFixed(0),
                courses: 1,
                metadata: {
                    ...course,
                    url: `/learning/course/${course.key}`,
                    type: 'course',
                },
            };

            this.setState(
                {
                    isCompleted: true,
                },
                () => {
                    Promise.all([
                        this.props.updateStats({action: 'courses', stats}),
                        this.props.completeCourse({
                            schedule,
                            experience,
                            percentageSeen: percentageSeen.toFixed(0),
                            timeSpent,
                            stats: {courses: 1},
                        }),
                        this.props.updateStreak(),
                    ]).then(() => {
                        navigation.push('Performing', {
                            screen: 'RewardMenu',
                            params: {
                                data: {
                                    metadata: {
                                        thumbnail: course.thumbnail,
                                        name: course.name,
                                        url: `/learning/course/${course.key}`,
                                        sizedImages: course.sizedImages,
                                        category: 'Courses',
                                        key: course.key,
                                        time: timeSpent / 60,
                                        experience,
                                    },
                                    schedule: {...schedule},
                                    stats,
                                    badge,
                                },
                            },
                        });
                    });
                },
            );
        };

        render() {
            const {videos, playlist} = this.state;
            const completedVideos = Object.keys(playlist).length;

            return (
                <InnerComponent
                    {...this.props}
                    {...this.state}
                    hasCheckedItems={completedVideos > 0}
                    hasUncheckedItems={completedVideos !== videos.length}
                    onCompleteVideo={this.handleCompleteVideo}
                    onRemoveCompleteVideo={this.handleRemoveCompleteVideo}
                    onSelectVideo={this.handleSelectVideo}
                    onRemoveCourse={this.handleRemoveCourse}
                    onFinish={this.preProcessHandleFinish}
                />
            );
        }
    }

    CourseHOC.propTypes = {
        currentCourse: PropTypes.objectOf(PropTypes.any),
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        schedule: PropTypes.objectOf(PropTypes.any),
        course: PropTypes.objectOf(PropTypes.any).isRequired,
        loadCurrentCourse: PropTypes.func.isRequired,
        loadSingleLearningVideo: PropTypes.func.isRequired,
        loadBadge: PropTypes.func.isRequired,
        updateStats: PropTypes.func.isRequired,
        completeCourse: PropTypes.func.isRequired,
        updateStreak: PropTypes.func.isRequired,
        addBadge: PropTypes.func.isRequired,
        removeCurrentCourseProgress: PropTypes.func.isRequired,
        updateCurrentCourse: PropTypes.func.isRequired,
        assertMilestone: PropTypes.func.isRequired,
    };

    CourseHOC.defaultProps = {
        currentCourse: undefined,
        schedule: undefined,
    };

    return connect(null, {
        loadSingleLearningVideo,
        updateStats,
        completeCourse,
        updateStreak,
        updateCurrentCourse,
        loadCurrentCourse,
        removeCurrentCourseProgress,
        addBadge,
        loadBadge,
    })(withMilestones(CourseHOC));
};

export default CourseHOCWrapper;
