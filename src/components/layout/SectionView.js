import React from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SectionList, StyleSheet, TouchableOpacity, View} from 'react-native';
import RegularText from './RegularText';
import {Colors, Layout} from '../../constants';
import SectionViewHOC from './SectionViewHOC';

const SectionView = ({sections, selectedTab, titleStyle, onSelectTab}) => (
  <SectionList
    style={styles.list}
    stickySectionHeadersEnabled={true}
    renderSectionHeader={({section}) => (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          {section.icon && (
            <MaterialCommunityIcons
              style={styles.icon}
              name={section.icon}
              size={24}
              color={Colors.white}
            />
          )}
          <RegularText style={[styles.title, titleStyle]}>
            {section.title.toUpperCase()}
          </RegularText>
        </View>
        {section.tabs && (
          <View style={styles.tabs}>
            {section.tabs.map((tab) => (
              <TouchableOpacity
                key={tab.value}
                style={{
                  padding: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: Layout.window.width / section.tabs.length,
                  borderBottomWidth:
                    selectedTab[section.key] === tab.value ? 2 : 0,
                  borderColor: Colors.white,
                }}
                onPress={() => onSelectTab(section.key, tab.value)}>
                <RegularText>{tab.name.toUpperCase()}</RegularText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    )}
    sections={sections}
    renderItem={({item: {Component, props}, section: {contentStyle, key}}) => (
      <View style={[styles.content, contentStyle || {}]}>
        <Component {...props} selectedTab={selectedTab[key]} />
      </View>
    )}
    keyExtractor={(item, index) => index}
  />
);

SectionView.propTypes = {
  titleStyle: PropTypes.any,
  selectedTab: PropTypes.any,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectTab: PropTypes.func.isRequired,
};

SectionView.defaultProps = {
  titleStyle: {},
  selectedTab: {},
};

export default SectionViewHOC(SectionView);

const styles = StyleSheet.create({
  list: {
    backgroundColor: Colors.background,
  },
  icon: {
    marginRight: Layout.margin,
  },
  wrapper: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  titleWrapper: {
    padding: Layout.padding,
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    padding: Layout.padding,
  },
});
