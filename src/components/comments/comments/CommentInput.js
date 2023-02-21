import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Colors, Layout} from '../../../constants';
import {UserPhoto} from '../../common';
import {RegularText} from '../../layout';
import CommentInputHOC from './CommentInputHOC';

const CommentInput = ({profile, onToggleReply, t}) => (
  <View style={styles.row}>
    <UserPhoto style={styles.avatar} uid={profile.uid} size={36} />
    <TouchableOpacity style={styles.input} onPress={onToggleReply}>
      <RegularText>{t('placeholder')}</RegularText>
    </TouchableOpacity>
  </View>
);

CommentInput.propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  onToggleReply: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default CommentInputHOC(
  withTranslation('commentInputComponent')(CommentInput),
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: Layout.margin * 2,
    // paddingTop: Layout.halfPadding,
  },
  input: {
    padding: Layout.halfPadding,
    backgroundColor: Colors.emperor,
    marginLeft: Layout.halfMargin,
    width: Layout.window.width - 40 - Layout.halfMargin - Layout.padding * 2,
    borderRadius: 2,
    // minHeight: 40,
  },
});
