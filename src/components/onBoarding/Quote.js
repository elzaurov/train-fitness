import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Layout, Colors} from '../../constants';
import {RegularText} from '../layout';
import QuoteHOC from './QuoteHOC';
import LinearGradient from 'react-native-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';

const Quote = ({
  // modalVisible,
  submitting,
  loading,
  quote,
  percent,
  onScreenPressIn,
  onScreenPressOut,
  onShare,
  // onCancel,
}) => (
  <TouchableWithoutFeedback
    onPressIn={() => onScreenPressIn()}
    onPressOut={() => onScreenPressOut()}>
    <LinearGradient
      style={styles.containerMaster}
      colors={['#830d0d', '#232323']}>
      <ProgressBar
        progress={percent}
        width={Layout.window.width}
        color={Colors.white}
        borderWidth={0}
        borderRadius={0}
        unfilledColor={Colors.dustyGray}
      />
      <View style={styles.container}>
        {!loading && (
          <View>
            <View style={styles.quoteContainer}>
              <View style={styles.quote}>
                <RegularText style={styles.quoteText}>{quote.text}</RegularText>
              </View>
              <View style={styles.quoteAuthorContainer}>
                <RegularText style={styles.quoteAuthor}>
                  {quote.author}
                </RegularText>
              </View>
            </View>
            {/* <TouchableHighlight onPress={() => onShare(quote.image)}>
              <RegularText style={styles.share}>
                SHARE
              </RegularText>
            </TouchableHighlight> */}
          </View>
        )}
        {loading && <View style={styles.quoteContainer} />}
      </View>
    </LinearGradient>
  </TouchableWithoutFeedback>
);

export default QuoteHOC(Quote);

Quote.propTypes = {
  // modalVisible: PropTypes.bool.isRequired,
  // submitting: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  containerMaster: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: Layout.padding,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  quoteContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: Layout.padding,
    top: 0,
  },
  quoteOpenContainer: {
    top: Layout.padding,
    left: Layout.padding / 2,
  },
  quoteAuthorContainer: {},
  quoteText: {
    fontSize: 34,
    lineHeight: 40,
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  share: {
    top: -2 * Layout.padding,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
  },
});
