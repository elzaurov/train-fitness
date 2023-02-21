import React from 'react';
import {Browse, SearchResult} from '../../components';
import {BrowseHeader} from '../../layout';

const BrowseScreen = () => (
    <>
        <Browse /> 
        <SearchResult />
    </>
);

BrowseScreen.navigationOptions = () => ({
    header: props => <BrowseHeader {...props} />,
});

export default BrowseScreen;
