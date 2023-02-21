import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button, RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';
import ProgressHOC from './ProgressHOC';

const Progress = ({
  isComplete,
  percentageSeen,
  onVerifyFinish,
  onPressDisable,
  enableFinishButton,
  t,
}) => {
  return (
    <View
      style={[
        styles.progress,
        {
          backgroundColor: Colors.mineShaft,
          borderTopWidth: 1,
          borderColor: Colors.background,
        },
      ]}>
      <RegularText style={styles.percentage}>
        {percentageSeen.toFixed(0)}% {t('completed').toLowerCase()}
      </RegularText>
      <View style={styles.row}>
        <Button
          style={styles.finishButton}
          onPress={onVerifyFinish}
          disabled={onPressDisable || !enableFinishButton}
          primary>
          {t('finish')}
        </Button>
      </View>
    </View>
  );
};

Progress.propTypes = {
  onPressDisable: PropTypes.bool.isRequired,
  percentageSeen: PropTypes.number.isRequired,
  onFinish: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default ProgressHOC(Progress);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
    paddingBottom: Layout.padding / 2,
    paddingTop: Layout.padding / 2,
  },
  percentage: {
    fontSize: 16,
  },
  finishButton: {
    width: 'auto',
    paddingLeft: Layout.padding,
    paddingRight: Layout.padding,
  },
});
