import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet} from 'react-native';
import {Colors, Layout} from '../../constants';

const ScreenScrollView = ({style, children, ...props}) => (
    <ScrollView
        style={[styles.container, style]}
        showsVerticalScrollIndicator={false}
        {...props}>
        {children}
    </ScrollView>
);

ScreenScrollView.propTypes = {
    style: PropTypes.any,
    children: PropTypes.any,
};

ScreenScrollView.defaultProps = {
    style: {},
    children: undefined,
};

export default ScreenScrollView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: Layout.padding,
        backgroundColor: Colors.background,
        paddingBottom: Layout.padding * 2,
    },
});
