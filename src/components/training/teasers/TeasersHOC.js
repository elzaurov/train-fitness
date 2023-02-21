import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadTeasers} from '../../../actions';

const TeasersHOCWrapper = (InnerComponent) => {
  class TeasersHOC extends Component {
    state = {
      isListSequencial: this.props.startWithSequencialList,
      loading: true,
    };

    componentDidMount() {
      const {teaserPath} = this.props;

      this.props.loadTeasers(teaserPath).then(() => {
        this.setState({loading: false});
      });
    }

    handleToggleListOptions = (isListSequencial) => {
      this.setState({isListSequencial});
    };

    render() {
      const {teaserPath} = this.props;
      const {teasers} = this.props;
      const sortedTeasers = (teasers[teaserPath] || []).sort(({isPremium}) =>
        isPremium ? 1 : -1,
      );

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          teasers={sortedTeasers}
          onToggleListOptions={this.handleToggleListOptions}
        />
      );
    }
  }

  TeasersHOC.propTypes = {
    startWithSequencialList: PropTypes.bool,
    teaserPath: PropTypes.string.isRequired,
    teasers: PropTypes.objectOf(PropTypes.any).isRequired,
    loadTeasers: PropTypes.func.isRequired,
  };

  TeasersHOC.defaultProps = {
    startWithSequencialList: true,
  };

  const mapStateToProps = (state) => ({
    teasers: state.teasers,
  });

  return connect(mapStateToProps, {
    loadTeasers,
  })(TeasersHOC);
};

export default TeasersHOCWrapper;
