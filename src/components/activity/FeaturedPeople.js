import React from 'react';
import PropTypes from 'prop-types';
import {ViewPropTypes, StyleSheet} from 'react-native';
import {Specialist, Section} from '../common';

const FeaturedPeople = ({people, title, style, showDescription}) => (
  <Section title={title} style={style}>
    {people &&
      people.map((personId) => (
        <Specialist
          key={personId}
          id={personId}
          showDescription={showDescription}
          style={styles.specialistStyle}
        />
      ))}
  </Section>
);

FeaturedPeople.propTypes = {
  title: PropTypes.string,
  people: PropTypes.array.isRequired,
  style: ViewPropTypes.style,
  showDescription: PropTypes.bool,
};

FeaturedPeople.defaultProps = {
  title: 'Featured People',
  style: {},
  showDescription: true,
};

export default FeaturedPeople;

const styles = StyleSheet.create({
  specialistStyle: {
    flex: 0,
    width: 'auto',
  },
});
