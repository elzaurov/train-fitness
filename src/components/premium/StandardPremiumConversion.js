import React from 'react';
import { withTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import centerImage from '../../assets/images/paywall/pro-conversion-center.jpg';
import Colors from '../../constants/Colors';
import { FlatButton } from '../layout';



const StandardPremiumConversion = ({ t, handlePressGoPro, handlePressCancel }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.centerImage} source={centerImage} />
            <Text style={styles.headerLabel}>{t('upYourGame')}</Text>
            <Text style={styles.subHeaderLabel}>{t('goProDescription')}</Text>

            <FlatButton style={styles.proButtonStyle} textStyle={styles.proButtonTextStyle} onPress={handlePressGoPro}>
                {t('goPro')}
            </FlatButton>
            <TouchableOpacity onPress={handlePressCancel}><Text style={styles.noLabel}>{t('noThanks')}</Text></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingLeft: '10%',
        paddingRight: '10%',
        backgroundColor: Colors.primary
    },
    centerImage: {
        width: '90%',
        height: '25%',
        resizeMode: 'contain'
    },
    subHeaderLabel: {
        color: Colors.white,
        fontSize: 17,
        textAlign: 'center',
        lineHeight: 25
    },
    headerLabel: {
        color: Colors.white,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: '10%',
        marginBottom: '10%'
    },
    proButtonStyle: {
        backgroundColor: Colors.white,
        borderRadius: 30,
        width: '60%',
        marginTop: '10%'
    },
    proButtonTextStyle: {
        color: Colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: '1%',
        paddingBottom: '1%',
    },
    noLabel: {
        color: Colors.white,
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: '8%'
    }
});

export default withTranslation('paywallScreen')(StandardPremiumConversion);
