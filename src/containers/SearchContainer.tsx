import React, {FC, useEffect, useState} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {TrainingSearchWrapper} from '@traineffective/te-component-library';
import {USER_ROLE_FREE} from '../constants';

import {
    setShowModal,
    setSearchFilter,
    setShowSearchResult,
    loadCalendarTeasers,
    toggleWatchMonth,
    addScheduleItem,
} from '../actions';
import Fuse from 'fuse.js';
import {DATE_FORMAT} from '../constants';

interface SearchContainerProps {
    navigation?: any;
}

export const SearchContainer: FC<SearchContainerProps> = ({navigation}) => {
    // need to handle container for Specific type of search according to type (Courses, Exercises, Workout)
    // Once we have the second flow need to some changes

    const dispatch = useDispatch();
    const userMembership = useSelector<any, any>(state => state.userRole);

    const showSearchModal = useSelector<any, any>(
        state => state.search.showSearchModal,
    );
    const trackerScreenInfo = useSelector<any, any>(
        state => state.trackerScreenInfo,
    );
    const showResult = useSelector<any, any>(state => state.search.showResult);
    const calendarTeasers = useSelector<any, any>(
        state => state.calendarTeasers,
    );
    const [searchText, setSearchText] = useState<any>();

    useEffect(() => {
        dispatch(loadCalendarTeasers());
        return () => {};
    }, []);

    const resetSearchContainer = () => {
        // resetting state to initial values
        dispatch(setShowModal(false));
        dispatch(setShowSearchResult(false));
        setSearchText('');
    };

    const onCancelButton = () => {
        resetSearchContainer();
    };

    const onSearch = filter => {
        if (filter === '') {
            dispatch(setShowSearchResult(false));
            setSearchText('');
        } else {
            setSearchText(filter);
            dispatch(setSearchFilter(filter));
        }
    };

    const onPressCalendarArrowsButton = (type, month) => {
        dispatch(toggleWatchMonth(type, month));
    };

    const scheduleCourse = ({scheduleItem, date}) => {
        dispatch(
            addScheduleItem({
                date,
                scheduleItem,
                callback: navigation.navigate('Progress'),
            }),
        );
    };

    const onCalenderSelected = (day, scheduleItem) => {
        resetSearchContainer();
        scheduleCourse({
            scheduleItem,
            date: moment(day).format(DATE_FORMAT),
        });
    };

    const onItemPress = itemObj => {
        // logic to navigate user to different screen according to url
        const {type, id, isLocked} = itemObj;
        if (isLocked) {
            navigation.push('Paywall');
            resetSearchContainer();
        } else {
            let url = type
                ?.replace(/(^|-)(\w)/g, c => c.toUpperCase())
                ?.replace(/-/g, '');
            const params = {
                id: itemObj?.key,
                scheduleId: itemObj.scheduleId,
                date: itemObj.date,
                type: type,
            };
            if (type === 'team') {
                url = 'CrossTraining';
            }
            if (url === 'Course') {
                params['viewMode'] = 'preview';
                params['onAddToCalendarPress'] = () => {
                    navigation.push('CourseVideos', {
                        id: itemObj?.key,
                        type,
                        viewMode: 'learning',
                    });
                };
            } else if (url === 'CrossTraining') {
                url = 'CrossTrainingPreview';
            } else if (url === 'Workout') {
                url = 'WorkoutPreview';
            }

            navigation.navigate(url, params);
            resetSearchContainer();
        }
    };

    // Search Logic , taken reference from ScrollFlatListHOC

    let searchedData = [];

    if (searchText && searchText.length > 2) {
        const options = {keys: ['name']};
        const fuse = new Fuse(calendarTeasers, options);
        searchedData = fuse.search(searchText)?.map(({item}) => {
            // need to change the object creation once dataStructure get change on firebase
            return {
                ...item,
                key: item.key,
                thumbnail: item.thumbnail,
                duration: 7, // using static as no duration was present
                title: item.name,
                isLocked: item.isPremium && userMembership === USER_ROLE_FREE,
                skills: ['Coordination', 'Strength'], // using static as dat is not present
            };
        });
    }

    return (
        <TrainingSearchWrapper
            onSearch={onSearch}
            visible={showSearchModal}
            onItemPress={onItemPress}
            showNoResults={!showResult}
            searchResults={searchedData}
            onCancelButton={onCancelButton}
            trackerScreenInfo={trackerScreenInfo}
            onCalenderSelected={onCalenderSelected}
            onPressCalendarArrowsButton={onPressCalendarArrowsButton}
        />
    );
};
