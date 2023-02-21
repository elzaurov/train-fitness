import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Colors, Layout} from '../../constants';
import RegularText from './RegularText';

const HorizontalScrollViewList = ({title, dataArray, renderItem}) => {
  if (dataArray.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      {title && (
        <View style={styles.titleContainer}>
          <RegularText style={styles.title}>{title}</RegularText>
          {/* <RegularText style={styles.link}>
              SEE ALL
            </RegularText> */}
        </View>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dataArray.map((item) => (
          <View style={styles.item} key={item.key}>
            {renderItem(item)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

HorizontalScrollViewList.propTypes = {
  title: PropTypes.string.isRequired,
  dataArray: PropTypes.arrayOf(PropTypes.any).isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default HorizontalScrollViewList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: 5,
    marginLeft: Layout.margin,
    backgroundColor: Colors.background,
  },
  item: {
    backgroundColor: Colors.background,
    marginRight: Layout.margin,
    height: (Layout.window.width - Layout.padding * 3) * 0.46,
    width: (Layout.window.width - Layout.padding * 3) * 0.46,
  },
  title: {
    fontSize: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: Layout.margin,
    marginBottom: Layout.margin / 2,
  },
  link: {
    marginTop: 7,
    color: Colors.dustyGray,
  },
});
