import React, {Component} from 'react';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {getRouteNameFromType, parseVideoPath} from '../../utils';

const SearchResultItemHOCWrapper = (InnerComponent) => {
  class SearchResultItemHOC extends Component {
    handleItemPress = () => {
      const {path} = this.props.rtdb;

      if (!path) {
        return;
      }

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
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          onItemPress={this.handleItemPress}
        />
      );
    }
  }

  SearchResultItemHOC.propTypes = {
    rtdb: PropTypes.shape({
      path: PropTypes.string,
    }),
    navigation: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  SearchResultItemHOC.defaultProps = {
    rtdb: {
      key: null,
    },
  };

  return withNavigation(SearchResultItemHOC);
};

export default SearchResultItemHOCWrapper;
