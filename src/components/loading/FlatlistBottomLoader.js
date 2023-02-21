import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {Colors} from '../../constants';

const FlatListBottomLoader = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color={'#2980b9'}  />
    </View>
);


export default FlatListBottomLoader;

const styles = StyleSheet.create({
    container: {
        padding:30, 
        justifyContent:'center',
        alignItems:'center',
    },
});