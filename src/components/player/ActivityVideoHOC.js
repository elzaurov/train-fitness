import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withNavigation} from '@react-navigation/compat';
import moment from 'moment';
import {getIdFromVimeoUrl} from '../../utils';

const ActivityVideoHOCWrapper = (InnerComponent) => {
  class ActivityVideoHOC extends Component {
    state = {
      disposed: false,
    };

    observers = [];

    componentDidMount() {
      this.loadStartTime = moment();

      // disposes the video when the screen is not in focus
      const {navigation} = this.props;

      this.observers = [
        navigation.addListener('focus', () => {
          this.setState({disposed: false});
        }),
        navigation.addListener('blur', () => {
          this.setState({disposed: true});
        }),
      ];
    }

    componentWillUnmount() {
      this.observers.forEach((observer) => observer.remove());
    }

    // video load time measurement
    loadStartTime = null;
    loadLinkReceived = null;
    loadEndTime = null;

    handleLoadStart = () => {
      this.loadLinkReceived = moment();
    };

    handleLoad = () => {
      this.loadEndTime = moment();
    };

    render() {
      const {activity} = this.props;
      const {videoEmbedURL, limelightVideoId, thumbnail, key} = activity;
      const vimeoVideoId = getIdFromVimeoUrl(videoEmbedURL);

      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          key={key} // important for re-initialization of the player
          limelightVideoId={limelightVideoId}
          vimeoVideoId={vimeoVideoId}
          webUri={videoEmbedURL}
          onLoad={this.handleLoad}
          onLoadStart={this.handleLoadStart}
          poster={thumbnail}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    remoteConfigs: state.remoteConfigs,
  });

  ActivityVideoHOC.propTypes = {
    activity: PropTypes.object.isRequired,
    remoteConfigs: PropTypes.object.isRequired,
    navigation: PropTypes.shape({
      addListener: PropTypes.func,
      removeListener: PropTypes.func,
    }).isRequired,
  };

  return connect(mapStateToProps)(withNavigation(ActivityVideoHOC));
};

export default ActivityVideoHOCWrapper;
