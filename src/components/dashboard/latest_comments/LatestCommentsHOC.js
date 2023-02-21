import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadLatestComments} from '../../../actions';

const LatestCommentsHOCWrapper = (InnerComponent) => {
  class LatestCommentsHOC extends Component {
    state = {
      loading: true,
    };

    async componentDidMount() {
      await this.props.loadLatestComments();

      this.setState({loading: false});
    }

    render() {
      const {latestComments} = this.props;

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          comments={latestComments}
        />
      );
    }
  }

  function mapStateToProps({latestComments, plan}) {
    return {latestComments, plan};
  }

  LatestCommentsHOC.propTypes = {
    latestComments: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadLatestComments: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, {
    loadLatestComments,
  })(LatestCommentsHOC);
};

export default LatestCommentsHOCWrapper;
