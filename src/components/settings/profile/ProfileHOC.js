import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {uploadFileToFirebase, uploadFileToDevice} from '../../../utils';
import {
  loadMemberProfile,
  updateProfile,
  loadBadges,
  loadBadge,
} from '../../../actions';

const ProfileHOCWrapper = (InnerComponent) => {
  class ProfileHOC extends Component {
    state = {
      avatarSource: null,
      displayNameText: this.props.profile.displayName,
      file: undefined,
      uid: undefined,
      loading: true,
      updating: false,
      badgesFilled: [],
    };

    async componentDidMount() {
      const {profile} = this.props;
      let uid = this.props.route.params?.uid;

      const badges = await this.props.loadBadges();

      const promisesBadgesArray = badges.map((badge) =>
        this.props.loadBadge(badge.key),
      );

      const badgesFilled = await Promise.all(promisesBadgesArray);

      const filteredBadgesFilled = badgesFilled.filter(function (el) {
        return el != null;
      });

      if (uid && profile.uid !== uid) {
        await this.props.loadMemberProfile(uid);
      } else {
        uid = undefined;
      }

      this.setState({
        uid,
        filteredBadgesFilled,
        loading: false,
      });
    }

    handleUpdatePhotoClick = async () => {
      const {localSource, file} = await uploadFileToDevice(this.props.remoteConfigs.image_picker_options);
      this.setState({avatarSource: file.path, file});
    };

    handleCancelPhotoClick = () => {
      this.setState({
        avatarSource: undefined,
        file: undefined,
      });
    };

    handleInputChange = (state, value) => {
      this.setState({[state]: value});
    };

    handleUpdate = () => {
      const {displayNameText, file} = this.state;
      const {profile} = this.props;
      const {displayName, uid} = profile;

      this.setState({updating: true}, () => {
        if (file) {
          uploadFileToFirebase({
            file,
            path: 'avatars',
            fileName: `${uid}.jpeg`,
          }).then((photoURL) => {
            this.props
              .updateProfile({
                displayName: displayNameText || displayName,
                photoURL,
              })
              .then(() => {
                this.setState({
                  updating: false,
                  avatarSource: undefined,
                  file: undefined,
                });
              });
          });
        } else {
          this.props
            .updateProfile({
              displayName: displayNameText,
            })
            .then(() => {
              this.setState({updating: false});
            });
        }
      });
    };

    render() {
      const {uid} = this.state;
      const {gamification, membersProfile, profile, stats} = this.props;
      const memberProfile = membersProfile[uid] || {};

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          gamification={memberProfile.gamification || gamification}
          isMember={!!uid}
          profile={memberProfile.profile || profile}
          stats={memberProfile.stats || stats}
          onUpdatePhotoClick={this.handleUpdatePhotoClick}
          onCancelPhotoClick={this.handleCancelPhotoClick}
          onInputChange={this.handleInputChange}
          onUpdate={this.handleUpdate}
        />
      );
    }
  }

  ProfileHOC.propTypes = {
    gamification: PropTypes.objectOf(PropTypes.any).isRequired,
    membersProfile: PropTypes.objectOf(PropTypes.any).isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    remoteConfigs: PropTypes.objectOf(PropTypes.any).isRequired,
    route: PropTypes.object.isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    stats: PropTypes.objectOf(PropTypes.any).isRequired,
    loadMemberProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    loadBadge: PropTypes.func.isRequired,
    loadBadges: PropTypes.func.isRequired,
  };

  function mapStateToProps({
    gamification,
    membersProfile,
    plan,
    profile,
    stats,
    badges,
    remoteConfigs,
  }) {
    return {
      gamification,
      membersProfile,
      plan,
      profile,
      stats,
      badges,
      remoteConfigs,
    };
  }

  return connect(mapStateToProps, {
    loadMemberProfile,
    updateProfile,
    loadBadges,
    loadBadge,
  })(ProfileHOC);
};

export default ProfileHOCWrapper;
