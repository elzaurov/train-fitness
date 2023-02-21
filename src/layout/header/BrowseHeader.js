import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Input, SafeArea, IconButton} from '../../components/layout';
import BrowseHeaderHOC from './BrowseHeaderHOC';
import {Colors} from '../../constants';

const BrowseHeader = ({
    filter,
    onFilterChange,
    onInputFocus,
    onCancelPress,
    showResult,
}) => {
    let addon = null;

    if (showResult) {
        addon = <IconButton icon="close-circle" onPress={onCancelPress} />;
    }

    return (
        <SafeArea
            style={[styles.container, showResult ? styles.hasResult : null]}>
            <View style={styles.inputWrapper}>
                <Input
                    placeholder="Title, keyword, ..."
                    icon="magnify"
                    value={filter}
                    onChangeText={onFilterChange}
                    onFocus={onInputFocus}
                    addon={addon}
                />
            </View>
        </SafeArea>
    );
};

BrowseHeader.propTypes = {
    filter: PropTypes.string,
    showResult: PropTypes.bool,
    onFilterChange: PropTypes.func.isRequired,
    onInputFocus: PropTypes.func.isRequired,
    onCancelPress: PropTypes.func.isRequired,
};

BrowseHeader.defaultProps = {
    filter: '',
    showResult: false,
};

export default BrowseHeaderHOC(BrowseHeader);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
    },
    inputWrapper: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    hasResult: {
        backgroundColor: Colors.mineShaft,
    },
});
