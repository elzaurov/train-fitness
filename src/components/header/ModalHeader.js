import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {RegularText, IconButton} from '../layout';
import {Colors, Layout} from '../../constants';

const ModalHeader = ({scene, back, navigation}) => (
    <View style={styles.container}>
        <SafeAreaView>
            <View style={styles.contentContainer}>
                <RegularText style={styles.title} numberOfLines={1}>
                    {decodeURIComponent(scene.route.params?.title || scene.route.params?.params?.title)}
                </RegularText>
                <IconButton
                    icon="close"
                    iconSize={24}
                    style={styles.icon}
                    onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        } else if (back) {
                            navigation.replace(back.screen, back.params || {});
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    </View>
)

ModalHeader.propTypes = {
    scene: PropTypes.object,
    back: PropTypes.object,
    navigation: PropTypes.object.isRequired,
};

ModalHeader.defaultProps = {
    scene: {},
    back: null,
};

export default ModalHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.mineShaft,
    },
    contentContainer: {
        padding: Layout.padding / 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 18,
    },
    icon: {
        marginRight: 0,
        padding: Layout.padding / 2,
    },
});
