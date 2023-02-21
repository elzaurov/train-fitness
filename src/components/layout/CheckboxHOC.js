import React, {Component} from 'react';
import PropTypes from 'prop-types';

const checkboxHOCWrapper = (InnerComponent) => {
  class checkboxHOC extends Component {
    state = {
      isChecked: false,
    };

    componentDidMount() {
      this.setState({isChecked: this.props.initialChecked});
    }

    handleToggleCheckbox = () => {
      this.setState(
        (prevState) => ({
          isChecked: !prevState.isChecked,
        }),
        () => {
          this.props.onToggleCheckbox(this.state.isChecked);
        },
      );
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onToggleCheckbox={this.handleToggleCheckbox}
        />
      );
    }
  }

  checkboxHOC.propTypes = {
    initialChecked: PropTypes.bool,
    onToggleCheckbox: PropTypes.func,
  };

  checkboxHOC.defaultProps = {
    initialChecked: false,
    onToggleCheckbox: () => {},
  };

  return checkboxHOC;
};

export default checkboxHOCWrapper;
