import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Layout} from '../../../constants';
import {personalBest} from '../../../utils';
import {TitleText, RegularText, Button} from '../../layout';

const PersonalBestModal = ({exercise, onFinish}) => {
  const [top, setTop] = useState(null);
  const [input, setInput] = useState(null);
  useEffect(() => {
    const found = personalBest.getExerciseById(exercise.key);
    setTop(found.logs[0] ? found.logs[0].value : null);
  }, [exercise]);
  const onSubmit = useCallback(() => {
    if (input !== null) {
      personalBest.store(exercise.key, input);
    }
    onFinish();
  }, [exercise, input, onFinish]);
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="medal-outline"
        color={Colors.white}
        size={64}
      />
      <TitleText style={styles.title}>You finished</TitleText>
      <TitleText style={styles.subtitle}>{exercise.name}</TitleText>
      {top !== null && (
        <View style={styles.alert}>
          <MaterialCommunityIcons
            name="medal-outline"
            color={Colors.emperor}
            size={24}
          />
          <RegularText style={styles.alertText}>
            Your Personal Best:
          </RegularText>
          <RegularText style={styles.alertValue}>{top}</RegularText>
        </View>
      )}
      <RegularText style={styles.text}>
        What was your record today for this drill?
      </RegularText>
      <View style={styles.fields}>
        <View style={styles.fieldGroup}>
          <TextInput
            autoFocus
            style={styles.input}
            value={input}
            autoCorrect={false}
            onChangeText={(value) => setInput(value || null)}
            keyboardType={Layout.isIOS ? 'number-pad' : 'phone-pad'}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      <Button onPress={onSubmit} style={styles.button}>
        Continue
      </Button>
    </View>
  );
};

PersonalBestModal.propTypes = {
  exercise: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default PersonalBestModal;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginTop: -16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.dustyGray,
    fontWeight: 'normal',
  },
  fields: {
    flexDirection: 'row',
  },
  fieldGroup: {
    flex: 1,
  },
  button: {
    width: '100%',
  },
  input: {
    backgroundColor: Colors.emperor,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 8,
    marginBottom: 32,
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20,
    borderRadius: 4,
    textAlign: 'center',
    color: Colors.white,
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: Colors.dustyGray,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  alertValue: {
    fontSize: 16,
    color: Colors.emperor,
    fontWeight: 'bold',
  },
  alertText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.emperor,
    marginLeft: 4,
    marginRight: 12,
  },
});
