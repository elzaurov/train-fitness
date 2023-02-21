import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {loadUserProfile} from '../../../actions';

const PostHeaderHOCWrapper = InnerComponent => {
    class PostHeaderHOC extends Component {
        static state = {
            loading: true,
        };

        async componentDidMount() {
            const {post} = this.props;

            if (!post.userName || !post.userPhotoURL || !post.userLevel) {
                await this.props.loadUserProfile(post.uid);
            }

            this.setState({
                loading: false,
            });
        }

        handlePress = () => {
            const {navigation, post, profile} = this.props;
            if (profile.uid !== post.uid) {
                navigation.push('Profile', {uid: post.uid});
            }
        };

        render() {
            const {profile, profiles, post} = this.props;
            const createdDate = moment.utc(
                post?.editedAt || post?.createdAt,
                'x',
            );
            const dateDiff = moment().diff(createdDate, 'days');
            const date =
                dateDiff >= 30
                    ? createdDate.format('ll')
                    : createdDate.fromNow();

            const actionEnabled = profile.uid === post.uid || profile.isAdmin;
            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    createdAt={date}
                    actionEnabled={actionEnabled}
                    postProfile={
                        profile.uid === post.uid
                            ? {...profile, ...profiles[post.uid]}
                            : profiles[post.uid] || {}
                    }
                    handlePressAvatar={this.handlePress}
                />
            );
        }
    }

    function mapStateToProps({profile, profiles}) {
        return {profile, profiles};
    }

    PostHeaderHOC.propTypes = {
        post: PropTypes.objectOf(PropTypes.any).isRequired,
        profile: PropTypes.objectOf(PropTypes.any).isRequired,
        profiles: PropTypes.any.isRequired,
        loadUserProfile: PropTypes.func.isRequired,
    };

    return connect(mapStateToProps, {
        loadUserProfile,
    })(PostHeaderHOC);
};

export default PostHeaderHOCWrapper;
