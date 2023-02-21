import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {ScrollFlatList} from '../layout';
import NewScheduleItem from './NewScheduleItem';
import NewScheduleItemLoading from './NewScheduleItemLoading';
import NewScheduleHOC from './NewScheduleHOC';

const NewSchedule = ({
    calendarTeasers,
    categories,
    isListSequencial,
    loading,
    navigation,
    date,
    onToggleListOptions,
    t,
}) => {
    const loadingItem = [
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
            startWithSequencialList={isListSequencial}
            categoriesList={categories}
            data={loading ? loadingItem : calendarTeasers}
            renderItem={({item}) => {
                if (loading) {
                    return <NewScheduleItemLoading />;
                }

                return (
                    <NewScheduleItem
                        isListSequencial={isListSequencial}
                        navigation={navigation}
                        scheduleItem={item}
                        date={date}
                    />
                );
            }}
            onToggleListOptions={onToggleListOptions}
        />
    );
};

NewSchedule.propTypes = {
    calendarTeasers: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    isListSequencial: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    date: PropTypes.string.isRequired,
    onToggleListOptions: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default NewScheduleHOC(
    withTranslation('newScheduleComponent')(NewSchedule),
);
