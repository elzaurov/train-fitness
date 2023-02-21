import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {NativeModules, Image} from 'react-native';

const {SoundPlayer} = NativeModules;

class NativeSoundPlayer extends PureComponent {
  state = {
    isReady: false,
  };

  async componentDidMount() {
    const {audioUrl} = this.props;
    const {uri} = Image.resolveAssetSource(audioUrl);

    if (uri) {
      await SoundPlayer.init(uri);
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({isReady: true});
    }
  }

  render() {
    const {isReady} = this.state;
    const {playAudio, onEndSound} = this.props;

    if (isReady && playAudio) {
      SoundPlayer.play(onEndSound);
    }

    return null;
  }
}

NativeSoundPlayer.propTypes = {
  audioUrl: PropTypes.any.isRequired,
  playAudio: PropTypes.bool,
  onEndSound: PropTypes.func,
};

NativeSoundPlayer.defaultProps = {
  playAudio: false,
  onEndSound: () => {},
};

export default NativeSoundPlayer;
