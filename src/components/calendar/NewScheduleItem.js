/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {RegularText} from '../layout';
import {PremiumWrapper} from '../premium';
import {UIBadge} from '../common';
import {Colors, Layout} from '../../constants';
import NewScheduleItemHOC from './NewScheduleItemHOC';

const NewScheduleItem = ({
    isListSequencial,
    navigation,
    scheduleItem,
    onAddPress,
}) => {
    const {id, name, thumbnail, type, isPremium, isNew, sizedImages} =
        scheduleItem;
    let url = type
        ?.replace(/(^|-)(\w)/g, c => c.toUpperCase())
        ?.replace(/-/g, '');

    if (type === 'team') {
        url = 'CrossTraining';
    }

    return (
        <TouchableOpacity
            onPress={() => {
                const params = {
                    id,
                    type,
                    onAddToCalendarPress: onAddPress,
                };
                if (url === 'Course') {
                    params.viewMode = 'preview';
                }
                navigation.push(url, params);
            }}
            style={styles.scheduleItem}>
            <PremiumWrapper isPremium={isPremium} overlay showContent>
                <View
                    style={[
                        styles.wrapper,
                        isListSequencial ? styles.wrapperSequencial : {},
                    ]}>
                    <Image
                        style={
                            isListSequencial
                                ? styles.thumbnailSequencial
                                : styles.thumbnail
                        }
                        source={sizedImages || {uri: thumbnail}}
                    />
                    <View
                        style={
                            isListSequencial
                                ? styles.nameWrapperSequencial
                                : styles.nameWrapper
                        }>
                        <RegularText style={styles.name} numberOfLines={2}>
                            {name}
                        </RegularText>
                        {isNew ? <UIBadge text="New" size="small" /> : null}
                    </View>
                    <View style={isListSequencial ? {} : styles.addItem}>
                        <PremiumWrapper isPremium={isPremium}>
                            <TouchableOpacity
                                onPress={onAddPress}
                                isPremium={isPremium}
                                style={
                                    isListSequencial
                                        ? styles.addButtonSequencial
                                        : styles.addButton
                                }>
                                <MaterialCommunityIcons
                                    style={isListSequencial ? {} : styles.icon}
                                    name="calendar-plus"
                                    size={32}
                                    color={Colors.secondary}
                                />
                            </TouchableOpacity>
                        </PremiumWrapper>
                    </View>
                </View>
            </PremiumWrapper>
        </TouchableOpacity>
    );
};

NewScheduleItem.propTypes = {
    isListSequencial: PropTypes.bool.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    scheduleItem: PropTypes.objectOf(PropTypes.any).isRequired,
    onAddPress: PropTypes.func.isRequired,
};

export default NewScheduleItemHOC(NewScheduleItem);

const styles = StyleSheet.create({
    scheduleItem: {
        marginBottom: Layout.margin,
    },
    wrapper: {
        backgroundColor: Colors.white,
        borderRadius: 2,
    },
    wrapperSequencial: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    thumbnail: {
        height: Layout.window.width - Layout.padding * 2,
        width: Layout.window.width - Layout.padding * 2,
    },
    thumbnailSequencial: {
        width: 72,
        height: 72,
    },
    nameWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Layout.window.width - Layout.padding * 2,
        overflow: 'hidden',
        alignItems: 'center',
        flex: 1,
    },
    nameWrapperSequencial: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:
            Layout.window.width -
            Layout.padding * 2 -
            72 -
            (38 + Layout.padding),
        overflow: 'hidden',
        alignItems: 'center',
        flex: 1,
    },
    name: {
        color: Colors.black,
        padding: Layout.padding / 2,
        flex: 1,
    },
    addItem: {
        position: 'absolute',
        top: Layout.window.width - Layout.padding * 6,
        right: Layout.padding,
    },
    addButtonSequencial: {
        width: 32 + Layout.padding,
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor: Colors.white,
        borderRadius: 16 + Layout.padding / 2,
        width: 32 + Layout.padding,
        height: 32 + Layout.padding,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginTop: 4,
    },
    newBadge: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        elevation: 1,
    },
});
