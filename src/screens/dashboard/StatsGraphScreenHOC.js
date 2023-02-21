import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../../layout';

const StatsGraphScreenHOCWrapper = (InnerComponent) => {
  class StatsGraphScreenHOC extends Component {
    static navigationOptions = {
      title: 'STATS GRAPH',
      header: (props) => <Header {...props} backButton={true} />,
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  StatsGraphScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return StatsGraphScreenHOC;
};

export default StatsGraphScreenHOCWrapper;
