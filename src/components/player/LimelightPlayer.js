import React from 'react';
import HlsPlayer from './HlsPlayer';
import LimelightPlayerHOC from './LimelightPlayerHOC';

const LimelightPlayer = (props) => <HlsPlayer {...props} />;

export default LimelightPlayerHOC(LimelightPlayer);
