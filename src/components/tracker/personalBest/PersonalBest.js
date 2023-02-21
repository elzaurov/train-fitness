import React, {useState} from 'react';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {personalBest} from '../../../utils';
import {Colors} from '../../../constants';
import {
  BottomBarTemplate,
  Button,
  RegularText,
  ScreenScrollView,
  TitleText,
} from '../../layout';
import Select from '../../layout/Select';

const medalColors = [Colors.gold, Colors.silver, Colors.bronze];

const PersonalBest = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  let content = (
    <View style={styles.column}>
      <MaterialCommunityIcons
        name="medal-outline"
        color={Colors.dustyGray}
        size={96}
      />
      <TitleText style={styles.description}>
        Please select your drill to view personal best
      </TitleText>
    </View>
  );
  if (selected) {
    if (selected.logs.length) {
      content = (
        <View style={styles.column}>
          {selected.logs.map((item, index) => (
            <View style={styles.item} key={item.id}>
              <MaterialCommunityIcons
                style={styles.itemIcon}
                name="medal-outline"
                color={medalColors[index]}
                size={36}
              />
              <View style={styles.itemText}>
                <RegularText style={styles.itemDate}>
                  {moment(item.date).format('LL')}
                </RegularText>
                <RegularText style={styles.itemDate}>
                  {moment(item.date).format('LT')}
                </RegularText>
              </View>
              <RegularText style={styles.itemValue}>{item.value}</RegularText>
            </View>
          ))}
        </View>
      );
    } else {
      content = (
        <View style={styles.column}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            color={Colors.dustyGray}
            size={96}
          />
          <TitleText style={styles.description}>
            No record has been set for this drill yet
          </TitleText>
        </View>
      );
    }
  }
  return (
    <BottomBarTemplate
      style={styles.container}
      bottomBar={
        <Button onPress={() => setVisible(true)}>
          {selected ? 'Select Another Drill' : 'Select Drill'}
        </Button>
      }>
      <ScreenScrollView style={styles.container} stickyHeaderIndices={[1]}>
        <Select
          hideElement
          visible={visible}
          initValue={selected ? selected.id : null}
          items={personalBest.getExerciseList()}
          onModalClose={() => setVisible(false)}
          onChange={(value) =>
            setSelected(personalBest.getExerciseById(value.key))
          }
        />
        <View style={styles.content}>
          <View style={styles.column}>
            <TouchableOpacity
              disabled={!selected}
              onPress={() => setVisible(true)}
              style={[styles.select, !selected && styles.hidden]}>
              <View style={styles.selectSide}>
                <MaterialCommunityIcons
                  name="medal-outline"
                  color={Colors.silver}
                  size={24}
                />
                <RegularText style={styles.selectText}>Drill:</RegularText>
              </View>
              <View style={styles.selectContent}>
                <RegularText style={styles.selectValue} numberOfLines={1}>
                  {selected?.name}
                </RegularText>
              </View>
            </TouchableOpacity>
          </View>
          {content}
        </View>
      </ScreenScrollView>
    </BottomBarTemplate>
  );
};

export default PersonalBest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    width: '100%',
    alignItems: 'stretch',
  },
  column: {
    alignItems: 'center',
  },
  hidden: {
    opacity: 0,
  },
  button: {
    width: '100%',
  },
  description: {
    width: 260,
    fontSize: 20,
    paddingTop: 16,
    textAlign: 'center',
    color: Colors.dustyGray,
  },
  select: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 32,
    marginBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    backgroundColor: Colors.mineShaft,
  },
  selectSide: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectValue: {
    fontSize: 16,
    color: Colors.silver,
    fontWeight: 'bold',
  },
  selectContent: {
    flex: 1,
  },
  selectText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.silver,
    marginLeft: 4,
    marginRight: 12,
  },
  item: {
    flexDirection: 'row',
    height: 64,
    width: '90%',
    alignItems: 'center',
    borderBottomColor: Colors.mineShaft,
    borderBottomWidth: 1,
  },
  itemIcon: {
    width: 64,
    height: 64,
    lineHeight: 64,
    textAlign: 'center',
  },
  itemText: {
    flex: 1,
  },
  itemDate: {
    color: Colors.dustyGray,
  },
  itemValue: {
    width: 64,
    height: 64,
    lineHeight: 64,
    textAlign: 'center',
    fontSize: 28,
    color: Colors.white,
  },
});
