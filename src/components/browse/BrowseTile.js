import React from 'react';
import {StyleSheet, View, ViewPropTypes, Image} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../constants';
import {NewBadge} from '../common';
import {PremiumWrapper} from '../premium';
import {RegularText} from '../layout';

const BrowseTile = ({
    thumbnailUrl,
    title,
    duration,
    size,
    badge,
    isPremium,
    isNew,
    style,
}) => (
    <View style={[styles.container, style]}>
        <PremiumWrapper
            isPremium={isPremium}
            overlay
            style={[
                styles.imageContainer,
                {
                    aspectRatio: size === 'large' ? 4 / 3 : 1 / 1,
                },
            ]}>
            {!!isNew && <NewBadge style={styles.newBadge} size={56} />}
            {!!badge && <View style={styles.badgeContainer}>{badge}</View>}
            {!!thumbnailUrl && (
                <Image style={styles.image} source={{uri: thumbnailUrl}} />
            )}
        </PremiumWrapper>
        {!!title && (
            <RegularText
                numberOfLines={1}
                style={[
                    styles.caption,
                    {
                        fontSize: size === 'large' ? 16 : 12,
                    },
                ]}>
                {title}
            </RegularText>
        )}
        {!!duration && (
            <RegularText numberOfLines={1} style={styles.subtitle}>
                {moment.utc(duration * 1000).format('mm:ss')} mins
            </RegularText>
        )}
    </View>
);

BrowseTile.propTypes = {
    thumbnailUrl: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.number,
    size: PropTypes.oneOf(['small', 'large']),
    badge: PropTypes.node,
    style: ViewPropTypes.style,
    isPremium: PropTypes.bool,
    isNew: PropTypes.bool,
};

BrowseTile.defaultProps = {
    thumbnailUrl: null,
    duration: null,
    title: null,
    size: 'small',
    badge: null,
    style: {},
    isPremium: false,
    isNew: false,
};

export default BrowseTile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        backgroundColor: Colors.mineShaft,
        borderRadius: 8,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
    },
    badgeContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    caption: {
        marginTop: 8,
        flex: 1,
        fontSize: 12,
        color: Colors.silver,
    },
    subtitle: {
        marginTop: 4,
        fontSize: 12,
        color: Colors.white,
    },
    newBadge: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 5,
        elevation: 1,
    },
});
