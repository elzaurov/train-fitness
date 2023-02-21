import React, {Component} from 'react';

const RepSetHOCWrapper = (InnerComponent) => {
  class RepSetHOC extends Component {
    state = {
      infoModalVisible: false,
      tipsModalVisible: false,
    };

    handleModalVisibleChange = (modalVisible) => {
      this.setState({
        infoModalVisible: modalVisible,
      });
    };

    handleTipsModalVisibleChange = (modalVisible) => {
      this.setState({
        tipsModalVisible: modalVisible,
      });
    };

    render() {
      return (
        <InnerComponent
          onModalVisibleChange={this.handleModalVisibleChange}
          onTipsModalVisibleChange={this.handleTipsModalVisibleChange}
          {...this.props}
          {...this.state}
        />
      );
    }
  }

  return RepSetHOC;
};

export default RepSetHOCWrapper;
