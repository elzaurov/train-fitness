import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const SearchResultHOCWrapper = (InnerComponent) => {
  class SearchResultHOC extends Component {
    handleContainerTouch = () => {
      Keyboard.dismiss();
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          onContainerTouch={this.handleContainerTouch}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    result: state.search.result,
    showResult: state.search.showResult,
    searching: state.search.searching,
    noResult: state.search.showResult && !!state.search.filter,
  });

  return connect(mapStateToProps)(SearchResultHOC);
};

export default SearchResultHOCWrapper;
