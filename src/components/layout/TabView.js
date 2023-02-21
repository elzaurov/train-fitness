import React from 'react';
import {Platform, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {TabView, ScrollPager} from 'react-native-tab-view';
import TabViewHOC from './TabViewHOC';

const onRenderPager = platform => {
    if (platform !== 'ios') {
        return undefined;
    }
    return pagerProps => <ScrollPager {...pagerProps} swipeEnabled={false} />;
};

const TabViewComponent = ({index, routes, onIndexChange, ...props}) => {
    return (
        <TabView
            {...props}
            navigationState={{index, routes}}
            onIndexChange={onIndexChange}
            renderPager={onRenderPager(Platform.OS)}
            initialLayout={{width: Dimensions.get('window').width}}
        />
    );
};

TabViewComponent.propTypes = {
    index: PropTypes.number.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onIndexChange: PropTypes.func.isRequired,
    outerHandleIndexChange: PropTypes.func
};

export default TabViewHOC(TabViewComponent);
