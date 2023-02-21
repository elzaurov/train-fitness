import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getLimelightPlayUrl} from '../../actions';

const LimelightPlayerHOCWrapper = (InnerComponent) => {
  class LimelightPlayerHOC extends Component {
    state = {
      loading: true,
    };

    async componentDidMount() {
      const {videoId} = this.props;
      await this.setState({loading: true});

      try {
        await this.props.getLimelightPlayUrl(videoId);
      } finally {
        this.setState({loading: false});
      }
    }

    render() {
      const {videoId, play} = this.props;
      const playUrl = play.limelight[String(videoId)];

      return (
        <InnerComponent {...this.state} {...this.props} playUrl={playUrl} />
      );
    }
  }

  LimelightPlayerHOC.propTypes = {
    videoId: PropTypes.string.isRequired,
    getLimelightPlayUrl: PropTypes.func.isRequired,
    play: PropTypes.object.isRequired,
  };

  const mapStateToProps = (state) => ({
    play: state.play,
  });

  const mapDispatchToProps = {
    getLimelightPlayUrl,
  };

  return connect(mapStateToProps, mapDispatchToProps)(LimelightPlayerHOC);
};

export default LimelightPlayerHOCWrapper;
