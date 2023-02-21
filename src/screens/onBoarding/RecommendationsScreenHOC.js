/* eslint-disable max-len */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import {
    loadPrograms,
    loadCourses,
    loadStripeData,
    loadTeaser,
    addScheduleItem,
} from '../../actions';
import {HeaderProgressBar} from '../../components';
import {parseTeaserPath} from '../../utils';
import {DATE_FORMAT} from '../../constants';

const RecommendationsScreenHOCWrapper = InnerComponent => {
    class RecommendationsScreenHOC extends Component {
        static navigationOptions = {
            header: props => (
                <HeaderProgressBar
                    {...props}
                    title="Your Personal Plans"
                    percentage={1}
                    disableBackButton
                />
            ),
        };

        state = {
            loading: true,
            recommendedItems: [],
            isStripe: false,
            scheduling: false,
        };

        async componentDidMount() {
            const {remoteConfigs, onBoarding} = this.props;

            const [positionId] = onBoarding.position.split('_');

            const codes =
                remoteConfigs.position_content_mapping[
                    positionId.toUpperCase()
                ] || [];

            const stripe = await this.props.loadStripeData();

            const programsObj = await this.props.loadPrograms();
            const programsIds = Object.keys(programsObj);

            const courses = (await this.props.loadCourses()).filter(p =>
                codes.includes(p.code),
            );
            const programs = programsIds
                .map(key => Object.assign(programsObj[key], {key}))
                .filter(p => codes.includes(p.code));

            const recommendedItems = programs
                .concat(courses)
                .filter(r => codes.includes(r.code));

            this.setState({
                loading: false,
                recommendedItems,
                isStripe: Object.values(stripe).length > 0,
            });
        }

        handleNavigateTo = item => {
            this.props.navigation.push(item.phases ? 'Program' : 'Course', {
                id: item.key,
            });
        };

        handleGoPremium = () => {
            this.props.navigation.navigate('Paywall');
        };

        handleSkip = async () => {
            try {
                this.setState({scheduling: true});

                const {prescheduleItems, navigation} = this.props;
                const date = moment().format(DATE_FORMAT);

                const tasks = prescheduleItems.map(async path => {
                    const scheduleItem = await this.props.loadTeaser(path);
                    const {type} = parseTeaserPath(path);

                    await this.props.addScheduleItem({
                        date,
                        scheduleItem: {
                            ...scheduleItem,
                            type,
                            id: scheduleItem.key,
                        },
                    });
                });

                await Promise.all(tasks);

                navigation.navigate('Main');
            } finally {
                this.setState({scheduling: false});
            }
        };

        render() {
            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    onGoPremium={this.handleGoPremium}
                    onSkip={this.handleSkip}
                    onNavigateTo={this.handleNavigateTo}
                />
            );
        }
    }

    RecommendationsScreenHOC.propTypes = {
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        loadPrograms: PropTypes.func.isRequired,
        loadCourses: PropTypes.func.isRequired,
        loadStripeData: PropTypes.func.isRequired,
        remoteConfigs: PropTypes.shape({
            position_content_mapping: PropTypes.object,
        }).isRequired,
        loadTeaser: PropTypes.func.isRequired,
        addScheduleItem: PropTypes.func.isRequired,
        onBoarding: PropTypes.object.isRequired,
        prescheduleItems: PropTypes.array,
        userRole: PropTypes.string.isRequired,
    };

    RecommendationsScreenHOC.defaultProps = {
        prescheduleItems: [],
    };

    const mapStateToProps = state => ({
        onBoarding: state.onBoarding,
        remoteConfigs: state.remoteConfigs,
        prescheduleItems: state.remoteConfigs.preschedule_items,
        userRole: state.userRole,
    });

    return connect(mapStateToProps, {
        loadPrograms,
        loadCourses,
        loadStripeData,
        loadTeaser,
        addScheduleItem,
    })(RecommendationsScreenHOC);
};

export default RecommendationsScreenHOCWrapper;
