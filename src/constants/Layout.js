import {Dimensions, Platform} from 'react-native';
import Colors from './Colors';

const {width, height} = Dimensions.get('window');
const iosVersion = parseInt(Platform.Version, 10);
const isIphoneX =
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height >= 812 || width >= 812);

const isIphoneXR =
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height >= 896 || width >= 896);

const isIphone8Plus =
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 736 || width === 736);

export default {
    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,
    padding: 16,
    halfPadding: 8,
    margin: 16,
    halfMargin: 8,
    isIOS: Platform.OS === 'ios',
    isIphoneX,
    isIphoneXR,
    iosVersion,
    isIphone8Plus,
    headerHeight: 76,
    extraSpace: 70,
    commonStyles: {
        shadow: {
            shadowColor: Colors.black,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 2,
        },
    },
};
