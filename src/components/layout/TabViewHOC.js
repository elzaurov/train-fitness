import React, {Component} from 'react';

const TabViewHOCWrapper = (InnerComponent) => {
  class TabViewHOC extends Component {
    state = {
      index: 0,
    };

    handleIndexChange = (index) => {
      this.setState({index});
      if(this.props.outerHandleIndexChange){
        this.props.outerHandleIndexChange(index);
      }
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onIndexChange={this.handleIndexChange}
        />
      );
    }
  }

  return TabViewHOC;
};

export default TabViewHOCWrapper;
