import React from 'react';
import {View, StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Layout } from '../../../constants';
import {ScreenScrollView, BottomBarTemplate, Button} from '../../layout';
import PaywallHeader from './PaywallHeader';
import IntroductionVideo from './IntroductionVideo';
import CoachesSwiper from './CoachesSwiper';
import TestimonialsSwiper from './TestimonialsSwiper';
import BenefitsSwiper from './BenefitsSwiper';
import backgroundImage from '../../../assets/images/paywall/ball-background.jpg';

const Paywall = () => {
    const navigation = useNavigation();
    const handleSubscribePress = () => {
        navigation.push('Plans');
    };

    return (
        <BottomBarTemplate
            bottomBar={
                <Button onPress={handleSubscribePress}>
                    Start Your 7 Day Trial Now!
                </Button>
            }>
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImage}>
                <ScreenScrollView style={styles.scrollView}>
                    <SafeAreaView />
                    <View style={styles.container}>
                        <PaywallHeader
                            style={styles.section}
                            title="Train like a professional. Anytime, Anywhere!"
                            back={{
                                screen: 'Main',
                                params: {
                                    screen: 'Progress',
                                },
                            }}
                        />
                        <IntroductionVideo style={styles.section} />
                        <BenefitsSwiper style={styles.section} />
                        <CoachesSwiper style={styles.section} />
                        <TestimonialsSwiper style={styles.section} />
                    </View>
                </ScreenScrollView>
            </ImageBackground>
        </BottomBarTemplate>
    );
};

export default Paywall;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Layout.padding,
        alignItems: 'stretch',
    },
    section: {
        marginBottom: Layout.padding * 2,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    scrollView: {
        backgroundColor: 'transparent',
    },
});
