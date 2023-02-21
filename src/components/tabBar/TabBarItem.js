import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, StyleSheet, ViewPropTypes} from 'react-native';
import {RegularText} from '../layout';
import {Layout, Colors} from '../../constants';

const TabBarItem = ({onPress, text, tintColor, children, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.icon, style]}>
        <View style={styles.tabContainer}>
            {children}
            <RegularText
                style={[styles.label, {color: tintColor}]}
                numberOfLines={1}>
                {text.toUpperCase()}
            </RegularText>
        </View>
    </TouchableOpacity>
);

TabBarItem.propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    text: PropTypes.string,
    tintColor: PropTypes.string,
    style: ViewPropTypes.style,
};

TabBarItem.defaultProps = {
    labelStyle: {},
    tintColor: Colors.mineShaft,
    style: null,
    text: '',
};

export default TabBarItem;

const styles = StyleSheet.create({
    tabContainer: {
        alignItems: 'center',
    },
    label: {
        marginTop: Layout.padding / 3,
        fontSize: 9,
    },
});
