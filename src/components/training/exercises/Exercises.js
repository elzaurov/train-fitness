import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import ExerciseTeaser from './ExerciseTeaser';
import ExerciseTeaserLoading from './ExerciseTeaserLoading';
import {ScrollFlatList} from '../../layout';
import ExercisesHOC from './ExercisesHOC';

const Exercises = ({
  categories,
  isListSequencial,
  navigation,
  loading,
  exercises,
  onToggleListOptions,
  t,
}) => {
  const loadingItem = [{key: '0'}, {key: '1'}, {key: '2'}];

  return (
    <ScrollFlatList
      searchPlaceholder={t('searchPlaceholder')}
      startWithSequencialList={isListSequencial}
      categoriesList={categories}
      data={loading ? loadingItem : exercises}
      renderItem={({item}) => {
        if (loading) {
          return <ExerciseTeaserLoading />;
        }

        return (
          <ExerciseTeaser
            categories={
              categories
                ? [
                    ...categories.filter(({key}) =>
                      item.categories.includes(key),
                    ),
                  ]
                : []
            }
            exercise={item}
            isListSequencial={isListSequencial}
            onPress={() =>
              navigation.push('Exercise', {
                id: item.key,
                name: item.name,
                disableTimer: true,
              })
            }
          />
        );
      }}
      onToggleListOptions={onToggleListOptions}
    />
  );
};

Exercises.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  isListSequencial: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleListOptions: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

Exercises.defaultProps = {
  categories: undefined,
};

export default ExercisesHOC(withTranslation('exercisesComponent')(Exercises));
