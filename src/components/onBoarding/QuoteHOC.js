import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import Share from 'react-native-share';
import {connect} from 'react-redux';
import {StatusBar} from 'react-native';
import {loadDailyQuote, loadQuotes} from '../../actions';
// import images from './imageBase64';

const QuoteHOCWrapper = (InnerComponent) => {
  class QuoteHOC extends Component {
    state = {
      loading: true,
      quote: null,
      submitting: false,
      percent: 0,
      screenPressed: null,
    };

    async componentDidMount() {
      StatusBar.setHidden(true);

      const quotes = await this.props.loadQuotes();
      const quote = await this.props.loadDailyQuote();

      this.setState(
        {
          loading: false,
          quote: quotes.filter((q) => q.key === quote.currentQuote)[0],
        },
        () => {
          this.interval = setInterval(() => {
            this.updatePercent();
          }, 100);
        },
      );
    }

    componentWillUnmount() {
      StatusBar.setHidden(false);
      clearInterval(this.interval);
    }

    updatePercent = () => {
      const {percent, screenPressed} = this.state;
      const {navigation} = this.props;

      if (screenPressed !== undefined && !screenPressed) {
        if (percent <= 1.03) {
          this.setState({
            percent: percent + 0.015,
          });
        } else {
          navigation.navigate('App');
        }
      }
    };

    handleScreenPressedIn = () => {
      this.setState({
        screenPressed: true,
      });
    };

    handleScreenPressedOut = () => {
      this.setState({
        screenPressed: false,
      });
    };

    handleShare = () => {
      this.setState(
        {
          screenPressed: true,
        },
        () => {
          // const shareOptions = {
          //   title: 'Share file',
          //   urls: [images.image1, images.image2],
          // };
          // Share.open(shareOptions)
          //   .then(() => {})
          //   .catch(() => {
          //     this.setState({
          //       screenPressed: false,
          //     });
          //   });
        },
      );
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onScreenPressIn={this.handleScreenPressedIn}
          onScreenPressOut={this.handleScreenPressedOut}
          onShare={this.handleShare}
        />
      );
    }
  }

  QuoteHOC.propTypes = {
    navigation: PropTypes.object.isRequired,
    loadQuotes: PropTypes.func.isRequired,
    loadDailyQuote: PropTypes.func.isRequired,
  };

  function mapStateToProps({dailyQuote, quotes}) {
    return {dailyQuote, quotes};
  }

  const mapDispatchToProps = {
    loadDailyQuote,
    loadQuotes,
  };

  return connect(mapStateToProps, mapDispatchToProps)(QuoteHOC);
};

export default QuoteHOCWrapper;
