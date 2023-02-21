import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Header} from '../../layout';
import moment from 'moment';

import {
    SessionListWrapper,
    colors,
    HalfModal,
    Calendar,
} from '@traineffective/te-component-library';
import SingleExerciseImage from '../../assets/images/train/SingleExerciseImage.png';
import {loadActivitiesList} from '../../actions';
import {DATE_FORMAT, MONTH_FORMAT} from '../../constants';


const TrainSessionListScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const activitiesList = useSelector(state => state.training.activitiesList);
    const trackerScreenInfo = useSelector(state => state.trackerScreenInfo);


    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedBox, setSelectedBox] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(
        moment().format(MONTH_FORMAT),
    );
    const [scheduleItem, setScheduleItem] = useState({});

    useEffect(() => {
        const {routes, index} = navigation.getState();
        dispatch(loadActivitiesList(routes[index].params.key));
        return () => {};
    }, []);

    const handleCalendar = item => {
        const {isLocked} = item;
        if (!isLocked) {
            setScheduleItem(item);
            setShowCalendar(true);
        }
    };

    const onDateSelect = date => {
        scheduleCourse({scheduleItem, date});
    };

    const onPressCalendarArrows = month => {
        if (month && month !== selectedMonth) {
            setSelectedMonth(month);
            dispatch(toggleWatchMonth('once', month));
        }
    };
    const handlePressBack = () => {
        navigation.goBack();
    };
    return (
        <>
            <SessionListWrapper
                headerTitle='Fitness Exercises'
                exercises={activitiesList}
                handlePressBack={handlePressBack}
                handleCalendar={handleCalendar}
                onItemPress={() => console.log('pressed')}
            />
            <HalfModal
                toggleModal={() => {
                    setShowCalendar(false);
                }}
                height="90%"
                enableSwipeOnClose
                visible={showCalendar}>
                <Calendar 
                    defaultDate={moment(moment().format(DATE_FORMAT))}
                    handlePressDate={selectedBox => {}}
                    events={trackerScreenInfo?.monthlyProgress[selectedMonth]}
                    getCurrentMonth={month => {
                        onPressCalendarArrows(month);
                    }}
                    isScheduleMode
                    onCalendarSet={day => {
                        setShowCalendar(false);
                        
                    }}
                />
            </HalfModal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.grey[800],
    },
});

export default TrainSessionListScreen;
