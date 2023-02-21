import React, {Component} from 'react';
import PropTypes from 'prop-types';

const HeaderProgressHOCWrapper = (InnerComponent) => {
  class HeaderProgressHOC extends Component {
    componentDidMount() {}

    render() {
      const {percentage} = this.props;

      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          percentage={percentage}
        />
      );
    }
  }

  HeaderProgressHOC.propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    percentage: PropTypes.number,
  };

  HeaderProgressHOC.defaultProps = {
    percentage: null,
  };

  return HeaderProgressHOC;
};

export default HeaderProgressHOCWrapper;
