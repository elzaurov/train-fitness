import React from 'react';
import HlsPlayer from './HlsPlayer';
import VimeoPlayerHOC from './VimeoPlayerHOC';

const VimeoPlayer = (props) => <HlsPlayer {...props} />;

export default VimeoPlayerHOC(VimeoPlayer);
