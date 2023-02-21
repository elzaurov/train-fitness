import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import {NUMBER_OF_ITEMS} from '../../constants';

const ScrollFlatListHOCWrapper = (InnerComponent) => {
  class ScrollFlatListHOC extends Component {
    constructor(props) {
      super(props);

      const {categoriesList, startWithSequencialList} = this.props;

      this.setState({isListSequencial: startWithSequencialList});

      if (categoriesList) {
        this.setState({
          categories: categoriesList,
          selectedCategory: categoriesList[0] || {},
        });
      }
    }

    UNSAFE_componentWillReceiveProps({categoriesList}) {
      const {categories} = this.state;

      if (
        (!categories || categories.length <= 1) &&
        categoriesList &&
        categoriesList.length > 0
      ) {
        this.setState({
          categories: categoriesList,
          selectedCategory: categoriesList[0] || {},
        });
      }
    }

    state = {
      isListSequencial: true,
      loading: false,
      searchText: '',
      selectedCategory: {},
      limit: NUMBER_OF_ITEMS,
      categories: undefined,
    };

    handleSeachInputChange = (searchText) => {
      this.setState({searchText});
    };

    handleLoadMore = () => {
      if (!this.state.loading) {
        this.setState({loading: true}, () => {
          this.setState({limit: this.state.limit + NUMBER_OF_ITEMS}, () => {
            if (this.props.onLoadMore) {
              this.props.onLoadMore(() => {
                this.setState({loading: false});
              });
            } else {
              this.setState({loading: false});
            }
          });
        });
      }
    };

    handleToggleListOptions = () => {
      this.setState(
        (prevState) => ({
          isListSequencial: !prevState.isListSequencial,
        }),
        () => {
          this.props.onToggleListOptions(this.state.isListSequencial);
        },
      );
    };

    handleCategoryChange = (selectedCategory) => {
      this.setState({selectedCategory});
    };

    render() {
      const {categories, searchText, selectedCategory, limit} = this.state;
      const {data, searchOptions, sort} = this.props;
      let searchedData = data;

      if (categories && selectedCategory.key !== 'all') {
        searchedData = data.filter(
          (dt) =>
            (dt.categories && dt.categories.includes(selectedCategory.key)) ||
            (dt.category && dt.category === selectedCategory.key),
        );
      }

      if (searchText && searchText.length > 2) {
        const options = {keys: ['name'], ...searchOptions};
        const fuse = new Fuse(data, options);

        searchedData = fuse.search(searchText)?.map(({item}) => item);
      }

      const filteredData = searchedData.slice(0, limit);
      const isLoadingMoreEnabled = filteredData.length === limit;
      const sortedData = sort ? filteredData.sort(sort) : filteredData;

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          data={sortedData}
          isLoadingMoreEnabled={isLoadingMoreEnabled}
          onCategoryChange={this.handleCategoryChange}
          onLoadMore={this.handleLoadMore}
          onSearchInputChange={this.handleSeachInputChange}
          onToggleListOptions={this.handleToggleListOptions}
        />
      );
    }
  }

  ScrollFlatListHOC.propTypes = {
    categoriesList: PropTypes.arrayOf(PropTypes.any),
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    startWithSequencialList: PropTypes.bool,
    searchOptions: PropTypes.object,
    onLoadMore: PropTypes.func,
    onToggleListOptions: PropTypes.func,
    sort: PropTypes.func,
  };

  ScrollFlatListHOC.defaultProps = {
    categoriesList: undefined,
    startWithSequencialList: false,
    searchOptions: {},
    onLoadMore: undefined,
    onToggleListOptions: () => {},
    sort: null,
  };

  return ScrollFlatListHOC;
};

export default ScrollFlatListHOCWrapper;
