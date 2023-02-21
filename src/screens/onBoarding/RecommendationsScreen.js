import React from 'react';
import PropTypes from 'prop-types';
import {Recommendations, OnBoardingHeader} from '../../components';

const RecommendationsScreen = props => <Recommendations {...props} />;

const Header = props => (
    <OnBoardingHeader
        {...props}
        backButton
        skipButton
        onSkip={async () => {
            props.navigation.navigate('Main', {screen: 'Progress'});
        }}
    />
);

Header.propTypes = {
    navigation: PropTypes.shape({navigate: PropTypes.func}).isRequired,
};

RecommendationsScreen.navigationOptions = {
    headerTransparent: true,
    header: props => <Header {...props} />,
};

export default RecommendationsScreen;
