import React, {Component} from 'react';
import PropTypes from 'prop-types';

const CollapsibleSectionViewHOCWrapper = (InnerComponent) => {
  class CollapsibleSectionViewHOC extends Component {
    state = {
      isCollapsed: {},
    };

    componentDidMount() {
      const {sections} = this.props;
      const isCollapsed = {};

      for (let i = 0, len = sections.length; i < len; i += 1) {
        const {key, collapsed} = sections[i];

        isCollapsed[key] = !!collapsed;
      }

      this.setState({isCollapsed});
    }

    handleCollapse = (index) => {
      const {isCollapsed} = this.state;

      isCollapsed[index] = !isCollapsed[index];

      this.setState({isCollapsed});
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onCollapse={this.handleCollapse}
        />
      );
    }
  }

  CollapsibleSectionViewHOC.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  return CollapsibleSectionViewHOC;
};

export default CollapsibleSectionViewHOCWrapper;
