import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadPrograms, loadRequirements} from '../../actions';

const ProgramsScreenHOCWrapper = (InnerComponent) => {
  class ProgramsScreenHOC extends Component {
    state = {
      programs: null,
      loading: true,
    };

    async componentDidMount() {
      this.setState({loading: true});

      const programs = await this.props.loadPrograms();

      // redux backward compatibility
      const programsArray = Object.entries(programs).map(([key, program]) => ({
        ...program,
        key,
      }));

      this.setState({
        programs: programsArray,
        loading: false,
      });
    }

    handleProgramSelect = (id) => {
      this.props.navigation.push('ViewProgram', {id});
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          {...this.state}
          onProgramSelect={this.handleProgramSelect}
        />
      );
    }
  }

  ProgramsScreenHOC.propTypes = {
    loadPrograms: PropTypes.func.isRequired,
    loadRequirements: PropTypes.func.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  const mapDispatchToProps = {
    loadPrograms,
    loadRequirements,
  };

  return connect(null, mapDispatchToProps)(ProgramsScreenHOC);
};

export default ProgramsScreenHOCWrapper;
