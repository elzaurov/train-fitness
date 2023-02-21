import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header} from '../../layout';

const LearningScreenHOCWrapper = (InnerComponent) => {
  class LearningScreenHOC extends Component {
    state = {
      index: 0,
    };

    handleIndexChange = (index) => {
      this.setState({index});
    };

    static navigationOptions = {
      header: (props) => (
        <Header {...props} backButton={true} screen="Mind Learnings" hasTabs />
      ),
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

  LearningScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  function mapStateToProps({plan}) {
    return {plan};
  }

  return connect(mapStateToProps)(LearningScreenHOC);
};

export default LearningScreenHOCWrapper;
