import React from 'react';
import {Contact} from '../../components';
import ContactScreenHOC from './ContactScreenHOC';

const ContactScreen = ({...props}) => <Contact {...props} />;

export default ContactScreenHOC(ContactScreen);
