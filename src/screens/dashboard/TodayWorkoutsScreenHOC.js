import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../../layout';

const TodayWorkoutsScreenHOCWrapper = (InnerComponent) => {
  class TodayWorkoutsScreenHOC extends Component {
    static navigationOptions = {
      title: 'WORKOUTS FOR TODAY',
      header: (props) => <Header {...props} backButton={true} />,
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  TodayWorkoutsScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return TodayWorkoutsScreenHOC;
};

export default TodayWorkoutsScreenHOCWrapper;
