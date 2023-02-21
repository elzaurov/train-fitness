import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {colors} from '@traineffective/te-component-library';
import {
    Tracker,
    SetDailyGoal,
    TrackerLoading,
    AskReview,
    Modal,
} from '../../components';
import TrackerScreenHOC from './TrackerScreenHOC';
import {Colors, Layout} from '../../constants';

const TrackerScreen = props => {
    const {
        schedule,
        dailyGoal,
        isLoading,
        modalVisible,
        showAskReview,
        onCancel,
    } = props;

    if (isLoading) {
        return <TrackerLoading {...props} />;
    }

    const hasDefaultDailyGoal = !!(dailyGoal && dailyGoal.default);

    const trackerContent = (
        <View style={styles.container}>
            <Modal modalVisible={modalVisible} onClose={onCancel}>
                <SetDailyGoal
                    onSetGoal={onCancel}
                    navigation={props.navigation}
                />
            </Modal>
            {schedule && hasDefaultDailyGoal ? (
                <Tracker {...props} />
            ) : (
                <View style={styles.setDailyGoalContainer}>
                    <SetDailyGoal navigation={props.navigation} />
                </View>
            )}
            {showAskReview && <AskReview />}
        </View>
    );

    return trackerContent;
};

TrackerScreen.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    dailyGoal: PropTypes.shape({
        default: PropTypes.number,
        days: PropTypes.object,
    }),
    schedule: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    showAskReview: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

TrackerScreen.defaultProps = {
    dailyGoal: null,
    schedule: null,
};

export default TrackerScreenHOC(TrackerScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grey[800],
    },
    setDailyGoalContainer: {
        marginTop: 'auto',
        marginBottom: 'auto',
        padding: Layout.padding * 2,
    },
    tabs: {
        backgroundColor: Colors.mineShaft,
        borderBottomWidth: 1,
        borderColor: Colors.separator,
    },
});
