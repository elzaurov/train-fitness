import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header} from '../../layout';

const CalendarScreenHOCWrapper = (InnerComponent) => {
  class CalendarScreenHOC extends Component {
    static navigationOptions = {
      title: 'SCHEDULE',
      header: (props) => <Header {...props} />,
    };

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  }

  CalendarScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  function mapStateToProps() {
    return {};
  }

  return connect(mapStateToProps)(CalendarScreenHOC);
};

export default CalendarScreenHOCWrapper;
