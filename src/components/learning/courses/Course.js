/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AddToCalendarButton, Completed} from '../../common';
import {RegularText, TabView} from '../../layout';
import {ActivityVideo} from '../../player';
import {VideoLoading} from '../../loading';
import {Colors, Layout} from '../../../constants';
import VideoDetails from './VideoDetails';
import CourseVideoList from './CourseVideoList';
import CourseDetails from './CourseDetails';
import CourseHOC from './CourseHOC';
import Progress from './Progress';

const Course = ({
    videos,
    hasCheckedItems,
    hasUncheckedItems,
    loading,
    playlist,
    percentageSeen,
    schedule,
    selectedVideo,
    course,
    badge,
    isCompleted,
    isCourseComplete,
    enableFinishButton,
    isHidden,
    onRemoveCourse,
    onAddToCalendarPress,
    onCompleteVideo,
    onRemoveCompleteVideo,
    onSelectVideo,
    onFinish,
    t,
}) => {
    const fullscreen = useSelector(state => state.android_player.fullscreen);
    const [isVideoPaused, setIsVideoPaused] = useState(false);
    const toggleIsVideoPaused = paused => {
        setIsVideoPaused(paused);
    };
    return (
        <SafeAreaView
            edges={fullscreen ? ['top'] : ['bottom']}
            style={styles.container}>
            {loading || isCompleted ? (
                <VideoLoading />
            ) : (
                <ActivityVideo
                    activity={selectedVideo}
                    toggleIsVideoPaused={toggleIsVideoPaused}
                    paused={isVideoPaused}
                />
            )}
            {onAddToCalendarPress &&
                !schedule &&
                !isCourseComplete &&
                !isHidden &&
                !fullscreen && (
                    <AddToCalendarButton
                        onAddToCalendarPress={onAddToCalendarPress}
                    />
                )}
            {isCourseComplete && !isHidden && !fullscreen && <Completed />}
            {!fullscreen && (
                <TabView
                    routes={[
                        {key: 'videos', title: t('videos')},
                        {key: 'details', title: t('details')},
                        {key: 'overview', title: t('overview')},
                    ]}
                    style={{flex: 1}}
                    renderScene={({route}) => {
                        switch (route.key) {
                            case 'videos':
                                return loading ? (
                                    <RegularText style={styles.loading}>
                                        {t('loading')}
                                    </RegularText>
                                ) : (
                                    <CourseVideoList
                                        hasSchedule={
                                            !!schedule && !schedule.completed
                                        }
                                        videos={videos}
                                        selectedVideoKey={selectedVideo.key}
                                        playlist={playlist}
                                        onCompleteVideo={onCompleteVideo}
                                        onRemoveCompleteVideo={
                                            onRemoveCompleteVideo
                                        }
                                        onSelectVideo={onSelectVideo}
                                    />
                                );
                            case 'details':
                                return loading ? (
                                    <RegularText style={styles.loading}>
                                        {t('loading')}
                                    </RegularText>
                                ) : (
                                    <VideoDetails
                                        video={selectedVideo}
                                        categoryType={course.screen}
                                    />
                                );
                            case 'overview':
                                return (
                                    <CourseDetails
                                        course={course}
                                        progress={percentageSeen / 100}
                                        badge={badge}
                                        onRemoveCourse={onRemoveCourse}
                                    />
                                );
                            default:
                                return null;
                        }
                    }}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            style={styles.tabs}
                            pressOpacity={1}
                            indicatorStyle={{
                                backgroundColor: Colors.white,
                            }}
                        />
                    )}
                />
            )}
            {schedule && !fullscreen && (
                <Progress
                    isComplete={isCourseComplete}
                    percentageSeen={percentageSeen}
                    hasCheckedItems={hasCheckedItems}
                    hasUncheckedItems={hasUncheckedItems}
                    enableFinishButton={enableFinishButton}
                    onFinish={onFinish}
                />
            )}
        </SafeAreaView>
    );
};

Course.propTypes = {
    videos: PropTypes.arrayOf(PropTypes.object).isRequired,
    hasCheckedItems: PropTypes.bool.isRequired,
    hasUncheckedItems: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    playlist: PropTypes.objectOf(PropTypes.any),
    schedule: PropTypes.objectOf(PropTypes.any),
    selectedVideo: PropTypes.objectOf(PropTypes.any).isRequired,
    course: PropTypes.objectOf(PropTypes.any).isRequired,
    onAddToCalendarPress: PropTypes.func,
    onCompleteVideo: PropTypes.func.isRequired,
    onRemoveCompleteVideo: PropTypes.func.isRequired,
    onSelectVideo: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

Course.defaultProps = {
    playlist: undefined,
    schedule: undefined,
    onAddToCalendarPress: undefined,
};

export default CourseHOC(withTranslation('courseComponent')(Course));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    hideTabView: {
        display: 'none',
    },
    loading: {
        padding: Layout.padding,
    },
    thumbnail: {
        height: Layout.window.width,
        width: Layout.window.width,
    },
    name: {
        padding: Layout.padding,
        fontSize: 18,
    },
    tabs: {
        backgroundColor: Colors.background,
        borderBottomWidth: 1,
        borderColor: Colors.separator,
    },
});
