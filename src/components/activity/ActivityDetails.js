import React from 'react';
import PropTypes from 'prop-types';
import {BottomBarTemplate, Button} from '../layout';
import {ScrollViewHeaderScreenTemplate, UIBadge} from '../common';
import {PremiumActionHOC} from '../premium';

const PremiumButton = PremiumActionHOC(Button);

const ActivityDetails = ({
  navigation,
  onAddToCalendarPress,
  activity,
  children,
  selectTitle,
  showButton,
  scheduling,
}) => {
  const {isPremium, isNew} = activity;

  return (
    <BottomBarTemplate
      bottomBar={
        !!showButton && (
          <PremiumButton
            onPress={onAddToCalendarPress}
            loading={scheduling}
            isPremium={isPremium}>
            {selectTitle}
          </PremiumButton>
        )
      }>
      <ScrollViewHeaderScreenTemplate
        navigation={navigation}
        title={activity.name}
        uri={activity.thumbnail}
        addOns={isNew ? <UIBadge text="New Content" /> : null}>
        {children}
      </ScrollViewHeaderScreenTemplate>
    </BottomBarTemplate>
  );
};

ActivityDetails.propTypes = {
  onAddToCalendarPress: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  showButton: PropTypes.bool,
  activity: PropTypes.object,
  selectTitle: PropTypes.string,
  children: PropTypes.node,
  scheduling: PropTypes.bool,
};

ActivityDetails.defaultProps = {
  scheduling: false,
};

ActivityDetails.defaultProps = {
  selectTitle: 'Select This',
  onAddToCalendarPress: () => null,
  activity: {},
  children: null,
  showButton: true,
};

export default ActivityDetails;
