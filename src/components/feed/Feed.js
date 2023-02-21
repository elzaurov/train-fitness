import React from 'react';
import {FeedLoading} from '@traineffective/te-component-library';
import {StyleSheet, FlatList} from 'react-native';
import {Post} from './posts';
import {Colors} from '../../constants';
import {FlatListBottomLoader} from '../loading';

const Feed = ({
    isLoading,
    latestNotesFilled,
    notesFeelings,
    navigation,
    onLoadMore,
    onLatestNotes,
    updating,
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
        <FlatList
            data={isLoading ? loadingItems : latestNotesFilled}
            extraData={[loadingItems, latestNotesFilled, updating]}
            style={styles.container}
            renderItem={({item}) => {
                if (isLoading) {
                    return <FeedLoading />;
                }
                return (
                    <Post
                        navigation={navigation}
                        post={item}
                        postFeeling={
                            notesFeelings.filter(
                                ({feeling}) => feeling === item.feeling,
                            )[0]
                        }
                    />
                );
            }}
            refreshing={isLoading}
            onRefresh={() => {
                onLatestNotes();
            }}
            keyExtractor={item => item.key}
            onEndReached={onLoadMore}
            onEndReachedThreshold={10}
            ListFooterComponent={() =>
                updating ? <FlatListBottomLoader /> : null
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.feedBackground,
    },
});

export default Feed;
