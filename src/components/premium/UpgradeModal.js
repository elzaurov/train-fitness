import { PaywallConversion } from '@traineffective/te-component-library';
import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideUpgradeModal } from '../../actions';
import StandardPremiumConversion from './StandardPremiumConversion';


const UpgradeModal = ({ navigation }) => {
  const showUpgradeModal = useSelector((state) => state.upgradeModal);
  const milestones = useSelector(state => state.milestones);

  const proConversionPopup = useSelector(
    state => state.remoteConfigs.pro_conversion_popup,
  );

  const [visible, setVisible] = useState(false);

  const currentPlan = useSelector((state) => state.plan);

  const dispatch = useDispatch();

  const onGoProClicked = () => {
    navigation?.navigate('Paywall');
    dispatch(hideUpgradeModal());
  }

  const onCancelClicked = () => {
    dispatch(hideUpgradeModal());
  }

  useEffect(() => {
    if (milestones && milestones.onboarded == undefined && milestones.registered === true && showUpgradeModal === null) {
      dispatch(hideUpgradeModal());
    }

    if ((currentPlan?.isFree && showUpgradeModal === null && proConversionPopup && proConversionPopup != 'baseline' && milestones.onboarded === true)
      || (currentPlan?.isFree && showUpgradeModal === true && milestones.onboarded === true)) {
      setVisible(true);
    }
    else {
      setVisible(false);
    }

  }, [proConversionPopup, currentPlan, showUpgradeModal, milestones]);

  return (
    <Modal visible={visible}>
      {((showUpgradeModal === null && proConversionPopup === 'widelab')
        || (showUpgradeModal === true && proConversionPopup === 'widelab'))
        && <PaywallConversion handlePressCloseBtn={onCancelClicked} handlePressSubscriptionBtn={onGoProClicked} />}
      {((showUpgradeModal === null && proConversionPopup === 'spotify')
        || (showUpgradeModal === true && proConversionPopup == null || proConversionPopup !== 'widelab'))
        && <StandardPremiumConversion handlePressCancel={onCancelClicked} handlePressGoPro={onGoProClicked} />}
    </Modal>
  );
};


export default UpgradeModal;
