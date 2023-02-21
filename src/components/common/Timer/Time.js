import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';

const Time = ({time, textStyle, dotStyle, showCentiseconds, showMinutes}) => {
  const pad = (n) => (n < 10 ? `0${n}` : n);
  const duration = moment.duration(time);
  const centiseconds = Math.floor(duration.milliseconds() / 10);

  return (
    <View style={styles.container}>
      {showMinutes && (
        <Fragment>
          <Text style={[textStyle]}>
            {pad(duration.hours() * 60 + duration.minutes())}
          </Text>
          <Text style={[dotStyle]}>:</Text>
        </Fragment>
      )}
      <Text style={[textStyle]}>
        {showMinutes
          ? pad(duration.seconds())
          : duration.seconds() >= 1
          ? duration.seconds()
          : 'GO!'}
      </Text>
      {showCentiseconds && (
        <Fragment>
          <Text style={[dotStyle]}>.</Text>
          <Text style={[textStyle]}>{pad(centiseconds)}</Text>
        </Fragment>
      )}
    </View>
  );
};

Time.propTypes = {
  time: PropTypes.number.isRequired,
  textStyle: PropTypes.any.isRequired,
  dotStyle: PropTypes.any.isRequired,
  showCentiseconds: PropTypes.bool,
  showMinutes: PropTypes.bool,
};

Time.defaultProps = {
  showCentiseconds: false,
  showMinutes: true,
};

export default Time;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
