import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {getVimeoPlayUrl, getVimeoDownloadByQuality} from '../../actions';
import {USER_ROLE_PREMIUM} from '../../constants';

const VimeoVideoHOCWrapper = InnerComponent => {
    class VimeoVideoHOC extends Component {
        _isMounted = false;
        state = {
            loading: true,
            cached: false,
        };

        componentDidMount() {
            this._isMounted = true;
            this.checkCachedVideo();
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        async checkCachedVideo() {
            const {videoId} = this.props;
            const cachePath = `${RNFetchBlob.fs.dirs.DocumentDir}/videos/${videoId}.mp4`;
            const exists = await RNFetchBlob.fs.exists(cachePath);
            if (exists) {
                this._isMounted && this.setState({cached: exists, loading: false});
            } else {
                this.loadVideo();
            }
        }

        async loadVideo() {
            const {videoId} = this.props;
            try {
                await this.props.getVimeoPlayUrl(videoId);
                await this.props.getVimeoDownloadByQuality(videoId);
            } finally {
                this._isMounted && this.setState({loading: false});
            }
        }

        toggleVideoDownloaded(status) {
            this._isMounted && this.setState({cached: status});
        }

        render() {
            const {videoId, play, download, userRole} = this.props;
            const {cached} = this.state;
            const playUrl = play.vimeo[String(videoId)];
            const downloadVideo = download.vimeo[String(videoId)];

            if (!cached && (!downloadVideo || !playUrl)) {
                return null;
            }

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    playUrl={playUrl}
                    downloadData={downloadVideo}
                    cached={cached}
                    isPremiumUser={userRole === USER_ROLE_PREMIUM}
                    toggleIsVideoDownloaded={status =>
                        this.toggleVideoDownloaded(status)
                    }
                />
            );
        }
    }

    VimeoVideoHOC.propTypes = {
        videoId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            .isRequired,
        userRole: PropTypes.string.isRequired,
        play: PropTypes.object.isRequired,
        download: PropTypes.object.isRequired,
        getVimeoPlayUrl: PropTypes.func.isRequired,
        getVimeoDownloadByQuality: PropTypes.func.isRequired,
    };

    const mapStateToProps = state => ({
        play: state.play,
        download: state.download,
        userRole: state.userRole,
    });

    const mapDispatchToProps = {
        getVimeoPlayUrl,
        getVimeoDownloadByQuality,
    };

    return connect(mapStateToProps, mapDispatchToProps)(VimeoVideoHOC);
};

export default VimeoVideoHOCWrapper;
