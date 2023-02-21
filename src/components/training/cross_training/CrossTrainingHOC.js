import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadCrossTraining} from '../../../actions';

const CrossTrainingHOCWrapper = (InnerComponent) => {
  class CrossTrainingHOC extends Component {
    state = {
      loading: true,
      onAddPress: undefined,
    };

    async componentDidMount() {
      const {type} = this.props;
      const {id, typeParam, date, scheduleId, onAddToCalendarPress} =
        this.props.route.params ?? {};

      await this.props.loadCrossTraining({
        id,
        type: typeParam || type,
        date,
        scheduleId,
      });

      this.setState({loading: false, onAddToCalendarPress});
    }

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onSetTabBarRef={this.handleSetTabBarRef}
        />
      );
    }
  }

  CrossTrainingHOC.propTypes = {
    navigation: PropTypes.any.isRequired,
    route: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    crossTraining: PropTypes.objectOf(PropTypes.any).isRequired,
    loadCrossTraining: PropTypes.func.isRequired,
  };

  function mapStateToProps({crossTraining}) {
    return {crossTraining};
  }

  return connect(mapStateToProps, {
    loadCrossTraining,
  })(CrossTrainingHOC);
};

export default CrossTrainingHOCWrapper;
