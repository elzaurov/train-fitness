import React, {useState} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import {
    Modal as PillarBoxModal,
    ICircleData,
    WeeklyView,
    IProgressBarData,
    TrackerMain,
} from '@traineffective/te-component-library';
import {StackNavigationProp} from '@react-navigation/stack';
import {getPillarModalText} from '../../utils/getPillarModalText';
import {DATE_FORMAT} from '../../constants';
import {IOnBoarding, IProfile, ISchedule} from '../../types';

interface IDailyGoal {
    default: number;
    days: any;
}
interface ITrackerProps {
    dailyGoal: IDailyGoal;
    endDate: string;
    i18n?: any;
    selectedDate: string;
    onDateChange: (date?: string) => void;
    onPressCalendarArrows: (date: any) => void;
    onPressCalendarDate: (date: any) => void;
    onEditPress: (params?: any) => void;
    schedule: ISchedule;
    isUpgrading: boolean;
    remoteConfigs: any; // Complicated
    navigation: StackNavigationProp<any>;
    onBoarding: IOnBoarding;
    onCancel: () => void;
    onGoalTimeChange?: (time?: string) => void;
    onRemoveSchedule?: (activity?: any) => void;
    onSetGoal?: (params?: any) => void;
    profile: IProfile;
    showAskReview: boolean;
    t?: any; // Complicated obj
    upgradeDailyGoal: () => void;
    upgradeSchedule: () => void;
    waiters: any[];
    dailyProgress: {
        total: {
            minutes: number;
            percentage: number;
        };
        pillars: ICircleData[];
        trainings: {
            scheduled: any[];
            completed: any[];
            uncompleted: any[];
        };
    };
    weeklyProgress: {
        daily: IProgressBarData[];
        daysTrainedThisWeek: number;
        goal: {
            days: number;
            hours: number;
            minutes: number;
            totalWeekHours: number;
            totalWeekMinutes: number;
        };
        totalMinutes: {
            fitness: number;
            mentality: number;
            tactics: number;
            technique: number;
        };
    };
    monthlyProgress: {date: string; overview: any[]};
    handleTrainingPress: (
        type: string,
        key: string,
        scheduleId: string,
    ) => void;
    handleDeleteTrainingPress: (
        completed: boolean,
        scheduleId: string,
        stats: {},
        experience: number,
    ) => void;
}

const Tracker: React.FC<ITrackerProps> = props => {
    const {
        selectedDate,
        navigation,
        onDateChange,
        onPressCalendarArrows,
        onPressCalendarDate,
        dailyProgress,
        handleTrainingPress,
        handleDeleteTrainingPress,
        monthlyProgress,
    } = props;

    const [showPillarBoxModal, setShowPillarBoxModal] = useState<boolean>(
        false,
    );

    const [weeklyModal, setWeeklyModal] = useState({
        firstOpen: false,
        visible: false,
    });

    const [modalType, setmodalType] = useState<
        'mentality' | 'technique' | 'fitness' | 'tactics' | null
    >(null);

    return (
        <>
            <View style={{backgroundColor: '#1F2226', flex: 1}}>
                <TrackerMain
                    progressbarData={dailyProgress?.pillars ?? []}
                    showProgressLabel
                    onPressWeekProgress={() => {
                        setWeeklyModal({
                            firstOpen: true,
                            visible: true,
                        });
                    }}
                    minsTrainedText="MINS TRAINED"
                    progressTotalDays={props?.weeklyProgress?.goal?.days ?? 0}
                    progressCurrentDay={
                        props?.weeklyProgress?.daysTrainedThisWeek ?? 0
                    }
                    monthlyProgressOverview={monthlyProgress ?? []}
                    onPressPillarBox={({type}) => {
                        setmodalType(type);
                        setShowPillarBoxModal(true);
                    }}
                    onPressDate={onDateChange}
                    onPressCalendar={selectedItem =>
                        onPressCalendarDate(selectedItem.date)
                    }
                    getCurrentMonth={month => onPressCalendarArrows(month)}
                    selectedCalendarDate={moment(props?.selectedDate)}
                    datePickerText={
                        props?.selectedDate === moment().format(DATE_FORMAT)
                            ? 'Today'
                            : moment(props?.selectedDate).format('Do MMMM')
                    }
                    minsTrained={dailyProgress?.total?.minutes ?? 0}
                    onPressAddTraining={() =>
                        navigation.push('NewSchedule', {
                            date: selectedDate,
                        })
                    }
                    settingsOnPress={() => {
                        navigation.push('GoalSettings');
                    }}
                    completed={dailyProgress?.trainings?.completed ?? []}
                    uncompleted={dailyProgress?.trainings?.uncompleted ?? []}
                    scheduled={dailyProgress?.trainings?.scheduled ?? []}
                    handleTrainingPress={handleTrainingPress}
                    handleDeleteTrainingPress={handleDeleteTrainingPress}
                />
            </View>
            {modalType && (
                <PillarBoxModal
                    onModalHide={() => {
                        setmodalType(null);
                        if (weeklyModal.firstOpen) {
                            setWeeklyModal(prev => ({
                                ...prev,
                                visible: true,
                            }));
                        }
                    }}
                    visible={showPillarBoxModal}
                    onClose={() => setShowPillarBoxModal(false)}
                    type={modalType as any}
                    descriptionHeader="Pillar description"
                    descriptionText={getPillarModalText(modalType!)}
                />
            )}
            <WeeklyView
                onModalHide={() => {
                    modalType && setShowPillarBoxModal(true);
                    setWeeklyModal(prev => ({
                        ...prev,
                        visible: false,
                    }));
                }}
                dataSource={props?.weeklyProgress}
                totalMinutes={props?.weeklyProgress?.totalMinutes}
                handleBackButtonPress={() => {
                    setWeeklyModal(() => ({
                        firstOpen: false,
                        visible: false,
                    }));
                }}
                onPressPillarBox={({type}) => {
                    setWeeklyModal(prev => ({
                        ...prev,
                        visible: !prev.visible,
                    }));
                    setmodalType(type);
                }}
                toggleWeeklyView={() => {
                    setWeeklyModal(prev => ({
                        ...prev,
                        visible: !prev.visible,
                    }));
                }}
                visible={weeklyModal.visible}
            />
        </>
    );
};

export default Tracker;
