import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadCurrentCourses, loadCourses, addScheduleItem} from '../../actions';
import {Header} from '../../layout';
import {analytics} from '../../config';
import moment from 'moment';
import {
  COURSE_VIEW_EVENT,
  ADD_CALENDAR_ITEM_EVENT,
  COURSE_TEASERS_TYPE,
} from '../../constants';

const CoursesScreenHOCWrapper = (InnerComponent) => {
  class CoursesScreenHOC extends Component {
    static navigationOptions = {
      title: 'COURSES',
      header: (props) => <Header {...props} backButton={true} />,
    };

    state = {
      currentCourses: [],
      loading: true,
      submitting: false,
    };

    async componentDidMount() {
      const courses = await this.props.loadCourses();
      let currentCoursesProgress = await this.props.loadCurrentCourses();

      let currentCourses = courses.filter((c) =>
        currentCoursesProgress.map((c) => c.key).includes(c.key),
      );

      currentCourses = currentCourses.map((c) => {
        return {
          ...c,
          progress:
            currentCoursesProgress.filter((cc) => cc.key === c.key)[0]
              .nextVideo / c.videos.length,
        };
      });

      this.setState({
        currentCourses,
        loading: false,
      });
    }

    handleAddPress = (course) => {
      const {navigation} = this.props;
      const timestamp = moment().startOf('day').utc().valueOf();

      const scheduleItem = {
        ...course,
        type: COURSE_TEASERS_TYPE,
        category: COURSE_TEASERS_TYPE,
        id: course.key,
        url: `/courses/${course.key}`,
      };

      analytics.logEvent(ADD_CALENDAR_ITEM_EVENT, {
        timestamp,
        item_id: scheduleItem.key,
        item_name: scheduleItem.name,
        item_type: scheduleItem.type,
      });

      this.setState({submitting: true}, () => {
        this.props.addScheduleItem({timestamp, scheduleItem}).then(() => {
          this.props.navigation.navigate('Calendar', {
            onGoBack: () => this.refresh(),
          });
        });
      });
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onAddPress={this.handleAddPress}
        />
      );
    }
  }

  CoursesScreenHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    loadCourses: PropTypes.func.isRequired,
  };

  function mapStateToProps({courses}) {
    return {courses};
  }

  return connect(mapStateToProps, {
    loadCourses,
    loadCurrentCourses,
    addScheduleItem,
  })(CoursesScreenHOC);
};

export default CoursesScreenHOCWrapper;
