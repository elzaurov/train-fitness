import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {BoldText} from '../../layout';
import {Layout, Colors} from '../../../constants';

const PostTitle = ({title}) => (
    <View style={styles.container}>
        <BoldText style={styles.title}>{title}</BoldText>
    </View>
);

export default PostTitle;

PostTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: Layout.margin,
        marginRight: Layout.margin,
        marginBottom: 12,
    },
    title: {
        fontSize: 22,
        color: Colors.text,
    },
});
