import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {RegularText} from '../../layout';
import {Colors, Layout} from '../../../constants';

const ProfileStatsList = ({colors, data}) => {
  const statsComponents = data.map(({subject, sufix, value}, index) => (
    <View key={subject} style={styles.item}>
      <View style={[styles.color, {backgroundColor: colors[index]}]} />
      <RegularText style={styles.subject}>
        {subject} ({value < 0.1 ? Math.round(value) : value}
        {sufix})
      </RegularText>
    </View>
  ));

  return <View style={styles.stats}>{statsComponents}</View>;
};

ProfileStatsList.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfileStatsList;

const styles = StyleSheet.create({
  stats: {
    backgroundColor: Colors.background,
    width: Layout.window.width - Layout.padding * 2,
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.halfMargin,
    marginBottom: Layout.halfMargin,
  },
  color: {
    width: 24,
    height: 24,
    borderRadius: 15,
    marginRight: 6,
  },
});
