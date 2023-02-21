import React from 'react';
import PropTypes from 'prop-types';
import {Button, ScreenScrollView, BottomBarTemplate} from '../layout';
import PaymentSuccessHOC from './PaymentSuccessHOC';
import PaymentSuccessHeader from './PaymentSuccessHeader';
import IntroductionMethods from './IntroductionMethods';

const PaymentSuccess = ({
  onContinuePress,
  onIntroductionItemSelect,
  introductionItems,
  selectedIntroductionItem,
  isWaiting,
}) => (
  <BottomBarTemplate
    bottomBar={
      <Button
        onPress={onContinuePress}
        disabled={!selectedIntroductionItem}
        loading={isWaiting}>
        Continue to explore
      </Button>
    }>
    <ScreenScrollView>
      <PaymentSuccessHeader />
      {introductionItems && (
        <IntroductionMethods
          disabled={isWaiting}
          items={introductionItems}
          selectedItem={selectedIntroductionItem}
          onItemSelect={onIntroductionItemSelect}
        />
      )}
    </ScreenScrollView>
  </BottomBarTemplate>
);

PaymentSuccess.propTypes = {
  onContinuePress: PropTypes.func.isRequired,
  onIntroductionItemSelect: PropTypes.func.isRequired,
  introductionItems: PropTypes.arrayOf(PropTypes.string),
  selectedIntroductionItem: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
};

PaymentSuccess.defaultProps = {
  introductionItems: null,
  selectedIntroductionItem: null,
};

export default PaymentSuccessHOC(PaymentSuccess);
