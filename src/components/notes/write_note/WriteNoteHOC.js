import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Keyboard} from 'react-native';
import {USER_ROLE_PREMIUM} from '../../../constants';
import {
    insertNote,
    loadNote,
    loadLatestNotes,
    loadNotesCategories,
    loadNotesFeelings,
    updateNote,
} from '../../../actions';

const NoteFormHOCWrapper = InnerComponent => {
    const NoteFormHOC = class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                category: null,
                feeling: null,
                uid: null,
                private: false,
                metadata: null,
                text: '',
                imageURL: null,
                submitting: false,
                uploadingImage: false,
                uploadError: null,
                loading: true,
                keyboardOpen: false,
            };
            this.keyboardDidShowListener = Keyboard.addListener(
                'keyboardDidShow',
                this._keyboardDidShow,
            );
            this.keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide',
                this._keyboardDidHide,
            );
        }

        async componentWillUnmount() {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }

        async componentDidMount() {
            const {navigation, userRole} = this.props;
            const {id, isPersonalNote} = this.props.route.params ?? {};

            this.setState({loading: true});

            try {
                const [note] = await Promise.all([
                    this.props.loadNote(id),
                    this.props.loadNotesFeelings(),
                ]);

                if (id) {
                    this.setState({...note, id, isPrivate: note.private});
                } else {
                    const {category, ...metadata} =
                        this.props.route.params?.metadata || {};
                    this.setState({
                        category,
                        metadata,
                        isPersonalNote,
                        isPrivate:
                            userRole !== USER_ROLE_PREMIUM || !!isPersonalNote,
                    });
                }
            } finally {
                this.setState({loading: false});
            }
        }

        _keyboardDidShow = () => {
            this.setState({keyboardOpen: true});
        };

        _keyboardDidHide = () => {
            this.setState({keyboardOpen: false});
        };

        handleChange = (state, value) => {
            this.setState({[state]: value});
        };

        handleImageUpload = () => {
            this.setState({uploadingImage: true});
        };

        handleImageUploaded = imageURL => {
            this.setState({imageURL, uploadingImage: false});
        };

        handleImageUploadError = error => {
            this.setState({
                imageURL: null,
                uploadingImage: false,
                uploadError: String(error),
            });
        };

        handleImageRemove = () => {
            this.setState({imageURL: null});
        };

        handleSubmit = async () => {
            const {navigation} = this.props;
            const {id, text, imageURL, feeling, isPrivate, category, metadata, uid} =
                this.state;

            const note = {
                text,
                imageURL,
                private: isPrivate,
                feeling,
                category,
                metadata,
            };

            this.setState({submitting: true});

            let noteId;

            if (id) {
                await this.props.updateNote({...note, key: id, uid});
                noteId = id;
            } else {
                const {key} = await this.props.insertNote({
                    ...note,
                    private: isPrivate,
                });
                noteId = key;
            }

            const onWriteNote = this.props.route.params?.onWriteNote;

            if (onWriteNote) {
                onWriteNote(noteId);
            }

            navigation.goBack();
        };

        render() {
            const {text, uploadingImage, submitting, isPersonalNote} =
                this.state;

            const disabled = !text || uploadingImage || submitting;
            const canShare = !isPersonalNote;

            return (
                <InnerComponent
                    {...this.state}
                    {...this.props}
                    disabled={disabled}
                    canShare={canShare}
                    onChange={this.handleChange}
                    onSwitchChange={this.handleSwitchChange}
                    onImageUploaded={this.handleImageUploaded}
                    onImageUpload={this.handleImageUpload}
                    onImageUploadError={this.handleImageUploadError}
                    onImageRemove={this.handleImageRemove}
                    onSubmit={this.handleSubmit}
                />
            );
        }
    };

    NoteFormHOC.propTypes = {
        navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        route: PropTypes.object.isRequired,
        notesCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
        notesFeelings: PropTypes.arrayOf(PropTypes.object).isRequired,
        loadNotesCategories: PropTypes.func.isRequired,
        loadNotesFeelings: PropTypes.func.isRequired,
        loadNote: PropTypes.func.isRequired,
        insertNote: PropTypes.func.isRequired,
        updateNote: PropTypes.func.isRequired,
        userRole: PropTypes.string.isRequired,
        loadLatestNotes: PropTypes.func.isRequired,
    };

    function mapStateToProps({notesCategories, notesFeelings, userRole}) {
        return {notesCategories, notesFeelings, userRole};
    }

    return connect(mapStateToProps, {
        loadNotesCategories,
        loadNotesFeelings,
        loadLatestNotes,
        loadNote,
        insertNote,
        updateNote,
    })(NoteFormHOC);
};

export default NoteFormHOCWrapper;
