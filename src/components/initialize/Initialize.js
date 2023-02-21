import { Component } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { messaging } from '../../config';
import { addEvent, updateMessagingToken } from '../../actions';
import { EVENT_TYPE_INFO } from '../../constants';
import { parseLinkingUrl } from '../../utils';
import { CommonActions } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';

class Initialize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
            init: false,
        };
    }

    async componentDidMount() {
        try {
            Linking.addEventListener('url', this.linkingListener);
            Linking.getInitialURL().then((url) => this.linkingListener({url}));
            const permission = await this.requestPermission();
            if (permission) {
                this.registerNotification();
            }
        } catch (error) {
            throw error;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {url, init} = this.state;
        const {initialize, user, onBoarded} = this.props;
        if (initialize) {
            if (user) {
                if (onBoarded) {
                    if (url) {
                        const {screen, params} = parseLinkingUrl(url);
                        this.resetScreen(prevState.url === url ^ init, screen, params);
                    } else {
                        this.resetScreen(!init, 'Main', {
                            screen: 'Progress',
                        });
                    }
                } else {
                    this.resetScreen(!init, 'Onboarding');
                }
            } else {
                this.resetScreen(!init, 'Welcome');
            }
        }
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.linkingListener);
    }

    resetScreen(canReset, name, params) {
        if (canReset) {
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name, params}],
                })
            );
            setTimeout(() => {
                BootSplash.hide();
            }, 100);
            this.setState({init: true});
        }
    }

    linkingListener = ({url}) => {
        this.setState({url});
    }

    remoteNotification(message) {
        if (message?.data?.screen) {
            this.setState({
                url: message?.data?.screen,
            });
        }
    }

    registerNotification() {
        messaging.onTokenRefresh(() => updateMessagingToken());
        messaging.onNotificationOpenedApp(this.remoteNotification);
        messaging.getInitialNotification().then(this.remoteNotification);
        messaging.onMessage((message) => {
            addEvent({
                type: EVENT_TYPE_INFO,
                title: message.notification.title,
                text: message.notification.body,
                onPress: () => this.remoteNotification(message),
            })
        });
    }

    async requestPermission() {
        try {
            const hasPermission = await messaging.hasPermission();
            if (hasPermission <= 0) {
                const requestedPermission = await messaging.requestPermission();
                return [
                    messaging.AuthorizationStatus.AUTHORIZED,
                    messaging.AuthorizationStatus.PROVISIONAL,
                ].includes(requestedPermission);
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    render() {
        return null;
    }
}

Initialize.propTypes = {
    user: PropTypes.any,
    onBoarded: PropTypes.bool,
    initialize: PropTypes.bool,
    navigation: PropTypes.any,
    addEvent: PropTypes.func.isRequired,
    updateMessagingToken: PropTypes.func.isRequired,
};

Initialize.defaultProps = {
    user: null,
    onBoarded: false,
    initialize: false,
    navigation: null,
}

const mapStateToProps = state => ({
    onBoarded: state.milestones?.onboarded,
});

const mapDispatchToProps = {
    addEvent,
    updateMessagingToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Initialize);
