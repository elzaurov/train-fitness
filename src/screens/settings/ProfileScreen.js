import React from 'react';
import {Profile} from '../../components';
import ProfileScreenHOC from './ProfileScreenHOC';

const ProfileScreen = (props) => <Profile {...props} />;

export default ProfileScreenHOC(ProfileScreen);
