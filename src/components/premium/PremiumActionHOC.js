import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withNavigation} from '@react-navigation/compat';
import {USER_ROLE_FREE} from '../../constants';

const PremiumActionHOCWrapper = InnerComponent => {
    class PremiumActionHOC extends Component {
        handleEvent = e => {
            const {event, userRole, isPremium, navigation, screenVariant} =
                this.props;

            const eventHandler = this.props[event];

            if (isPremium === true && userRole === USER_ROLE_FREE) {
                navigation.push('Paywall', {
                    returnRoute: navigation.state.routeName,
                });
            } else {
                typeof eventHandler === 'function' && eventHandler(e);
            }
        };

        render() {
            const {event} = this.props;

            return (
                <InnerComponent
                    {...this.props}
                    {...this.state}
                    {...{[event]: this.handleEvent}}
                />
            );
        }
    }

    PremiumActionHOC.propTypes = {
        onPress: PropTypes.func.isRequired,
        userRole: PropTypes.string.isRequired,
        isPremium: PropTypes.bool,
        navigation: PropTypes.shape({push: PropTypes.func}).isRequired,
        event: PropTypes.string,
    };

    PremiumActionHOC.defaultProps = {
        isPremium: false,
        event: 'onPress',
    };

    const mapStateToProps = state => ({
        userRole: state.userRole,
        screenVariant: state.remoteConfigs.in_app_paywall,
    });

    return connect(mapStateToProps)(withNavigation(PremiumActionHOC));
};

export default PremiumActionHOCWrapper;
