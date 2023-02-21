import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../../layout';

const TeamScreenHOCWrapper = (InnerComponent) => {
  class TeamScreenHOC extends Component {
    static navigationOptions = {
      title: 'TEAM',
      header: (props) => <Header {...props} backButton={true} />,
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  TeamScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return TeamScreenHOC;
};

export default TeamScreenHOCWrapper;
