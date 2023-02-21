import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import {TabBar, ScrollPager} from 'react-native-tab-view';
import {TabView} from '../../layout';
import {ActivityVideo} from '../../player';
import {CommentForm, Comments} from '../../comments';
import {Colors, Layout} from '../../../constants';
import LearningVideoDetails from './LearningVideoDetails';
import LearningVideoHOC from './LearningVideoHOC';

const LearningVideo = ({
    editedComment,
    formVisible,
    navigation,
    videoPath,
    learningVideo,
    onToggleReply,
    t,
}) => {
    const fullscreen = useSelector(state => state.android_player.fullscreen);
    const {designedBy, drillSetup, key, thumbnail, videoEmbedURL, ...details} =
        learningVideo;
    const [isVideoPaused, setIsVideoPaused] = useState(false);
    const toggleIsVideoPaused = paused => {
        setIsVideoPaused(paused);
    };

    const routes = [{key: 'details', title: t('details')}];

    if (designedBy) {
        routes.push({key: 'designedBy', title: t('designedBy')});
    }

    routes.push({key: 'comments', title: t('comments')});

    return (
        <View style={styles.container}>
            <ActivityVideo
                activity={learningVideo}
                toggleIsVideoPaused={toggleIsVideoPaused}
                paused={isVideoPaused}
            />
            {!fullscreen && (
                <TabView
                    routes={routes}
                    renderScene={({route}) => {
                        switch (route.key) {
                            case 'details':
                                return (
                                    <LearningVideoDetails
                                        learningVideo={details}
                                    />
                                );
                            case 'designedBy':
                                return (
                                    <LearningVideoDetails
                                        learningVideo={{designedBy}}
                                    />
                                );
                            case 'comments':
                                return (
                                    <>
                                        {formVisible && (
                                            <CommentForm
                                                editedComment={editedComment}
                                                type={videoPath}
                                                videoId={key}
                                                onBlur={onToggleReply}
                                                onSubmit={onToggleReply}
                                            />
                                        )}
                                        <Comments
                                            navigation={navigation}
                                            type={videoPath}
                                            videoId={key}
                                            onToggleReply={onToggleReply}
                                        />
                                    </>
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
        </View>
    );
};

LearningVideo.propTypes = {
    editedComment: PropTypes.objectOf(PropTypes.any),
    formVisible: PropTypes.bool.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    learningVideo: PropTypes.objectOf(PropTypes.any).isRequired,
    videoPath: PropTypes.string.isRequired,
    onAndroidPlay: PropTypes.func.isRequired,
    onChangeState: PropTypes.func.isRequired,
    onProgress: PropTypes.func.isRequired,
    onToggleReply: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

LearningVideo.defaultProps = {
    editedComment: null,
};

export default LearningVideoHOC(
    withTranslation('learningVideoComponent')(LearningVideo),
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    loading: {
        padding: Layout.padding,
    },
    tabs: {
        backgroundColor: Colors.background,
        borderBottomWidth: 1,
        borderColor: Colors.separator,
    },
    modal: {
        width: Layout.window.width,
        height:
            Layout.window.height -
            Layout.headerHeight -
            (9 / 16) * Layout.window.width,
        backgroundColor: Colors.background,
    },
});
