import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import uuid from 'uuid/v1';
import ImageCropPicker from 'react-native-image-crop-picker';
import {storage} from '../../config';
import {IMAGE_PICKER_OPTIONS} from '../../constants';

const ImageUploadHOCWrapper = InnerComponent => {
    class ImageUploadHOC extends Component {
        state = {
            deviceImageURL: null,
            uploading: false,
            uploadProgress: 0,
            deleting: false,
        };

        handleUpdateImage = async () => {
            const imageId = uuid();
            const {path, onUploaded, onUpload, onError, imagePickerOptions} =
                this.props;

            try {
                onUpload();

                const {mime, path: deviceImageURL} =
                    await ImageCropPicker.openPicker(
                        imagePickerOptions || IMAGE_PICKER_OPTIONS,
                    );

                this.setState({uploading: true, deviceImageURL});

                const {ref} = await uploadToFirebase({
                    path,
                    imageId,
                    deviceImageURL,
                    mime,
                    onUploadProgress: this.handleUploadProgress,
                });

                const downloadURL = await ref.getDownloadURL();

                onUploaded(downloadURL);
            } catch (error) {
                console.error('Image uploading failed', error);
                onError(error);
            } finally {
                this.setState({uploading: false});
            }
        };

        handleRemoveImage = async () => {
            const {imageURL, onRemove} = this.props;

            if (imageURL) {
                try {
                    this.setState({deleting: true});
                    await deleteFromFirebase({imageURL});
                    onRemove();
                } catch (error) {
                    console.error(error);
                    this.setState({error});
                } finally {
                    this.setState({deleting: false});
                }
            }
        };

        handleUploadProgress = ({totalBytes, bytesTransferred}) => {
            this.setState({uploadProgress: bytesTransferred / totalBytes});
        };

        render() {
            return (
                <InnerComponent
                    {...this.props}
                    {...this.state}
                    onUpdateImage={this.handleUpdateImage}
                    onRemoveImage={this.handleRemoveImage}
                />
            );
        }
    }

    ImageUploadHOC.propTypes = {
        path: PropTypes.string.isRequired,
        onUploaded: PropTypes.func,
        onUpload: PropTypes.func,
        onError: PropTypes.func,
        onRemove: PropTypes.func,
        imageURL: PropTypes.string,
        imagePickerOptions: PropTypes.object.isRequired,
    };

    ImageUploadHOC.defaultProps = {
        onUploaded: () => {},
        onUpload: () => {},
        onRemove: () => {},
        onError: () => {},
        imageURL: null,
    };

    const mapStateToProps = ({remoteConfigs}) => ({
        imagePickerOptions: remoteConfigs.image_picker_options,
    });

    return connect(mapStateToProps)(ImageUploadHOC);
};

export default ImageUploadHOCWrapper;

// helpers

const uploadToFirebase = ({
    path,
    imageId,
    deviceImageURL,
    mime,
    onUploadProgress,
}) =>
    new Promise((resolve, reject) =>
        storage
            .ref(`app-images/${path}/${imageId}`)
            .putFile(deviceImageURL, {contentType: mime})
            .on('state_changed', onUploadProgress, reject, resolve),
    );

const deleteFromFirebase = async ({imageURL}) => {
    const ref = storage.refFromURL(imageURL);

    // temporary solution for the rnfirebase bug
    await storage.ref(ref.fullPath).delete();
};
