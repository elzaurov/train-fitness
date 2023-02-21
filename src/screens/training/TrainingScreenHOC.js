import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../../layout';

const TrainingScreenHOCWrapper = (InnerComponent) => {
  class TrainingScreenHOC extends Component {
    constructor(props) {
      super(props);
      const index = props.route.params?.index;

      this.state = {
        index: index >= 0 ? index : 0,
      };
    }

    static navigationOptions = {
      header: (props) => (
        <Header {...props} backButton={true} screen="Body Trainings" hasTabs />
      ),
    };

    handleIndexChange = (index) => {
      this.setState({index});
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

  TrainingScreenHOC.propTypes = {
    route: PropTypes.object.isRequired,
  };

  return TrainingScreenHOC;
};

export default TrainingScreenHOCWrapper;
