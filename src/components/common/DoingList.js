import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {RegularText} from '../layout';
import {Colors, Layout} from '../../constants';

const DoingList = ({loading, items, selectedIndex, onPress}) => {
  let content;
  if (loading) {
    content = <ActivityIndicator size="large" />;
  } else {
    content = items.map((item, i) => {
      let icon = '';
      let iconColor = '';
      if (item.time) {
        icon = 'check-circle';
        iconColor = Colors.green;
      } else {
        icon = 'checkbox-blank-circle-outline';
        iconColor = Colors.gray2;
      }
      if (i === selectedIndex) {
        icon = 'stop-circle-outline';
        iconColor = Colors.orange2;
      }

      return (
        <TouchableOpacity
          key={i}
          style={[
            styles.container,
            {
              backgroundColor: iconColor,
            },
          ]}
          onPress={() => onPress(item, i)}>
          <View style={styles.contentContainer}>
            <View style={styles.nameContainer}>
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name={icon}
                  size={30}
                  color={Colors.white}
                />
              </View>
              <RegularText style={styles.nameText}>{item.name}</RegularText>
            </View>
            <View style={styles.timeContainer}>
              {!!item.time && (
                <View style={styles.timeContainer2}>
                  <MaterialCommunityIcons
                    name="alarm"
                    size={19}
                    color={Colors.white}
                  />
                  <RegularText style={styles.timeText}>
                    {moment(item.time).format('mm:ss')}
                  </RegularText>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  return <View>{content}</View>;
};

DoingList.propTypes = {
  items: PropTypes.array,
  selectedIndex: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

DoingList.defaultProps = {
  items: null,
  loading: false,
};

export default DoingList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
    marginLeft: Layout.padding,
    marginRight: Layout.padding,
    paddingLeft: Layout.padding / 2,
    paddingRight: Layout.padding / 2,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    paddingTop: 3,
  },
  nameContainer: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timeContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timeContainer2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nameText: {
    color: Colors.white,
    fontSize: 15,
    marginLeft: 6,
  },
  timeText: {
    color: Colors.white,
    fontSize: 18,
    marginLeft: 6,
  },
});
