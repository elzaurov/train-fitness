import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RegularText, BoldText} from '../layout';
import {Colors, Layout} from '../../constants';
import SpecialistHOC from './SpecialistHOC';

const Specialist = ({
  loading,
  specialist,
  showDescription,
  style,
  isCompactDesign,
  imageStyle,
}) => {
  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <View style={[styles.image, imageStyle, styles.imageLoading]} />
        <View style={styles.detailsContainer}>
          <View style={styles.nameLoading} />
          {showDescription && (
            <Fragment>
              <View style={styles.descriptionLoading} />
              <View style={styles.descriptionLoading} />
            </Fragment>
          )}
        </View>
      </View>
    );
  }

  const {name, description, shortDescription, imageURL} = specialist;

  if (isCompactDesign) {
    return (
      <View style={[styles.container, style]}>
        <FastImage
          style={[styles.image, imageStyle]}
          source={{uri: imageURL}}
        />
        <View style={styles.detailsContainer}>
          <RegularText style={styles.createdByText}>Created By</RegularText>
          <RegularText style={styles.name2}>{name}</RegularText>
          <RegularText style={styles.shortDescriptionText}>
            {shortDescription}
          </RegularText>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <FastImage style={[styles.image, imageStyle]} source={{uri: imageURL}} />
      <View style={styles.detailsContainer}>
        <BoldText style={styles.name}>{name}</BoldText>
        {showDescription && (
          <RegularText style={styles.descriptionText}>
            {description}
          </RegularText>
        )}
      </View>
    </View>
  );
};

Specialist.propTypes = {
  loading: PropTypes.bool.isRequired,
  specialist: PropTypes.objectOf(PropTypes.any).isRequired,
  showDescription: PropTypes.bool,
  isCompactDesign: PropTypes.bool,
  imageStyle: PropTypes.object,
  // eslint-disable-next-line react/no-typos
  style: ViewPropTypes.style,
};

Specialist.defaultProps = {
  showDescription: true,
  isCompactDesign: false,
  imageStyle: {},
  style: {},
};

export default SpecialistHOC(Specialist);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: Layout.margin / 2,
  },
  imageLoading: {
    backgroundColor: Colors.loadingOverlay,
  },
  nameLoading: {
    backgroundColor: Colors.loadingOverlay,
    height: 14,
    width: 100,
    borderRadius: 2,
    marginBottom: 6,
  },
  descriptionLoading: {
    backgroundColor: Colors.loadingOverlay,
    height: 12,
    width: '100%',
    borderRadius: 2,
    marginTop: 6,
  },
  image: {
    width: 56,
    height: 56,
    marginRight: Layout.margin,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.silver,
  },
  shortDescriptionText: {
    fontSize: 12,
    color: Colors.silver,
  },
  name: {
    marginBottom: Layout.margin / 2,
    fontSize: 15,
    color: Colors.silver,
  },
  createdByText: {
    fontSize: 12,
    color: Colors.silver,
  },
  name2: {
    marginBottom: 3,
    fontSize: 15,
    color: Colors.silver,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
