import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader/native';
import {Colors} from '../../constants';

const Loading = ({children, ...props}) => (
  <ContentLoader
    backgroundColor={Colors.loadingOverlay}
    foregroundColor={Colors.mineShaft}
    width="100%"
    preserveAspectRatio="none"
    {...props}>
    {children}
  </ContentLoader>
);

Loading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Loading;
