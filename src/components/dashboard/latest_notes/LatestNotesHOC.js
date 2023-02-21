import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  loadLatestNotes,
  loadLatestNote,
  loadMoreLatestNotes,
  loadNotesCategories,
  loadNotesFeelings,
  watchDeleteLatestNotes,
} from '../../../actions';

const LatestNotesHOCWrapper = (InnerComponent) => {
  class LatestNotesHOC extends Component {
    state = {
      loading: true,
    };

    async componentDidMount() {
      await Promise.all([
        this.props.loadLatestNotes(),
        this.props.loadNotesFeelings(),
        this.props.watchDeleteLatestNotes(),
      ]);

      this.setState({loading: false});
    }

    handleLoadMore = (cb) => {
      const {latestNotes} = this.props;
      const lastIndex = latestNotes.length - 1;
      const lastestCreatedAt = latestNotes[lastIndex].createdAt;

      this.props.loadMoreLatestNotes(lastestCreatedAt).finally(() => {
        if (cb) {
          cb();
        }
      });
    };

    render() {
      const {latestNotes} = this.props;

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          notes={latestNotes}
          onLoadMore={this.handleLoadMore}
        />
      );
    }
  }

  function mapStateToProps({latestNotes, notesFeelings}) {
    return {latestNotes, notesFeelings};
  }

  LatestNotesHOC.propTypes = {
    latestNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadLatestNotes: PropTypes.func.isRequired,
    loadLatestNote: PropTypes.func.isRequired,
    loadMoreLatestNotes: PropTypes.func.isRequired,
    loadNotesCategories: PropTypes.func.isRequired,
    loadNotesFeelings: PropTypes.func.isRequired,
    watchDeleteLatestNotes: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, {
    loadLatestNotes,
    loadLatestNote,
    loadMoreLatestNotes,
    loadNotesCategories,
    loadNotesFeelings,
    watchDeleteLatestNotes,
  })(LatestNotesHOC);
};

export default LatestNotesHOCWrapper;
