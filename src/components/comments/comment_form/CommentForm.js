import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
// import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import {
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    View,
    TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Layout} from '../../../constants';
import {KeyboardView} from '../../layout';
import {UserPhoto} from '../../common';
import CommentFormHOC from './CommentFormHOC';

const CommentForm = ({
    profile,
    submitting,
    text,
    onBlur,
    onChangeText,
    onInputRef,
    onSubmitComment,
    t,
    ...props
}) => (
    <KeyboardView
        keyboardVerticalOffset={Layout.isIphoneX || Layout.isIphoneXR ? 90 : 76}
        style={styles.KBView}>
        <View style={styles.row}>
            <UserPhoto style={styles.avatar} uid={profile.uid} size={36} />
            <TextInput
                style={styles.input}
                placeholder="Write a public comment"
                ref={onInputRef}
                onChangeText={onChangeText}
                value={text}
                onBlur={onBlur}
                multiline
                {...props}
            />
            {text ? (
                <TouchableOpacity
                    style={styles.replyButton}
                    disabled={submitting}
                    onPress={onSubmitComment}>
                    {submitting ? (
                        <ActivityIndicator color={Colors.white} />
                    ) : (
                        <MaterialCommunityIcons
                            name="send"
                            color={Colors.white}
                            size={24}
                        />
                    )}
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.replyButton} onPress={onBlur}>
                    <MaterialCommunityIcons
                        name="close"
                        color={Colors.white}
                        size={24}
                    />
                </TouchableOpacity>
            )}
        </View>
    </KeyboardView>
);

CommentForm.propTypes = {
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    submitting: PropTypes.bool.isRequired,
    text: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onInputRef: PropTypes.func.isRequired,
    onSubmitComment: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
    text: '',
};

export default CommentFormHOC(
    withTranslation('commentFormComponent')(CommentForm),
);

const styles = StyleSheet.create({
    row: {
        backgroundColor: Colors.emperor,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: Layout.padding,
        paddingTop: Layout.halfPadding,
        marginBottom: Layout.extraSpace,
    },
    input: {
        backgroundColor: Colors.emperor,
        color: Colors.white,
        marginLeft: Layout.halfMargin,
        width:
            Layout.window.width - 72 - Layout.halfMargin - Layout.padding * 2,
        minHeight: 40,
        fontFamily: 'TitilliumWeb-Regular',
    },
    replyButton: {
        marginTop: 4,
    },
    KBView: {
        backgroundColor: Colors.emperor,
    },
});
