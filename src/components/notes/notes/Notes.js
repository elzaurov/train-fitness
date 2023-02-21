import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {ScrollFlatList} from '../../layout';
import Note from './Note';
import NoteLoading from './NoteLoading';
import NotesHOC from './NotesHOC';

const Notes = ({
  loading,
  navigation,
  notesCategories,
  notesFeelings,
  notes,
  t,
}) => {
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
      searchPlaceholder={t('searchPlaceholder')}
      hideListOptions={true}
      showNewItemOption={true}
      onNewPress={() => navigation.push('WriteNote', {isPersonalNote: true})}
      searchOptions={{keys: ['text']}}
      categoriesList={
        loading
          ? [{key: 'all', label: 'All'}]
          : [{key: 'all', label: 'All'}, ...notesCategories]
      }
      data={loading ? loadingItems : notes}
      renderItem={({item}) => {
        if (loading) {
          return <NoteLoading key={`NoteLoading_${item.key}`} />;
        }

        return (
          <Note
            key={`NoteItem_${item.key}`}
            navigation={navigation}
            note={item}
            category={
              notesCategories.filter(({key}) => key === item.category)[0]
            }
            feeling={
              notesFeelings.filter(({feeling}) => feeling === item.feeling)[0]
            }
          />
        );
      }}
    />
  );
};

Notes.propTypes = {
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  notesCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  notesFeelings: PropTypes.arrayOf(PropTypes.object).isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
};

export default NotesHOC(withTranslation('notesComponent')(Notes));
