import React, {PureComponent} from 'react';
import Sound from 'react-native-sound';
import PropTypes from 'prop-types';

Sound.setCategory('Playback', true);
Sound.setMode('SpokenAudio');

const SoundPlayerHOCWrapper = (InnerComponent) => {
  class SoundPlayerHOC extends PureComponent {
    state = {
      ready: false,
    };

    sound;

    componentDidMount() {
      const {audioUrl} = this.props;

      this.sound = new Sound(audioUrl, (error) => {
        if (error) {
          console.error(error);
        } else {
          this.setState({ready: true});
        }
      });
    }

    componentWillUnmount() {
      this.sound.release();
    }

    render() {
      const {playAudio, onEndSound} = this.props;
      const {ready} = this.state;

      if (ready && playAudio) {
        this.sound.play(onEndSound);
      }

      return <InnerComponent {...this.props} {...this.state} />;
    }
  }

  SoundPlayerHOC.propTypes = {
    audioUrl: PropTypes.any.isRequired,
    playAudio: PropTypes.bool,
    onEndSound: PropTypes.func,
  };

  SoundPlayerHOC.defaultProps = {
    playAudio: false,
    onEndSound: () => {},
  };

  return SoundPlayerHOC;
};

export default SoundPlayerHOCWrapper;
