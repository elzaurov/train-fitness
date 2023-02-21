import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withNavigation} from '@react-navigation/compat';
import {loadUserProfile} from '../../actions';

const UserPhotoHOCWrapper = InnerComponent => {
    class UserPhotoHOC extends Component {
        state = {
            loading: true,
        };

        async componentDidMount() {
            const {userName, userPhotoURL, userLevel, uid} = this.props;

            if (!userName && !userPhotoURL && !userLevel) {
                await this.props.loadUserProfile(uid);
            }

            this.setState({loading: false});
        }

        handlePress = () => {
            const {navigation, profile, uid} = this.props;

            if (profile.uid !== uid) {
                navigation.push('Profile', {uid});
            }
        };

        render() {
            const {
                profile,
                profiles,
                uid,
                userLevel,
                gamification,
                userPhotoURL,
            } = this.props;

            const userProfile =
                profile.uid === uid
                    ? {...profiles[uid], ...profile}
                    : profiles[uid] || {};

            const isCurrentUser = profile.uid === uid;
            const profileImageURL = userPhotoURL || userProfile.photoURL;
            const level =
                (profile.uid === uid ? gamification.level : null) ||
                userLevel ||
                (profiles[uid] && profiles[uid].level) ||
                1;

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    level={level}
                    isCurrentUser={isCurrentUser}
                    profileImageURL={profileImageURL}
                    profile={userProfile}
                    onPress={this.handlePress} // TODO: remove this line but check it doesn't break
                    handlePress={this.handlePress} // USE THIS PROP, not the onPress!!!
                />
            );
        }
    }

    function mapStateToProps({profile, profiles, gamification}) {
        return {profile, profiles, gamification};
    }

    UserPhotoHOC.propTypes = {
        uid: PropTypes.string,
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        profile: PropTypes.objectOf(PropTypes.any).isRequired,
        profiles: PropTypes.objectOf(PropTypes.any).isRequired,
        userName: PropTypes.string,
        userPhotoURL: PropTypes.string,
        userLevel: PropTypes.number,
        gamification: PropTypes.objectOf(PropTypes.any).isRequired,
        loadUserProfile: PropTypes.func.isRequired,
    };

    UserPhotoHOC.defaultProps = {
        uid: null,
        userName: null,
        userPhotoURL: null,
        userLevel: null,
    };

    return connect(mapStateToProps, {
        loadUserProfile,
    })(withNavigation(UserPhotoHOC));
};

export default UserPhotoHOCWrapper;
