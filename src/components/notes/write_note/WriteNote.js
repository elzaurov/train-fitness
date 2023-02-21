import React, {useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView} from 'react-native';
import {withTranslation} from 'react-i18next';
import {
    AddPostFooter,
    AddPostWrapper,
    AddPostInnerWrapper,
    AddPostTitle,
    AddPostInput,
    HeaderAddPost,
} from '@traineffective/te-component-library';
import {LoadingFullScreen} from '../../loading';
import {RegularText} from '../../layout';
import {ImageUpload} from '../../imageUpload';
import {Colors, Layout} from '../../../constants';
import WriteNoteHOC from './WriteNoteHOC';

const WriteNote = ({
    keyboardOpen,
    text,
    imageURL,
    loading,
    uploadingImage,
    uploadError,
    submitting,
    onChange,
    onImageUploaded,
    onImageUpload,
    onImageUploadError,
    onImageRemove,
    onSubmit,
    t,
    navigation,
    route,
}) => {
    const {params} = route;
    const {onWriteNote = null} = params;

    useLayoutEffect(() => {
        if (!onWriteNote) {
            navigation.setOptions({
                header: () => (
                    <SafeAreaView style={styles.headerWrapper}>
                        <HeaderAddPost
                            onPressCloseIcon={() => navigation.goBack()}
                            onPressCheckIcon={onSubmit}
                            avatarImage="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
                            headerAddText="Edit Post"
                            showCheckIcon
                        />
                    </SafeAreaView>
                ),
            });
        }
    }, [navigation, onWriteNote, onSubmit]);

    if (loading) {
        return <LoadingFullScreen secondary hideImage />;
    }

    const renderButtonText = (isSubmitting, isUploading) => {
        if (isSubmitting) {
            return t('submitting');
        }

        if (isUploading) {
            return t('uploadingImage');
        }

        return 'POST';
    };

    return (
        <AddPostWrapper>
            <AddPostInnerWrapper>
                {onWriteNote && (
                    <AddPostTitle addPostText="Share your new experience with us" />
                )}

                {!keyboardOpen && (
                    <ImageUpload
                        imageURL={imageURL}
                        onUpload={onImageUpload}
                        onUploaded={onImageUploaded}
                        onError={onImageUploadError}
                        onRemove={onImageRemove}
                        path="notes"
                        style={styles.imageContainer}
                    />
                )}
                {uploadError && !imageURL && (
                    <RegularText style={styles.errorText}>
                        Image upload failed
                    </RegularText>
                )}
                <AddPostInput
                    addPostLabel="What are you thinking about?"
                    addPostInputText="Add your thoughts here"
                    onChangeText={value => onChange('text', value)}
                    autoCorrect
                    multiline
                    placeholder="Add your thoughts here"
                    value={text}
                    underlineColorAndroid="transparent"
                    editable={!submitting}
                />
            </AddPostInnerWrapper>
            {onWriteNote && !keyboardOpen && (
                <AddPostFooter
                    onPressButton={onSubmit}
                    addPostFooterText={renderButtonText(
                        submitting,
                        uploadingImage,
                    )}
                />
            )}
        </AddPostWrapper>
    );
};

WriteNote.propTypes = {
    keyboardOpen: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    feeling: PropTypes.string,
    isPrivate: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    uploadingImage: PropTypes.bool.isRequired,
    uploadError: PropTypes.string,
    notesFeelings: PropTypes.arrayOf(PropTypes.object).isRequired,
    submitting: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onImageUploaded: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func.isRequired,
    onImageUploadError: PropTypes.func.isRequired,
    onImageRemove: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    canShare: PropTypes.bool.isRequired,
    imageURL: PropTypes.string,
    t: PropTypes.func.isRequired,
};

WriteNote.defaultProps = {
    feeling: null,
    initCategoryValue: null,
    file: null,
    imageURL: null,
    uploadError: null,
    isPrivate: false,
};

export default WriteNoteHOC(withTranslation('writeNoteComponent')(WriteNote));

const styles = StyleSheet.create({
    headerWrapper: {
        marginBottom: 20,
    },
    imageContainer: {
        marginBottom: 10,
        marginLeft: Layout.padding,
        marginRight: Layout.padding,
        borderRadius: 8,
        height: 200,
    },
    input: {
        maxHeight: 150,
        margin: Layout.padding,
        backgroundColor: Colors.background,
        padding: Layout.padding,
        minHeight: 150,
        color: Colors.gray1,
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 16,
        borderRadius: 8,
    },
    button: {
        backgroundColor: Colors.secondary2,
    },
    select: {
        backgroundColor: Colors.mineShaft,
    },
    doneButton: {
        marginLeft: Layout.padding,
        marginRight: Layout.padding,
    },
    errorText: {
        padding: Layout.padding,
        color: Colors.secondary,
    },
});
