import React, {Component} from 'react';
import PropTypes from 'prop-types';

const CollapsibleHOCWrapper = (InnerComponent) => {
  class CollapsibleHOC extends Component {
    state = {
      isCollapsed: false,
    };

    componentDidMount() {
      this.setState({isCollapsed: this.props.initialCollapsed});
    }

    handleCollapse = () => {
      this.setState((prevState) => ({
        isCollapsed: !prevState.isCollapsed,
      }));
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

  CollapsibleHOC.propTypes = {
    initialCollapsed: PropTypes.bool,
  };

  CollapsibleHOC.defaultProps = {
    initialCollapsed: false,
  };

  return CollapsibleHOC;
};

export default CollapsibleHOCWrapper;
