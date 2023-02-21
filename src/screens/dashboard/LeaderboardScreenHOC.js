import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../../layout';
import {analytics} from '../../config';
import {LEADERBOARD_VIEW_EVENT} from '../../constants';

const LeaderboardScreenHOCWrapper = (InnerComponent) => {
  class LeaderboardScreenHOC extends Component {
    static navigationOptions = {
      title: 'LEADERBOARD',
      header: (props) => <Header {...props} hasTabs={true} backButton={true} />,
    };

    state = {
      index: 0,
      generalLoaded: false,
    };

    componentDidMount() {
      analytics.logEvent(LEADERBOARD_VIEW_EVENT, {type: 'Weekly'});
    }

    handleIndexChange = (index) => {
      this.setState({index}, () => {
        if (index === 1) {
          this.setState({generalLoaded: true});

          analytics.logEvent(LEADERBOARD_VIEW_EVENT, {type: 'All Time'});
        } else {
          analytics.logEvent(LEADERBOARD_VIEW_EVENT, {type: 'Weekly'});
        }
      });
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onIndexChange={this.handleIndexChange}
        />
      );
    }
  }

  LeaderboardScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return LeaderboardScreenHOC;
};

export default LeaderboardScreenHOCWrapper;
