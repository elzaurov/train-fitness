import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withNavigation} from '@react-navigation/compat';
import {parseVideoPath, getRouteNameFromType} from '../../utils';

const BrowseCollectionHOCWrapper = (InnerComponent) => {
  class BrowseCollectionHOC extends Component {
    handleActivitySelect = (activity) => {
      const {path} = activity.rtdb;

      const {type, key} = parseVideoPath(path);
      const route = getRouteNameFromType(type, 'view');

      let videoPath = null;

      if (type === 'classroom') {
        videoPath = 'classroom';
      } else if (type === 'gamebrain') {
        videoPath = 'game-brain';
      }

      const {navigation} = this.props;
      navigation.push(route, {
        id: key,
        videoPath,
      });
    };

    render() {
      const {section} = this.props;

      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          activities={section.activities}
          onActivitySelect={this.handleActivitySelect}
        />
      );
    }
  }

  BrowseCollectionHOC.propTypes = {
    section: PropTypes.array.isRequired,
    navigation: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  const mapStateToProps = (state, props) => ({
    section: state.catalog.sections.find((section) => section.id === props.id),
  });

  return withNavigation(connect(mapStateToProps)(BrowseCollectionHOC));
};

export default BrowseCollectionHOCWrapper;
