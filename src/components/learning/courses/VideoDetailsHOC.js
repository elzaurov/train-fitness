import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadCategories} from '../../../actions';
import {GAMEBRAIN_CATEGORIES} from '../../../constants';

const VideoDetailsHOCWrapper = (InnerComponent) => {
  class VideoDetailsHOC extends Component {
    state = {
      isListSequencial: true,
      loading: true,
    };

    async componentDidMount() {
      const {video} = this.props;
      await this.props.loadCategories(GAMEBRAIN_CATEGORIES);

      this.setState({loading: false});
    }

    render() {
      const {loading} = this.state;
      const {categories, video, categoryType} = this.props;

      let videoCategories = null;

      if (!loading) {
        if (categories[categoryType]) {
          videoCategories = categories[categoryType].filter(
            (c) => c.key === video.category,
          );
        }
      }

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          categories={(videoCategories || []).map(({label}) => label)}
          designedBy={video.designedBy}
        />
      );
    }
  }

  VideoDetailsHOC.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
    categoryType: PropTypes.string.isRequired,
    categories: PropTypes.objectOf(PropTypes.any).isRequired,
    loadCategories: PropTypes.func.isRequired,
  };

  function mapStateToProps({categories}) {
    return {categories};
  }

  return connect(mapStateToProps, {
    loadCategories,
  })(VideoDetailsHOC);
};

export default VideoDetailsHOCWrapper;
