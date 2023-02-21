import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Intercom from 'react-native-intercom';
import {auth} from '../../config';
import {withMilestones} from '../../hocs';
import {notifications} from '../../config';
import {MILESTONE_SECOND_LOGIN} from '../../constants';
import {
    loadGamification,
    loadProfile,
    loadStats,
    loadUnreadNotifications,
    loadUserRole,
    loadPlan,
    updateLoginTime,
    isFirstDailyAccess,
    loadOnBoarding,
    loadRemoteConfigs,
    loadMilestones,
    loadEntitlement,
    updateMilestones,
    updateMessagingToken,
} from '../../actions';
import {userLogin} from '../../utils';

const AuthLoadingScreenHOCWrapper = InnerComponent => {
    class AuthLoadingScreenHOC extends Component {
        componentDidMount() {
            const {navigation, route, assertMilestone} = this.props;
            const isNewUser = route?.params?.isNewUser ?? false;

            this.unsubscriber = auth.onAuthStateChanged(user => {
                if (!user) {
                    this.props.navigation.navigate('Main');
                } else {
                    Promise.all([
                        this.props.loadProfile(),
                        this.props.loadEntitlement(),
                        this.props.loadOnBoarding(),
                        this.props.loadPlan(),
                        this.props.loadMilestones(),
                        this.props.loadGamification(),
                        this.props.loadStats(),
                        this.props.loadUnreadNotifications(),
                        this.props.loadUserRole(),
                    ])
                        .then(async data => {
                            await this.props.updateMessagingToken();
                            const [profile, entitlement, onBoarding] = data;

                            const initialNotif =
                                await notifications.getInitialNotification();

                            if (Object.keys(onBoarding).length === 0) {
                                navigation.navigate('PositionOnBoarding');
                            } else if (initialNotif?.notification?.data?.url) {
                                const {url} = initialNotif.notification.data;
                                navigation.navigate('WebView', {url});
                            } else {
                                navigation.navigate('Main');
                            }

                            if (isNewUser !== true) {
                                assertMilestone(MILESTONE_SECOND_LOGIN);
                            }

                            userLogin({
                                ...profile,
                                entitlement: entitlement.status,
                                plan: entitlement.productId,
                            });

                            this.props.updateLoginTime();
                        })
                        .catch(async error => {
                            console.error(error);
                            await auth.signOut();
                            Intercom.logout();
                            navigation.navigate('Auth');
                        });
                }
            });
        }

        componentWillUnmount() {
            if (this.unsubscriber) {
                this.unsubscriber();
            }
        }

        render() {
            return <InnerComponent {...this.state} {...this.props} />;
        }
    }

    AuthLoadingScreenHOC.propTypes = {
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        route: PropTypes.object.isRequired,
        loadGamification: PropTypes.func.isRequired,
        loadProfile: PropTypes.func.isRequired,
        loadOnBoarding: PropTypes.func.isRequired,
        loadStats: PropTypes.func.isRequired,
        loadUserRole: PropTypes.func.isRequired,
        loadPlan: PropTypes.func.isRequired,
        isFirstDailyAccess: PropTypes.func.isRequired,
        loadUnreadNotifications: PropTypes.func.isRequired,
        updateLoginTime: PropTypes.func.isRequired,
        loadRemoteConfigs: PropTypes.func.isRequired,
        loadMilestones: PropTypes.func.isRequired,
        loadEntitlement: PropTypes.func.isRequired,
        updateMilestones: PropTypes.func.isRequired,
        assertMilestone: PropTypes.func.isRequired,
        updateMessagingToken: PropTypes.func.isRequired,
    };

    return connect(null, {
        loadGamification,
        loadProfile,
        loadStats,
        loadUnreadNotifications,
        loadUserRole,
        updateLoginTime,
        isFirstDailyAccess,
        loadOnBoarding,
        loadRemoteConfigs,
        loadMilestones,
        loadEntitlement,
        loadPlan,
        updateMilestones,
        updateMessagingToken,
    })(withMilestones(AuthLoadingScreenHOC));
};

export default AuthLoadingScreenHOCWrapper;
