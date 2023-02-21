import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes, TouchableOpacity} from 'react-native';
import {RegularText, TitleText} from '../../layout';
import {Modal} from '../../common';
import {Colors, Layout} from '../../../constants';
import RepSetsHOC from './RepSetsHOC';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RepSets = ({
  tips,
  reps,
  sets,
  rsr,
  style,
  infoModalVisible,
  tipsModalVisible,
  onModalVisibleChange,
  onTipsModalVisibleChange,
}) => (
  <>
    {rsr && (
      <Modal
        modalVisible={infoModalVisible}
        onClose={() => onModalVisibleChange(false)}>
        <View style={styles.modalContent}>
          <TitleText style={styles.modalRsrTitle}>RSR Info</TitleText>
          <RegularText style={styles.modalRsrText}>
            RECOVERY: {rsr.recovery}
          </RegularText>
          <RegularText style={styles.modalRsrText}>
            SETS: {rsr.sets}
          </RegularText>
          <RegularText style={styles.modalRsrText}>
            REPS: {rsr.reps}
          </RegularText>
        </View>
      </Modal>
    )}
    {tips && tips.length > 0 && (
      <Modal
        modalVisible={tipsModalVisible}
        onClose={() => onTipsModalVisibleChange(false)}>
        <View style={styles.modalContent}>
          <TitleText style={styles.modalRsrTitle}>TIPS</TitleText>
          {tips.map((tip, key) => (
            <RegularText key={tip} style={styles.modalRsrText}>
              TIP {key + 1}: {tip}
            </RegularText>
          ))}
        </View>
      </Modal>
    )}

    <TouchableOpacity
      onPress={() => onModalVisibleChange(true)}
      style={[styles.container, style]}>
      <View style={styles.repSet}>
        <RegularText style={styles.repSetText}>{sets}</RegularText>
        <RegularText style={styles.repSetCaption}>
          SET{sets > 1 ? 'S' : ''}
        </RegularText>
      </View>
      <View style={styles.of}>
        <RegularText>OF</RegularText>
      </View>
      <View style={styles.repSet}>
        <RegularText style={styles.repSetText}>{reps}</RegularText>
        <RegularText style={styles.repSetCaption}>
          REP{reps > 1 ? 'S' : ''}
        </RegularText>
      </View>
      {rsr && rsr.reps.length > 3 ? (
        <View style={styles.rsr}>
          <View style={styles.rsrHeader}>
            <TitleText style={styles.rsrTitle}>1 REP is:</TitleText>
            <MaterialCommunityIcons name="information" color={Colors.white} />
          </View>
          <RegularText style={styles.rsrText}>{rsr.reps}</RegularText>
        </View>
      ) : null}
      {tips && tips.length > 0 && (
        <TouchableOpacity
          onPress={() => onTipsModalVisibleChange(true)}
          style={{...styles.rsr, ...styles.tipsContainer}}>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            color={Colors.white}
            size={25}
          />
          <RegularText style={styles.rsrText}>{'Tips'}</RegularText>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  </>
);

RepSets.propTypes = {
  tips: PropTypes.array,
  sets: PropTypes.number,
  reps: PropTypes.number,
  rsr: PropTypes.object,
  style: ViewPropTypes.style,
  infoModalVisible: PropTypes.bool.isRequired,
  tipsModalVisible: PropTypes.bool.isRequired,
  onModalVisibleChange: PropTypes.func.isRequired,
  onTipsModalVisibleChange: PropTypes.func.isRequired,
};

RepSets.defaultProps = {
  tips: null,
  sets: null,
  reps: null,
  rsr: null,
  duration: null,
  style: {},
};

export default RepSetsHOC(RepSets);

const OF_CONTAINER_SIZE = 30;

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    alignItems: 'flex-start',
    padding: Layout.padding,
  },
  modalRsrTitle: {
    alignSelf: 'center',
  },
  modalRsrText: {
    marginTop: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Layout.padding,
    borderRadius: 5,
    backgroundColor: Colors.gray3,
    padding: Layout.padding,
  },
  of: {
    marginLeft: Layout.padding / 2,
    marginRight: Layout.padding / 2,
    backgroundColor: Colors.mineShaft,
    width: OF_CONTAINER_SIZE,
    height: OF_CONTAINER_SIZE,
    borderRadius: OF_CONTAINER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  repSet: {
    alignItems: 'center',
    marginLeft: Layout.padding / 2,
    marginRight: Layout.padding / 2,
  },
  repSetText: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  repSetCaption: {
    fontSize: 14,
    lineHeight: 17,
  },
  rsr: {
    paddingLeft: Layout.padding,
    marginLeft: Layout.padding,
    borderLeftColor: Colors.mineShaft,
    borderLeftWidth: 1,
    flex: 1,
  },
  rsrHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rsrTitle: {
    fontSize: 12,
    marginBottom: 0,
  },
  rsrText: {
    fontSize: 12,
  },
  tipsContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
