import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ViewPropTypes,
    Linking,
} from 'react-native';
import {Layout} from '../../constants';
import {RegularText} from '../layout';

const WelcomeLoginLink = ({style}) => {
    const handlePrivacyPolicyPress = () => {
        Linking.openURL('https://www.traineffective.com/privacy');
    };

    return (
        <View style={[styles.container, style]}>
            <RegularText style={styles.text}>
                © 2021 | Train Effective Ltd |
            </RegularText>
            <RegularText
                style={[styles.text, styles.privacyPolicyText]}
                onPress={handlePrivacyPolicyPress}>
                Privacy Policy
            </RegularText>
        </View>
    );
};

WelcomeLoginLink.propTypes = {
    style: ViewPropTypes.style,
};

WelcomeLoginLink.defaultProps = {
    style: null,
};

export default WelcomeLoginLink;

const styles = StyleSheet.create({
    container: {
        paddingLeft: Layout.padding,
        paddingRight: Layout.padding,
        paddingBottom: Layout.padding,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    privacyPolicyText: {
        fontWeight: 'bold',
        marginLeft: 4,
        marginRight: 4,
    },
});
