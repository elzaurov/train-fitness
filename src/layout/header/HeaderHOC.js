import React, {Component} from 'react';
import {StatusBar, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Colors} from '../../constants';

const HeaderHOCWrapper = InnerComponent => {
    class HeaderHOC extends Component {
        componentDidMount() {
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor(Colors.mineShaft);
            }
        }

        render() {
            return <InnerComponent {...this.state} {...this.props} />;
        }
    }

    HeaderHOC.defaultProps = {
        isDarkMode: true,
        hideLeaderBoard: false,
    };

    HeaderHOC.propTypes = {
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        mode: PropTypes.string.isRequired,
        isDarkMode: PropTypes.bool,
        hideLeaderBoard: PropTypes.bool,
    };

    function mapStateToProps({
        gamification,
        plan,
        profile,
        unreadNotifications,
        userRole,
    }) {
        return {
            gamification,
            plan,
            profile,
            unreadNotifications,
            userRole,
        };
    }

    return connect(mapStateToProps)(HeaderHOC);
};

export default HeaderHOCWrapper;
