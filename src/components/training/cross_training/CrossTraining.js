import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Animated, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {TabBar, ScrollPager} from 'react-native-tab-view';
import {AddToCalendarButton} from '../../common';
import {LoadingFullScreen} from '../../loading';
import {TabView} from '../../layout';
import {Colors, Layout} from '../../../constants';
import CrossTrainingEvaluation from './CrossTrainingEvaluation';
import CrossTrainingDetails from './CrossTrainingDetails';
import CrossTrainingHOC from './CrossTrainingHOC';

const CrossTraining = ({
  crossTraining,
  loading,
  navigation,
  type,
  onAddToCalendarPress,
  t,
}) => {
  if (loading) {
    return <LoadingFullScreen primary hideImage />;
  }

  const {data, scheduleId} = crossTraining;
  const {thumbnail} = data;
  const routes = [{key: 'details', title: t('details')}];

  if (scheduleId) {
    routes.unshift({key: 'evaluation', title: t('evaluation')});
  }

  const content = (
    <View style={styles.content}>
      {onAddToCalendarPress && (
        <AddToCalendarButton onAddToCalendarPress={onAddToCalendarPress} />
      )}
      <TabView
        routes={routes}
        renderScene={({route}) => {
          switch (route.key) {
            case 'evaluation':
              return (
                <CrossTrainingEvaluation
                  crossTraining={data}
                  navigation={navigation}
                  type={type}
                />
              );
            case 'details':
              return <CrossTrainingDetails crossTraining={data} />;
            default:
              return null;
          }
        }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabs}
            pressOpacity={1}
            indicatorStyle={{
              backgroundColor: Colors.white,
            }}
          />
        )}
      />
    </View>
  );

  if (!Layout.isIOS) {
    return content;
  }

  return (
    <ParallaxScrollView
      contentBackgroundColor={Colors.background}
      parallaxHeaderHeight={0}
      fadeOutForeground={true}
      renderContentBackground={() => (
        <FastImage source={{uri: thumbnail}} style={styles.thumbnail} />
      )}
      renderScrollComponent={(props) => (
        <Animated.ScrollView
          {...props}
          nestedScrollEnabled={true}
          bounces={false}
        />
      )}>
      {content}
    </ParallaxScrollView>
  );
};

CrossTraining.propTypes = {
  crossTraining: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  onAddToCalendarPress: PropTypes.func,
  t: PropTypes.func.isRequired,
};

CrossTraining.defaultProps = {
  onAddToCalendarPress: undefined,
};

export default withTranslation('crossTrainingComponent')(
  CrossTrainingHOC(CrossTraining),
);

const styles = StyleSheet.create({
  thumbnail: {
    height: Layout.window.width,
    width: Layout.window.width,
  },
  tabs: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderColor: Colors.separator,
  },
  content: {
    height: Layout.window.height - Layout.headerHeight,
    backgroundColor: Colors.background,
  },
});
