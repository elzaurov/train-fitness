import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { CommonActions, TabActions } from '@react-navigation/native';

const PostImageHOCWrapper = (InnerComponent) => {
  class PostImageHOC extends Component {
    static state = {
      loading: true,
    };

    async componentDidMount() {
      this.setState({
        loading: false,
      });
    }

    handlePressActivity = () => {
      const { post, navigation } = this.props;
      const { category, metadata } = post;


      const isTeam =
        metadata && metadata.url ? metadata.url.includes('/team/') : false;

      const postKey =
        metadata && metadata.key
          ? metadata.key
          : metadata && metadata.url
          ? metadata.url.split('/').pop()
          : null;

      if (postKey) {
        let screen;
        switch (category) {
          case 'Cross Trainings':
            screen = 'CrossTraining';
            break;
          case 'Workouts':
            screen = 'Workout';
            break;
          case 'Courses':
            screen = 'Course';
            break;
        }

        // Prevent crashing while opening post that containg category as ID and not string
        // catagory with ID => Created from Web
        // category with String => Created from mobile
        if (screen) {
          navigation.navigate(screen, { id: postKey, type: isTeam ? 'team' : 'cross-training' });
        }
      }
    };

    render() {
      const {post} = this.props;

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          imageURL={post.imageURL}
          thumbnail={post.metadata ? post.metadata.thumbnail : null}
          onPressActivity={this.handlePressActivity}
        />
      );
    }
  }

  PostImageHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    post: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return PostImageHOC;
};

export default PostImageHOCWrapper;
