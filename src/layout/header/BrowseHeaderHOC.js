import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setSearchFilter, setShowSearchResult} from '../../actions';

const BrowseHeaderHOCWrapper = (InnerComponent) => {
  class BrowseHeaderHOC extends Component {
    handleFilterChange = (filter) => {
      this.props.setSearchFilter(filter);
    };

    handleCancelPress = () => {
      this.props.setSearchFilter('');
      this.props.setShowSearchResult(false);
      Keyboard.dismiss();
    };

    handleInputFocus = () => {
      this.props.setShowSearchResult(true);
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          onFilterChange={this.handleFilterChange}
          onInputFocus={this.handleInputFocus}
          onCancelPress={this.handleCancelPress}
        />
      );
    }
  }

  BrowseHeaderHOC.propTypes = {
    setSearchFilter: PropTypes.func.isRequired,
    setShowSearchResult: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    filter: state.search.filter,
    showResult: state.search.showResult,
  });

  const mapDispatchToProps = {
    setSearchFilter,
    setShowSearchResult,
  };

  return connect(mapStateToProps, mapDispatchToProps)(BrowseHeaderHOC);
};

export default BrowseHeaderHOCWrapper;
