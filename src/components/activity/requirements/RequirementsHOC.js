import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadRequirements} from '../../../actions';

const RequirementsHOCWrapper = (InnerComponent) => {
  class RequirementsHOC extends Component {
    state = {
      requirements: {
        equipments: [],
        knowledge: [],
      },
      loading: true,
    };

    async componentDidMount() {
      let {requirements} = this.props;
      const loadedRequirements = await this.props.loadRequirements();
      const {equipments, knowledge} = requirements;

      requirements = {
        equipments: (equipments || []).map((key) => ({
          key,
          ...loadedRequirements.equipments[key],
        })),
        knowledge: (knowledge || []).map((key) => ({
          key,
          ...loadedRequirements.knowledge[key],
        })),
      };

      this.setState({loading: false, requirements});
    }

    render() {
      return <InnerComponent {...this.props} {...this.state} />;
    }
  }

  RequirementsHOC.propTypes = {
    loadRequirements: PropTypes.func.isRequired,
    requirements: PropTypes.shape({
      equipments: PropTypes.array,
      knowledge: PropTypes.array,
    }).isRequired,
  };

  const mapDispatchToProps = {
    loadRequirements,
  };

  return connect(null, mapDispatchToProps)(RequirementsHOC);
};

export default RequirementsHOCWrapper;
