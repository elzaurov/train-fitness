import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {ScrollFlatList} from '../../layout';
import {Note, NoteLoading} from '../../notes';
import LatestNotesHOC from './LatestNotesHOC';

const LatestNotes = ({
  loading,
  navigation,
  notesFeelings,
  notes,
  onLoadMore,
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
      // style={styles.list}
      // headerStyle={styles.list}
      // optionsStyle={styles.list}
      hideSearch={true}
      hideListOptions={true}
      onLoadMore={onLoadMore}
      data={loading ? loadingItems : notes}
      renderItem={({item, index, loadingMore}) => {
        if (loading) {
          return <NoteLoading />;
        }

        if (index === notes.length - 1 && loadingMore) {
          return (
            <Fragment>
              <Note
                navigation={navigation}
                note={item}
                category={{label: item.categoryName}}
                feeling={
                  notesFeelings.filter(
                    ({feeling}) => feeling === item.feeling,
                  )[0]
                }
              />
              {loadingItems.map((it, indx) => (
                <NoteLoading key={indx} />
              ))}
            </Fragment>
          );
        }

        return (
          <Note
            navigation={navigation}
            note={item}
            category={{label: item.categoryName}}
            feeling={
              notesFeelings.filter(({feeling}) => feeling === item.feeling)[0]
            }
          />
        );
      }}
    />
  );
};

LatestNotes.propTypes = {
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  notesFeelings: PropTypes.arrayOf(PropTypes.object).isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default LatestNotesHOC(LatestNotes);

const styles = StyleSheet.create({
  list: {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    paddingTop: 0,
  },
});
