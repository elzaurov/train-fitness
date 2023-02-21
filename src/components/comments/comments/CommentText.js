import React from 'react';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/compat';
import {Linking, StyleSheet, View} from 'react-native';
import {Colors} from '../../../constants';
import {LinkText, RegularText} from '../../layout';
import {urlify} from '../../../utils';

const CommentText = ({isFirst, navigation, text, replyUserProfile}) => (
    <View style={styles.paragraph}>
        {urlify(text).map((txt, index) => {
            const isLink = txt.includes('http://') || txt.includes('https://');

            const replyUser =
                replyUserProfile?.displayName && isFirst ? (
                    <RegularText
                        style={styles.user}
                        onPress={() =>
                            navigation.push('Profile', {
                                uid: replyUserProfile.uid,
                            })
                        }>
                        @{replyUserProfile.displayName}
                    </RegularText>
                ) : null;

            return isLink ? (
                <View style={styles.row} key={txt + index}>
                    {replyUser}
                    <LinkText onPress={() => Linking.openURL(txt)}>
                        {txt}
                    </LinkText>
                </View>
            ) : (
                <View style={styles.row} key={txt + index}>
                    {replyUser}
                    <RegularText>{txt}</RegularText>
                </View>
            );
        })}
    </View>
);

CommentText.propTypes = {
    isFirst: PropTypes.bool.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    text: PropTypes.string.isRequired,
    replyUserProfile: PropTypes.objectOf(PropTypes.any),
};

CommentText.defaultProps = {
    replyUserProfile: undefined,
};

export default withNavigation(CommentText);

const styles = StyleSheet.create({
    paragraph: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    user: {
        color: Colors.secondary,
        marginRight: 6,
    },
});
