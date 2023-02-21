import React from 'react';
import PropTypes from 'prop-types';
import {BrowseCollection} from '../../components';
import BrowseCollectionScreenHOC from './BrowseCollectionScreenHOC';

const BrowseCollectionScreen = ({id}) => <BrowseCollection id={id} />;

BrowseCollectionScreen.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BrowseCollectionScreenHOC(BrowseCollectionScreen);
