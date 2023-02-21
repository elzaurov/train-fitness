import React from 'react';
import {useSelector} from 'react-redux';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    Dimensions,
    useWindowDimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import Markdown from 'react-native-markdown-display';
import {Header as TEHeader, colors} from '@traineffective/te-component-library';
import {Logo} from '../../components/svg';
import {RegularText, SafeArea} from '../../components/layout';
import {UserPhoto, UserExperience} from '../../components/common';
import {Colors, Layout} from '../../constants';
import HeaderHOC from './HeaderHOC';
import PremiumActionHOC from '../../components/premium/PremiumActionHOC';
import {getBadgeColor} from '../../utils/badgeColor';

const PremiumTouchableOpacity = PremiumActionHOC(TouchableOpacity);

interface HeaderProps {
    mode: 'standard' | 'detailed' | 'back' | 'cancel';
    screen: string;
    isDarkMode: boolean;
    hideLeaderBoard: boolean;
    backButton?: boolean;
    hideLeaderBoard?: boolean;
    gamification: {
        activities: number;
        badgesCount: number;
        createdAt: number;
        daysInARow: number;
        daysOverall: number;
        experience: number;
        formattedExperience: number[];
        lastLogin: number;
        level: number;
    };
    hasTabs?: boolean;
    hideBackButtonWhenCanceledPlan?: boolean;
    modalTitle?: string;
    navigation: any;
    profile: {
        createdAt: number;
        displayName: string;
        email: string;
        emailSubscription: string;
        fcmToken: string;
        firstName: string;
        isAdmin: boolean;
        level: number;
        nameInitials: string;
        newUser: boolean;
        photoURL: string;
        rating?: number;
        uid: string;
        streak: number;
    };
    plan: {
        created: number;
        id: number;
        isBasic: boolean;
        isCanceled: boolean;
        isElite: boolean;
        isFree: boolean;
        isPro: boolean;
        isVip: boolean;
        name: string;
        status: string;
    };
    isFeed?: boolean;
    unreadNotifications: string;
    userRole: string;
    hideSearchIcon?: boolean;
    onPressStreak?: () => void;
    onPressSearchFilter?: () => void;
}

const Header: React.FC<HeaderProps> = ({
    backButton,
    gamification,
    hasTabs,
    hideBackButtonWhenCanceledPlan,
    modalTitle,
    navigation,
    plan,
    profile,
    unreadNotifications,
    isFeed,
    userRole,
    screen,
    mode,
    isDarkMode,
    onPressStreak,
    hideLeaderBoard,
    hideSearchIcon = true,
    onPressSearchFilter,
}) => {
    const fullscreen = useSelector(state => state.android_player.fullscreen);
    const {experience} = gamification;
    const {firstName, uid} = profile;
    const onPress = () => navigation.navigate('Settings');
    const isPlanCanceled = plan.isCanceled && !profile.isAdmin;
    const hideBackButton = hideBackButtonWhenCanceledPlan && isPlanCanceled;
    const showBackButton = backButton && !hideBackButton;
    const hasNotifications = unreadNotifications.length > 0;

    const {Popover} = renderers;
    const userRating = profile.rating || 0;
    const ratingText = `**ONLY DURING EURO 2020!**
        **Here is how to get your Train Effective Rating**: 
        \n**Step 1:** Go to the discover page and select Train Effective Rating under Technical Training Sessions
        \n**Step 2:** Film yourself (or get a friend to film you) doing the training session. TIP: use a shoe and put your phone in it to film yourself.
        \n**Step 3:** Send us your video (or 4 videos) by email to scouting@traineffective.com and include your username and email address used to sign in to the app (you can see this on your profile). Note: we recommend to use WeTransfer.com to send us the video.
        \n**What happens after I send the video?**\nFormer pro players in the Train Effective team will review the video and will give you a rating. **If you have a very high rating, we will show your video to Premier League scouts!**`;

    if (modalTitle) {
        return (
            <View>
                <SafeArea color={Colors.mineShaft} />
                <View style={[styles.container, hasTabs ? {} : styles.noTabs]}>
                    <View style={[styles.content, {justifyContent: 'center'}]}>
                        {showBackButton ? (
                            <TouchableOpacity onPress={() => navigation.pop()}>
                                <MaterialCommunityIcons
                                    name="chevron-left"
                                    size={36}
                                    color={Colors.white}
                                />
                            </TouchableOpacity>
                        ) : (
                            <View />
                        )}
                        <RegularText style={styles.title}>
                            {modalTitle}
                        </RegularText>
                        <View />
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={[fullscreen ? styles.hideContainer : {}]}>
            <SafeArea color={isDarkMode ? '#1F2226' : '#FFFFFF'} />
            <View style={[styles.container, hasTabs ? {} : styles.noTabs]}>
                <TEHeader
                    hideLeaderBoard={hideLeaderBoard}
                    avatarImage={profile.photoURL}
                    avatarText={profile.displayName}
                    badgeColor={getBadgeColor(gamification?.level)}
                    feedText={screen}
                    hideLeaderBoard={hideLeaderBoard}
                    hideSearchIcon={hideSearchIcon}
                    level={gamification?.level}
                    isDarkMode={isDarkMode}
                    mode={mode}
                    userName={profile.displayName}
                    streakValue={profile.streak}
                    onPressBack={() => navigation.goBack()}
                    onPressAvatar={() =>
                        navigation.navigate('Settings')
                    }
                    onPressLeaderboard={() =>
                        navigation.navigate('Leaderboard')
                    }
                    onPressNotifications={() =>
                        navigation.navigate('Notifications')
                    }
                    onPressStreak={onPressStreak}
                    onPressSearchFilter={onPressSearchFilter}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Layout.window.width,
        backgroundColor: Colors.mineShaft,
    },
    hideContainer: {
        display: 'none',
    },
    content: {
        paddingLeft: Layout.padding,
        paddingRight: Layout.padding,
        paddingTop: Layout.iosVersion < 11 && Layout.isIOS ? 20 : 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {},
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    userPhoto: {
        width: 32,
        height: 32,
        marginLeft: 12,
    },
    name: {
        textAlign: 'right',
    },
    title: {
        left: Layout.padding * -1,
    },
    userRatingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    ratingPopupContainer: {
        position: 'absolute',
    },
    userRatingText: {
        position: 'absolute',
        color: '#FFD700',
        fontWeight: 'bold',
    },
});

Header.defaultProps = {
    backButton: false,
    hasTabs: false,
    hideBackButtonWhenCanceledPlan: false,
    modalTitle: undefined,
    // screen: '',
    isFeed: false,
};

export default HeaderHOC(Header);
