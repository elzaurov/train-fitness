import React, {Component} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {contactSend} from '../../actions';

const CONTACT_CATEGORIES = ['Sales', 'Technical', 'Content'];

const ContactHOCWrapper = (InnerComponent) => {
  class ContactHOC extends Component {
    state = {
      title: '',
      titleError: '',
      description: '',
      descriptionError: '',
      sending: false,
    };

    handleTitleChange = (title) => {
      this.setState({title});
      this.validateTitle(title);
    };

    validateTitle = (title) => {
      this.setState({titleError: title ? '' : 'Subject is required'});
    };

    handleDescriptionChange = (description) => {
      this.setState({description});
      this.validateDescription(description);
    };

    validateDescription = (description) => {
      this.setState({
        descriptionError: description ? '' : 'Details are required',
      });
    };

    handleSendPress = async () => {
      try {
        this.setState({sending: true});
        const {title, description} = this.state;

        await this.validateTitle(title);
        await this.validateDescription(description);

        const {titleError, descriptionError} = this.state;

        if (!titleError && !descriptionError) {
          await this.props.contactSend({
            title,
            description,
          });

          alertSendDone(() => {
            const {navigation} = this.props;
            navigation.navigate('Main');
          });
        }
      } finally {
        this.setState({sending: false});
      }
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          categories={CONTACT_CATEGORIES}
          onTitleChange={this.handleTitleChange}
          onCategoryChange={this.handleCategoryChange}
          onDescriptionChange={this.handleDescriptionChange}
          onSendPress={this.handleSendPress}
        />
      );
    }
  }

  ContactHOC.propTypes = {
    contactSend: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func}).isRequired,
  };

  const mapDispatchToProps = {
    contactSend,
  };

  return connect(null, mapDispatchToProps)(withNavigation(ContactHOC));
};

export default ContactHOCWrapper;

// helpers
const alertSendDone = (onOkPress) =>
  Alert.alert(
    'Request Sent',
    'Our support team will reach you soon',
    [
      {
        text: 'OK',
        onPress: onOkPress,
      },
    ],
    {cancellable: false},
  );
