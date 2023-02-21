import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AddPostPhoto} from '@traineffective/te-component-library';
import {Colors, Layout} from '../../constants';
import ImageUploadHOC from './ImageUploadHOC';

const ImageUpload = ({
    imageURL,
    deviceImageURL,
    onUpdateImage,
    onRemoveImage,
    uploadProgress,
    uploading,
    deleting,
}) => {
    const imageSource = uploading ? deviceImageURL : imageURL || null;
    return (
        <AddPostPhoto
            addPhotoText="ADD PHOTO"
            isDeleting={deleting}
            imageUrl={imageSource}
            isUploading={uploading}
            onPressDelete={onRemoveImage}
            onUpdateImage={onUpdateImage}
            uploadProgress={uploadProgress * 100}>
            {imageSource && (
                <FastImage style={styles.image} source={{uri: imageSource}} />
            )}
        </AddPostPhoto>
    );
};

ImageUpload.propTypes = {
    imageURL: PropTypes.string,
    deviceImageURL: PropTypes.string,
    uploading: PropTypes.bool.isRequired,
    uploadProgress: PropTypes.number.isRequired,
    onUpdateImage: PropTypes.func.isRequired,
    onRemoveImage: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
    deleting: PropTypes.bool.isRequired,
};

ImageUpload.defaultProps = {
    file: null,
    imageURL: null,
    deviceImageURL: null,
    style: {},
};

export default ImageUploadHOC(ImageUpload);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.codGray,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'stretch',
    },
    deleteAction: {
        position: 'absolute',
        top: 13,
        right: 13,
    },
    labelText: {
        color: Colors.gray1,
    },
    photoIconContainer: {
        alignItems: 'center',
    },
    progressBarContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: Layout.padding,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: `${Colors.codGray}dd`,
    },
    uploadTitleText: {
        fontSize: 12,
    },
    progressBar: {
        flex: 1,
        height: 4,
        borderRadius: 4,
    },
});
