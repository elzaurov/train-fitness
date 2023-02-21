import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    loadNotesCategories,
    loadNotesFeelings,
    loadNotes,
} from '../../../actions';

const NotesHOCWrapper = InnerComponent => {
    class NotesHOC extends Component {
        state = {
            loading: true,
        };

        async componentDidMount() {
            await Promise.all([
                this.props.loadNotesCategories(),
                this.props.loadNotesFeelings(),
                this.props.loadNotes(),
            ]);

            this.setState({loading: false});
        }

        render() {
            return <InnerComponent {...this.state} {...this.props} />;
        }
    }

    NotesHOC.propTypes = {
        loadNotesCategories: PropTypes.func.isRequired,
        loadNotesFeelings: PropTypes.func.isRequired,
        loadNotes: PropTypes.func.isRequired,
    };

    function mapStateToProps({notesCategories, notesFeelings, notes}) {
        return {notesCategories, notesFeelings, notes};
    }

    return connect(mapStateToProps, {
        loadNotesCategories,
        loadNotesFeelings,
        loadNotes,
    })(NotesHOC);
};

export default NotesHOCWrapper;
