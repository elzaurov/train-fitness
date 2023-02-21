import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addScheduleItem} from '../../actions';

const NewScheduleHOCWrapper = InnerComponent => {
    class NewScheduleHOC extends Component {
        state = {
            submitting: false,
        };

        handleAddPress = () => {
            const {navigation, scheduleItem, date} = this.props;

            this.setState({submitting: true}, () => {
                this.props.addScheduleItem({date, scheduleItem}).then(() => {
                    navigation.pop(2);
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

    NewScheduleHOC.propTypes = {
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        scheduleItem: PropTypes.objectOf(PropTypes.any).isRequired,
        date: PropTypes.string.isRequired,
        addScheduleItem: PropTypes.func.isRequired,
    };

    return connect(null, {
        addScheduleItem,
    })(NewScheduleHOC);
};

export default NewScheduleHOCWrapper;
