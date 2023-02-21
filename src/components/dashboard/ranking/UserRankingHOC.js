import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withNavigation} from '@react-navigation/compat';
import {loadUserProfile} from '../../../actions';

const UserRankingHOCWrapper = InnerComponent => {
    class UserRankingHOC extends Component {
        state = {
            loading: true,
        };

        async componentDidMount() {
            const {userRanking} = this.props;

            await this.props.loadUserProfile(userRanking.uid);

            this.setState({loading: false});
        }

        handlePress = () => {
            const {navigation, profile, userRanking} = this.props;

            if (profile.uid !== userRanking.uid) {
                navigation.push('Profile', {uid: userRanking.uid});
            }
        };

        shouldComponentUpdate = () => {
            if (!this.state.loading) {
                return false;
            }
            return true;
        };

        render() {
            const {profile, profiles, userRanking} = this.props;
            const {uid} = userRanking;

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    profile={
                        profile.uid === uid
                            ? {...profiles[uid], ...profile}
                            : profiles[uid] || {}
                    }
                    userId={profile.uid}
                    handlePress={this.handlePress}
                />
            );
        }
    }

    function mapStateToProps({profile, profiles}) {
        return {profile, profiles};
    }

    UserRankingHOC.propTypes = {
        userRanking: PropTypes.objectOf(PropTypes.any).isRequired,
        profile: PropTypes.objectOf(PropTypes.any).isRequired,
        profiles: PropTypes.objectOf(PropTypes.any).isRequired,
        loadUserProfile: PropTypes.func.isRequired,
    };

    return connect(mapStateToProps, {loadUserProfile})(
        withNavigation(UserRankingHOC),
    );
};

export default UserRankingHOCWrapper;
