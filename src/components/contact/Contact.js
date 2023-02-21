import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {
  BottomBarTemplate,
  Button,
  TitleText,
  Input,
  ScreenScrollView,
} from '../layout';
import ContactHOC from './ContactHOC';

const Contact = ({
  title,
  titleError,
  description,
  descriptionError,
  onDescriptionChange,
  onTitleChange,
  hasError,
  sending,
  onSendPress,
}) => (
  <BottomBarTemplate
    bottomBar={
      <Button disabled={hasError} loading={sending} onPress={onSendPress}>
        Send
      </Button>
    }>
    <ScreenScrollView>
      <TitleText style={styles.title}>Reach us effectively!</TitleText>
      <Input
        style={styles.field}
        value={title}
        validation={titleError}
        onChangeText={onTitleChange}
        editable={!sending}
        placeholder="Subject"
      />
      <Input
        style={[styles.description, styles.field]}
        value={description}
        validation={descriptionError}
        onChangeText={onDescriptionChange}
        editable={!sending}
        placeholder="Tell us more about what you have in mind"
        multiline
      />
    </ScreenScrollView>
  </BottomBarTemplate>
);

Contact.propTypes = {
  title: PropTypes.string.isRequired,
  titleError: PropTypes.string,
  description: PropTypes.string.isRequired,
  descriptionError: PropTypes.string,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  sending: PropTypes.bool.isRequired,
  onSendPress: PropTypes.func.isRequired,
};

Contact.defaultProps = {
  hasError: false,
  titleError: null,
  descriptionError: null,
};

export default ContactHOC(Contact);

const styles = StyleSheet.create({
  field: {
    marginTop: 16,
  },
  title: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 32,
  },
  description: {
    height: 300,
    paddingTop: 16,
  },
});
