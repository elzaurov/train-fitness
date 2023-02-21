import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {ScrollFlatList} from '../../layout';
import {VideoThumbnail} from '../../common';
import {Layout} from '../../../constants';
import {Comment, CommentLoading} from '../../comments';
import LatestCommentsHOC from './LatestCommentsHOC';

const LatestComments = ({comments, loading, navigation, plan}) => {
  const loadingItems = [
    {key: '0'},
    {key: '1'},
    {key: '2'},
    {key: '3'},
    {key: '4'},
    {key: '5'},
  ];

  return (
    <ScrollFlatList
      // style={styles.list}
      // headerStyle={styles.list}
      // optionsStyle={styles.list}
      hideSearch={true}
      hideListOptions={true}
      data={loading ? loadingItems : comments}
      renderItem={({item, index}) => {
        if (loading) {
          return <CommentLoading />;
        }

        if (index > 0 && comments[index - 1].videoId === item.videoId) {
          return (
            <Comment
              navigation={navigation}
              comment={item}
              type={item.videoId ? 'comments' : 'notes'}
            />
          );
        }

        return (
          <Fragment>
            <VideoThumbnail
              isBasicPlan={plan.isBasic}
              navigation={navigation}
              style={styles.videoThumbnail}
              videoId={item.videoId}
              videoPath={item.type}
            />
            <Comment
              navigation={navigation}
              comment={item}
              type={item.videoId ? 'comments' : 'notes'}
            />
          </Fragment>
        );
      }}
    />
  );
};

LatestComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  plan: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LatestCommentsHOC(LatestComments);

const styles = StyleSheet.create({
  list: {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    paddingTop: 0,
  },
  videoThumbnail: {
    marginBottom: Layout.margin,
  },
});
