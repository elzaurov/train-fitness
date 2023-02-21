import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {HeaderProgress} from '../../layout';
import {updateStats, completeScheduleItem} from '../../actions';

const DoingWorkoutEvaluationScreenHOCWrapper = (InnerComponent) => {
  class DoingWorkoutEvaluationScreenHOC extends PureComponent {
    static navigationOptions = {
      header: (props) => (
        <HeaderProgress {...props} title="FINISHED WORKOUT" disableBackButton />
      ),
    };

    state = {
      loading: true,
      activity: {},
      submitting: false,
    };

    async componentDidMount() {
      const {
        activity,
        timestamp,
        duration,
        onFinishActivity: handleFinishActivity,
        type,
        individually,
      } = this.props.route.params ?? {};

      this.setState({
        activity,
        timestamp,
        duration,
        handleFinishActivity,
        type,
        individually,
        loading: false,
        submitting: false,
      });
    }

    handleDurationChange = (duration) => {
      isNaN(duration)
        ? this.setState({duration: 0})
        : this.setState({duration});
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onStarRatingPress={this.handleStarRatingPress}
          onFinishActivity={() => {
            this.setState({submitting:true}, ()=>{
              this.state.handleFinishActivity(this.state.duration);
            })
          }}
          onChangeDuration={this.handleDurationChange}
          duration={this.state.duration}
        />
      );
    }
  }

  DoingWorkoutEvaluationScreenHOC.propTypes = {
    route: PropTypes.object.isRequired,
    updateStats: PropTypes.func.isRequired,
    completeScheduleItem: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    userRole: state.userRole,
    profile: state.profile,
    remoteConfigs: state.remoteConfigs,
    schedule: state.schedule,
    isBrowseHome: state.remoteConfigs.ux_browse_home,
  });

  return connect(mapStateToProps, {
    updateStats,
    completeScheduleItem,
  })(DoingWorkoutEvaluationScreenHOC);
};

export default DoingWorkoutEvaluationScreenHOCWrapper;
