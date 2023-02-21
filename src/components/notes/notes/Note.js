import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feeling from './Feeling';
import {RegularText} from '../../layout';
import {Comment} from '../../comments';
import {Colors, Layout} from '../../../constants';

const Note = ({category, feeling, note}) => {
  const {key, metadata} = note;
  const metadataComponents = [];

  if (metadata) {
    const {name, rating, time} = metadata;

    if (name) {
      const cp = (
        <RegularText style={styles.category} key="note-item-metadata-name">
          {name}
        </RegularText>
      );

      metadataComponents.push(cp);
    }

    if (time) {
      const cp = (
        <View key="note-item-metadata-time" style={styles.row}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="clock"
            size={14}
            color={Colors.dustyGray}
          />
          <RegularText style={styles.time}>{time}min</RegularText>
        </View>
      );

      metadataComponents.push(cp);
    }

    if (rating) {
      const cp = (
        <View key="note-item-metadata-rating" style={styles.row}>
          <MaterialCommunityIcons
            name="star"
            size={14}
            color={Colors.seaBuckthorn}
          />
          <RegularText style={styles.rating}>{rating}</RegularText>
          <RegularText style={styles.ratingTotal}>/5</RegularText>
        </View>
      );

      metadataComponents.push(cp);
    }
  }

  return (
    <View style={styles.note}>
      <View style={[styles.row, styles.metadata]}>
        {note.private && (
          <View style={styles.private}>
            <RegularText style={styles.privateText}>PRIVATE</RegularText>
          </View>
        )}
        <Feeling {...feeling} />
        {metadataComponents.length > 0 ? (
          metadataComponents
        ) : (
          <RegularText style={styles.category}>
            {category ? category.label : ''}
          </RegularText>
        )}
      </View>
      <Comment key={key} comment={note} type="notes" />
    </View>
  );
};

Note.propTypes = {
  category: PropTypes.any,
  feeling: PropTypes.any,
  note: PropTypes.any,
};

Note.defaultProps = {
  category: null,
  feeling: null,
  note: null,
};

export default Note;

const styles = StyleSheet.create({
  note: {
    // marginBottom: Layout.margin + Layout.halfMargin,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  metadata: {
    paddingLeft: 45 + Layout.halfPadding,
    width: Layout.window.width - 45 - Layout.padding - Layout.halfPadding,
    flexWrap: 'wrap',
    position: 'relative',
  },
  private: {
    position: 'absolute',
    left: 0,
    top: 3,
    backgroundColor: Colors.primary,
    paddingLeft: Layout.halfPadding,
    paddingRight: Layout.halfPadding,
    borderRadius: Layout.halfPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privateText: {
    fontSize: 8,
    color: Colors.white,
  },
  category: {
    color: Colors.dustyGray,
    paddingLeft: Layout.halfPadding,
    paddingRight: Layout.halfPadding,
    fontSize: 12,
  },
  time: {
    color: Colors.dustyGray,
    paddingLeft: 4,
    paddingRight: Layout.halfPadding,
    fontSize: 12,
  },
  rating: {
    color: Colors.seaBuckthorn,
    paddingLeft: 4,
    fontSize: 12,
  },
  ratingTotal: {
    color: Colors.dustyGray,
    fontSize: 10,
  },
});
