import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ScrollView, Animated} from 'react-native';
import {Layout, Colors} from '../../constants';
import {IconButton} from '../layout';
import HeaderProgress from '../../layout/header/HeaderProgress';

const HEADER_MAX_HEIGHT = Layout.isSmallDevice ? 280 : 370;
const HEADER_MIN_HEIGHT = Layout.isSmallDevice ? 80 : 110;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ScrollViewHeaderScreenTemplate extends Component {
    state = {
        scrollY: new Animated.Value(0),
    };

    render() {
        const {uri, title, children, navigation, onLeftAction, addOns} =
            this.props;

        const {scrollY} = this.state;

        const headerHeight = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });

        const imageOpacityHidding = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });

        const imageOpacityShowing = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
        });

        const imageHeight = scrollY.interpolate({
            inputRange: [0, 0, 0, 0, HEADER_SCROLL_DISTANCE],
            outputRange: [
                HEADER_MAX_HEIGHT,
                HEADER_MAX_HEIGHT,
                HEADER_MAX_HEIGHT,
                HEADER_MAX_HEIGHT,
                HEADER_MIN_HEIGHT,
            ],
            extrapolate: 'clamp',
        });

        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        });

        return (
            <View style={styles.container}>
                <ScrollView
                    scrollIndicatorInsets={{right: 1}}
                    ref={this.props.scrollRef}
                    style={styles.container}
                    scrollEnabled={this.props.scrollEnabled}
                    scrollEventThrottle={16}
                    bounces={false}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}],
                        {listener: () => null, useNativeDriver: false},
                    )}>
                    <View
                        style={
                            uri
                                ? styles.maxScrollViewContent
                                : styles.minScrollViewContent
                        }>
                        {children}
                    </View>
                </ScrollView>

                <Animated.View
                    style={[
                        styles.header,
                        {height: uri ? headerHeight : HEADER_MIN_HEIGHT},
                    ]}>
                    {uri && (
                        <View>
                            <Animated.Image
                                style={[
                                    styles.backgroundImage,
                                    {
                                        height: imageHeight,
                                        opacity: imageOpacityHidding,
                                        transform: [
                                            {translateY: imageTranslate},
                                        ],
                                    },
                                ]}
                                source={{uri}}
                            />
                            <IconButton
                                style={[styles.backButton]}
                                icon="chevron-left"
                                iconSize={38}
                                iconColor={Colors.white}
                                onPress={() =>
                                    onLeftAction
                                        ? onLeftAction()
                                        : navigation.goBack()
                                }
                            />
                            {addOns ? (
                                <Animated.View
                                    style={[
                                        styles.addOns,
                                        {opacity: imageOpacityHidding},
                                    ]}>
                                    {addOns}
                                </Animated.View>
                            ) : null}
                            {this.props.onRightAction && (
                                <Animated.View
                                    style={[
                                        styles.rightActionButton,
                                        {opacity: imageOpacityHidding},
                                    ]}>
                                    <IconButton
                                        icon="check-circle-outline"
                                        iconSize={38}
                                        iconColor={Colors.white}
                                        onPress={() =>
                                            this.props.onRightAction()
                                        }
                                    />
                                </Animated.View>
                            )}
                        </View>
                    )}
                    <Animated.View
                        style={{opacity: uri ? imageOpacityShowing : 1}}>
                        <HeaderProgress
                            navigation={navigation}
                            title={title}
                            onLeftAction={onLeftAction}
                            onRightAction={
                                this.props.onRightAction
                                    ? () => this.props.onRightAction()
                                    : null
                            }
                        />
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

ScrollViewHeaderScreenTemplate.propTypes = {
    navigation: PropTypes.any.isRequired,
    scrollEnabled: PropTypes.bool,
    scrollRef: PropTypes.any,
    uri: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
    onRightAction: PropTypes.func,
    onLeftAction: PropTypes.func,
    addOns: PropTypes.node,
};

ScrollViewHeaderScreenTemplate.defaultProps = {
    scrollEnabled: true,
    scrollRef: null,
    children: null,
    uri: null,
    onRightAction: null,
    onLeftAction: null,
    addOns: null,
};

export default ScrollViewHeaderScreenTemplate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background2,
    },
    container2: {
        backgroundColor: Colors.background2,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
    },
    backButton: {
        position: 'absolute',
        top: Layout.isIphoneX ? 55 : 30,
        left: 7,
    },
    rightActionButton: {
        position: 'absolute',
        top: Layout.isIphoneX ? 55 : 30,
        right: 7,
    },
    maxScrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
        backgroundColor: Colors.background2,
    },
    minScrollViewContent: {
        marginTop: HEADER_MIN_HEIGHT,
        backgroundColor: Colors.background2,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    addOns: {
        position: 'absolute',
        top: Layout.isIphoneX ? 55 : 30,
        right: 7,
        height: 38,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
