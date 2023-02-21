import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import moment from 'moment';
import * as StoreReview from 'react-native-store-review';
import {LAST_REVIEW_REQUEST_DATE} from '../../constants';

const DATE_FORMAT = 'YYYY-MM-DD';

const AskReviewHOCWrapper = (InnerComponent) => {
  class AskReviewHOC extends Component {
    async componentDidMount() {
      const lastReviewRequestDate = await AsyncStorage.getItem(
        LAST_REVIEW_REQUEST_DATE,
      );
      const daysFromLastRequest = moment().diff(
        moment(lastReviewRequestDate, DATE_FORMAT),
        'days',
      );

      const {days_between_review_requests} = this.props.remoteConfigs;

      if (
        Number.isNaN(daysFromLastRequest) ||
        daysFromLastRequest >= days_between_review_requests
      ) {
        this.askReview();
      }
    }

    askReview = async () => {
      if (StoreReview.isAvailable) {
        StoreReview.requestReview();
        await AsyncStorage.setItem(
          LAST_REVIEW_REQUEST_DATE,
          moment().format(DATE_FORMAT),
        );
      }
    };

    render() {
      return <InnerComponent {...this.props} {...this.state} />;
    }
  }

  AskReviewHOC.propTypes = {
    remoteConfigs: PropTypes.object.isRequired,
  };

  const mapStateToProps = (state) => ({
    remoteConfigs: state.remoteConfigs,
  });

  return connect(mapStateToProps)(AskReviewHOC);
};

export default AskReviewHOCWrapper;
