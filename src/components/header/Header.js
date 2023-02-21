import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes, SafeAreaView} from 'react-native';
import {Layout} from '../../constants';

const HEADER_HEIGHT = 48;

const Header = ({left, right, middle, style}) => (
    <View style={[styles.container, style]}>
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.actionContainer}>{left}</View>
                <View style={styles.middleContainer}>{middle}</View>
                <View style={styles.actionContainer}>{right}</View>
            </View>
        </SafeAreaView>
    </View>
);

Header.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
    middle: PropTypes.node,
    style: ViewPropTypes.style,
};

Header.defaultProps = {
    left: null,
    right: null,
    middle: null,
    style: null,
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    safeAreaContainer: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        padding: Layout.padding / 2,
        height: HEADER_HEIGHT + Layout.padding,
    },
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: HEADER_HEIGHT,
        height: HEADER_HEIGHT,
        flex: 0,
    },
    middleContainer: {
        justifyContent: 'center',
        flex: 1,
        height: HEADER_HEIGHT,
    },
});
