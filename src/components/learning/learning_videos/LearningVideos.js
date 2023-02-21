import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import LearningVideoTeaser from './LearningVideoTeaser'
import LearningVideoTeaserLoading from './LearningVideoTeaserLoading';
import {ScrollFlatList} from '../../layout';
import LearningVideosHOC from './LearningVideosHOC';

const LearningVideos = ({
  categories,
  courses,
  isListSequencial,
  navigation,
  learningVideos,
  learningVideosPath,
  loading,
  onToggleListOptions,
  t,
}) => {
  const loadingItem = [{key: '0'}, {key: '1'}, {key: '2'}];

  return (
    <ScrollFlatList
      searchPlaceholder={t('searchPlaceholder')}
      categoriesList={loading ? [] : categories}
      data={loading ? loadingItem : learningVideos}
      renderItem={({item}) => {
        if (loading) {
          return <LearningVideoTeaserLoading />;
        }

        return (
          <LearningVideoTeaser
            learningVideo={item}
            isListSequencial={isListSequencial}
            onPress={() =>
              navigation.push('Learning', {
                id: item.key,
                videoPath: learningVideosPath,
              })
            }
          />
        );
      }}
      onToggleListOptions={onToggleListOptions}
    />
  );
};

LearningVideos.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  isListSequencial: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  learningVideos: PropTypes.arrayOf(PropTypes.object).isRequired,
  learningVideosPath: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onToggleListOptions: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

LearningVideos.defaultProps = {
  categories: undefined,
};

export default LearningVideosHOC(
  withTranslation('learningVideosComponent')(LearningVideos),
);
