import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withNavigation} from '@react-navigation/compat';
import {Alert} from 'react-native';
import {withTranslation} from 'react-i18next';
import {removeScheduleItem, removeStats} from '../../actions';
import {analytics} from '../../config';
import {REMOVE_CALENDAR_ITEM_EVENT} from '../../constants';

const ScheduleItemHOCWrapper = (InnerComponent) => {
  class ScheduleItemHOC extends Component {
    state = {
      submitting: false,
    };

    handleRemovePress = () => {
      const {item, t} = this.props;
      const {completed, stats, timestamp, uid} = item;

      if (completed && stats) {
        Alert.alert(
          t('alert.title'),
          t('alert.message'),
          [
            {text: t('alert.buttons.cancel'), onPress: () => {}},
            {
              text: t('alert.buttons.ok'),
              onPress: () =>
                this.handleConfirmRemoveCompletedScheduleItem(item),
            },
          ],
          {cancelable: true},
        );
      } else {
        this.setState({submitting: true}, () => {
          this.props
            .removeScheduleItem({
              timestamp,
              scheduleId: uid,
            })
            .then(() => {
              this.setState({submitting: false});
            });
        });
      }
    };

    handleConfirmRemoveCompletedScheduleItem = (item) => {
      const {experience, stats, timestamp, uid} = item;

      this.setState({submitting: true}, () => {
        this.props
          .removeStats({stats: {...stats, exp: experience}})
          .then(() => {
            this.props
              .removeScheduleItem({
                timestamp,
                scheduleId: uid,
              })
              .then(() => {
                this.setState({submitting: false});
              });
          });
      });
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onRemovePress={this.handleRemovePress}
        />
      );
    }
  }

  ScheduleItemHOC.propTypes = {
    item: PropTypes.objectOf(PropTypes.any).isRequired,
    removeScheduleItem: PropTypes.func.isRequired,
    removeStats: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  function mapStateToProps({plan}) {
    return {plan};
  }

  return connect(mapStateToProps, {
    removeScheduleItem,
    removeStats,
  })(withNavigation(ScheduleItemHOC));
};

export default ScheduleItemHOCWrapper;
