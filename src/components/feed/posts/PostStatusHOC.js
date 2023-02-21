import React, {Component} from 'react';
import PropTypes from 'prop-types';

const PostStatusHOCWrapper = (InnerComponent) => {
  class PostStatusHOC extends Component {
    static state = {
      loading: true,
    };

    async componentDidMount() {
      this.setState({
        loading: false,
      });
    }

    render() {
      const {post} = this.props;
      const duration =
        !!post.metadata && !!post.metadata.time
          ? `${Math.round(post.metadata.time)} m`
          : null;
      const experience =
        !!post.metadata && !!post.metadata.experience
          ? `${post.metadata.experience} xp`
          : null;
      const rating =
        !!post.metadata && !!post.metadata.rating ? post.metadata.rating : null;

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          duration={duration}
          experience={experience}
          rating={rating}
        />
      );
    }
  }

  PostStatusHOC.propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return PostStatusHOC;
};

export default PostStatusHOCWrapper;
