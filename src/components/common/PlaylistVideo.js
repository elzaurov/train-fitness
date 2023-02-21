import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Checkbox, IconButton, RegularText} from '../layout';
import {Colors, Layout} from '../../constants';
import PlaylistVideoHOC from './PlaylistVideoHOC';

const PlaylistVideo = ({
    video,
    type,
    hasSchedule,
    isChecked,
    isInsidePlaylist,
    isNextVideo,
    isSequencePlaylist,
    reps,
    selected,
    sets,
    translateX,
    onCompleteVideo,
    onSelectVideo,
    onToggleCheckbox,
    onUpdateStats,
    t,
}) => {
    const stats = [
        {key: 'reps', value: reps},
        {key: 'sets', value: sets},
    ];
    const hasStats = reps + sets > 0;

    const isDisabled =
        isSequencePlaylist && !isInsidePlaylist && !isNextVideo && hasSchedule;

    const statComponents = stats.map(({key, value}) => (
        <View key={key} style={styles.statsItem}>
            <IconButton
                style={styles.statsButton}
                onPress={() => onUpdateStats(key, 1)}
                icon="plus-circle"
                iconSize={36}
                iconColor={Colors.secondary}
            />
            <View style={styles.statsText}>
                <RegularText style={styles.statsKey}>{t(key)}</RegularText>
                <RegularText style={styles.statsValue}>{value}</RegularText>
            </View>
            <IconButton
                style={styles.statsButton}
                onPress={() => onUpdateStats(key, -1)}
                icon="minus-circle"
                iconSize={36}
                iconColor={Colors.secondary}
            />
        </View>
    ));

    return (
        <View>
            <TouchableOpacity
                disabled={isDisabled}
                style={[styles.video, selected ? styles.selected : {}]}
                onPress={() => onSelectVideo(video)}>
                <RegularText
                    style={[
                        hasSchedule ? styles.videoName : null,
                        isDisabled ? styles.videoNameDisabled : null,
                    ]}>
                    {video.name}
                </RegularText>
                {hasSchedule && !isSequencePlaylist && (
                    <Checkbox
                        initialChecked={isChecked}
                        onToggleCheckbox={onToggleCheckbox}
                    />
                )}
                {hasSchedule &&
                    isSequencePlaylist &&
                    (isInsidePlaylist || isNextVideo) && (
                        <Checkbox
                            disabled={isChecked}
                            initialChecked={isChecked}
                            onToggleCheckbox={onToggleCheckbox}
                        />
                    )}
            </TouchableOpacity>
            <Animated.View
                style={[
                    styles.video,
                    styles.complete,
                    {transform: [{translateX}]},
                ]}>
                <View style={styles.stats}>{hasStats && statComponents}</View>
                <TouchableOpacity onPress={() => onCompleteVideo(video)}>
                    <RegularText style={styles.okButton}>{t('OK')}</RegularText>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

PlaylistVideo.propTypes = {
    type: PropTypes.string.isRequired,
    video: PropTypes.objectOf(PropTypes.any).isRequired,
    hasSchedule: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool.isRequired,
    isSequencePlaylist: PropTypes.bool.isRequired,
    reps: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    sets: PropTypes.number.isRequired,
    translateX: PropTypes.any.isRequired,
    onCompleteVideo: PropTypes.func.isRequired,
    onSelectVideo: PropTypes.func.isRequired,
    onToggleCheckbox: PropTypes.func.isRequired,
    onUpdateStats: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default PlaylistVideoHOC(
    withTranslation('playlistVideoComponent')(PlaylistVideo),
);

const styles = StyleSheet.create({
    video: {
        padding: Layout.padding,
        borderBottomWidth: 1,
        borderColor: Colors.separator,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selected: {
        backgroundColor: Colors.separator,
    },
    complete: {
        backgroundColor: Colors.separator,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    statsText: {
        marginLeft: 6,
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsValue: {
        fontSize: 18,
    },
    statsKey: {
        fontSize: 8,
    },
    okButton: {
        fontSize: 24,
        paddingLeft: 2,
        paddingRight: 2,
    },
    videoName: {
        width: Layout.window.width - 80,
    },
    videoNameDisabled: {
        color: Colors.dustyGray,
    },
});
