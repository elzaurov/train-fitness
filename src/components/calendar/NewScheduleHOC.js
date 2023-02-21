import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadCalendarTeasers} from '../../actions';
import {
    PROGRAM_TEASERS_TYPE,
    WORKOUT_TEASERS_TYPE,
    CROSS_TRAINING_TEASERS_TYPE,
    TEAM_TEASERS_TYPE,
    COURSE_TEASERS_TYPE,
} from '../../constants';

const NewScheduleHOCWrapper = InnerComponent => {
    class NewScheduleHOC extends Component {
        state = {
            isListSequencial: true,
            loading: true,
            categories: [
                {key: 'all', label: 'All'},
                {
                    key: COURSE_TEASERS_TYPE,
                    label: COURSE_TEASERS_TYPE.replace(/(^|-)\w/g, c =>
                        c.toUpperCase(),
                    ),
                },
                {
                    key: CROSS_TRAINING_TEASERS_TYPE,
                    label: CROSS_TRAINING_TEASERS_TYPE.replace(/(^|-)\w/g, c =>
                        c.toUpperCase(),
                    ).replace('-', ' '),
                },
                {
                    key: PROGRAM_TEASERS_TYPE,
                    label: PROGRAM_TEASERS_TYPE.replace(/(^|-)\w/g, c =>
                        c.toUpperCase(),
                    ),
                },
                {
                    key: TEAM_TEASERS_TYPE,
                    label: TEAM_TEASERS_TYPE.replace(/(^|-)\w/g, c =>
                        c.toUpperCase(),
                    ),
                },
                {
                    key: WORKOUT_TEASERS_TYPE,
                    label: WORKOUT_TEASERS_TYPE.replace(/(^|-)\w/g, c =>
                        c.toUpperCase(),
                    ),
                },
            ],
        };

        async componentDidMount() {
            await this.props.loadCalendarTeasers();

            this.setState({
                loading: false,
            });
        }

        handleToggleListOptions = isListSequencial => {
            this.setState({isListSequencial});
        };

        render() {
            const date = this.props.route.params?.date;

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    onToggleListOptions={this.handleToggleListOptions}
                    date={date}
                />
            );
        }
    }

    NewScheduleHOC.propTypes = {
        route: PropTypes.object.isRequired,
        loadCalendarTeasers: PropTypes.func.isRequired,
    };

    const mapStateToProps = state => ({
        calendarTeasers: state.calendarTeasers,
    });

    return connect(mapStateToProps, {
        loadCalendarTeasers,
    })(NewScheduleHOC);
};

export default NewScheduleHOCWrapper;
