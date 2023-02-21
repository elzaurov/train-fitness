import React, {Component} from 'react';
import PropTypes from 'prop-types';

const HlsPlayerHOCWrapper = (InnerComponent) => {
  class HlsPlayerHOC extends Component {
    state = {
      loading: true,
      error: null,
    };

    handleLoadStart = (e) => {
      this.setState({loading: true});
      this.props.onLoadStart(e);
    };

    handleLoad = (e) => {
      this.setState({
        loading: false,
        paused: this.props.paused,
      });

      this.props.onLoad(e);
    };

    handleError = (e) => {
      this.setState({
        loading: false,
        error: 'Could not load the video',
        duration: e.duration,
      });
      this.props.onError(e);
    };

    render() {
      const loading = this.state.loading || this.props.loading;
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          loading={loading}
          onLoad={this.handleLoad}
          onLoadStart={this.handleLoadStart}
          onError={this.handleError}
        />
      );
    }
  }

  HlsPlayerHOC.propTypes = {
    onLoadStart: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    onProgress: PropTypes.func,
    loading: PropTypes.bool,
    paused: PropTypes.bool,
  };

  HlsPlayerHOC.defaultProps = {
    onLoadStart: () => {},
    onLoad: () => {},
    onError: () => {},
    onProgress: () => {},
    loading: false,
    paused: false,
  };

  return HlsPlayerHOC;
};

export default HlsPlayerHOCWrapper;
