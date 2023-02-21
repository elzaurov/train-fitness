import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import {TitleText, FlatButton} from '../layout';
import {BrowseActivitiesLoading} from '../loading';
import BrowseActivities from './BrowseActivities';
import BrowseTile from './BrowseTile';
import BrowseSection from './BrowseSection';
import {Colors} from '../../constants';
import BrowseHOC from './BrowseHOC';

const Browse = ({loading, catalog, onSelect, onSeeAllPress}) => {
    if (loading) {
        return <BrowseActivitiesLoading />;
    }

    if (!catalog) {
        return (
            <View style={styles.placeholder}>
                <TitleText>No Content Available!</TitleText>
            </View>
        );
    }

    const renderItem = ({item}) => {
        const {activities, size, id, ...rest} = item;
        return (
            <BrowseSection
                {...rest}
                action={
                    <FlatButton onPress={() => onSeeAllPress(id)}>
                        See All
                    </FlatButton>
                }>
                <BrowseActivities
                    size={size}
                    renderItem={activity => <BrowseTile {...activity} />}
                    data={activities}
                    onSelect={onSelect}
                />
            </BrowseSection>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={catalog.sections}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

Browse.propTypes = {
    loading: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSeeAllPress: PropTypes.func.isRequired,
    catalog: PropTypes.shape({
        activities: PropTypes.array,
        size: PropTypes.string,
    }),
};

Browse.defaultProps = {
    catalog: null,
};

export default BrowseHOC(Browse);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
    },
    section: {
        marginTop: 12,
        marginBottom: 32,
    },
    placeholder: {
        backgroundColor: Colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
