import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Layout} from '../../../constants';
import {
  RegularText,
  TitleText,
  Button,
  Input,
  KeyboardView,
} from '../../layout';
import {Section} from '../../common';
import ProfileHeader from './ProfileHeader';

const ProfileOverview = ({
  disabled,
  displayNameText,
  email,
  isMember,
  updating,
  onInputChange,
  t,
  ...rest
}) => (
  <ScrollView style={{flex: 1}} bounces={false}>
    <View style={styles.view}>
      <KeyboardView keyboardVerticalOffset={76}>
        <ProfileHeader t={t} isMember={isMember} {...rest} />
        {/* The display name uniqueness must be checked */}
        {/* <Input
            viewStyle={styles.inputContainer}
            style={styles.firstInput}
            value={displayNameText}
            onChangeText={text => onInputChange('displayNameText', text)}
          />
          <Input
            viewStyle={styles.inputContainer}
            style={styles.input}
            value={email}
            editable={false}
          />
          <Button
            style={styles.button}
            onPress={onUpdate}
            disabled={disabled || updating}>
            {updating ? t('updating') : t('update')}
          </Button> */}
        <Section title="Display Name">
          <RegularText>{displayNameText}</RegularText>
        </Section>
        {email ? (
          <Section title="Email Address">
            <RegularText>{email}</RegularText>
          </Section>
        ) : null}
      </KeyboardView>
    </View>
  </ScrollView>
);

ProfileOverview.propTypes = {
  disabled: PropTypes.bool,
  updating: PropTypes.bool,
  displayNameText: PropTypes.string.isRequired,
  email: PropTypes.string,
  isMember: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

ProfileOverview.defaultProps = {
  email: '',
  disabled: false,
  updating: false,
};

export default ProfileOverview;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    // paddingLeft: Layout.padding,
    // paddingRight: Layout.padding,
  },
  firstInput: {marginTop: 32},
  input: {marginTop: 10},
  inputContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%',
  },
  button: {marginTop: 10},
  name: {marginTop: Layout.margin},
});
