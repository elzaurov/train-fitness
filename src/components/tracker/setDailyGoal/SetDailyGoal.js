import React from 'react';
import {View, StyleSheet, TextInput, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../constants/Colors';
import {Button, RegularText, TitleText} from '../../layout';
import SetDailyGoalHOC from './SetDailyGoalHOC';
import {Layout} from '../../../constants';
import {GoalSettingsMain} from '@traineffective/te-component-library';

const SetDailyGoal = props => (
    <View style={{height: '100%'}}>
        <GoalSettingsMain {...props} />
    </View>
);

export default SetDailyGoalHOC(SetDailyGoal);

SetDailyGoal.propTypes = {
    goal: PropTypes.object,
    handleNavigateBack: PropTypes.func.isRequired,
    handleSetGoal: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: Colors.emperor,
        fontWeight: 'normal',
        marginTop: 8,
    },
    textInput: {
        backgroundColor: Colors.emperor,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 20,
        borderRadius: 4,
        color: Colors.white,
    },
    button: {
        marginTop: 16,
        width: '100%',
    },
    fields: {
        flexDirection: 'row',
    },
    fieldGroup: {
        flex: 1,
        // padding: 8,
    },
    descriptionText: {
        marginTop: 32,
        fontSize: 16,
    },
    spinnerImage: {
        width: 34,
        height: 34,
    },
});
