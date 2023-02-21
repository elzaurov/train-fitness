import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import CrossTrainingScreenHOC from './CrossTrainingScreenHOC';
import {Layout, Colors} from '../../constants';
import {
  LoadingFullScreen,
  RegularText,
  ScrollViewHeaderScreenTemplate,
  BottomBarTemplate,
  Button,
} from '../../components';

const CrossTrainingScreen = ({
  navigation,
  loading,
  activity,
  scheduling,
  onAddToCalendarPress,
}) => {
  if (loading) {
    return <LoadingFullScreen secondary hideImage />;
  }

  return (
    <BottomBarTemplate
      bottomBar={
        <Button onPress={onAddToCalendarPress} loading={scheduling}>
          Select this training
        </Button>
      }>
      <ScrollViewHeaderScreenTemplate
        navigation={navigation}
        title={activity.name}
        uri={activity.thumbnail}
        onLeftAction={() => navigation.pop()}>
        <View style={styles.container}>
          <RegularText style={styles.descriptionText}>
            {activity.description
              .replace(/\n|\r/g, ' ')
              .replace(/\s{2,}/g, ' ')}
          </RegularText>
        </View>
      </ScrollViewHeaderScreenTemplate>
    </BottomBarTemplate>
  );
};

CrossTrainingScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  activity: PropTypes.objectOf(PropTypes.any).isRequired,
  scheduling: PropTypes.bool.isRequired,
  onAddToCalendarPress: PropTypes.func.isRequired,
};

export default CrossTrainingScreenHOC(CrossTrainingScreen);

const styles = {
  container: {
    paddingTop: 1.5 * Layout.padding,
    paddingLeft: 2 * Layout.padding,
    paddingRight: 2 * Layout.padding,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.white,
  },
};
