import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadSpecialist} from '../../actions';

const SpecialistHOCWrapper = (InnerComponent) => {
  class SpecialistHOC extends Component {
    state = {
      loading: true,
    };

    async componentDidMount() {
      await this.props.loadSpecialist(this.props.id);

      this.setState({loading: false});
    }

    render() {
      const {id, specialists} = this.props;

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          specialist={specialists[id] || {}}
        />
      );
    }
  }

  function mapStateToProps({specialists}) {
    return {specialists};
  }

  SpecialistHOC.propTypes = {
    id: PropTypes.string.isRequired,
    specialists: PropTypes.objectOf(PropTypes.any).isRequired,
    loadSpecialist: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, {loadSpecialist})(SpecialistHOC);
};

export default SpecialistHOCWrapper;
