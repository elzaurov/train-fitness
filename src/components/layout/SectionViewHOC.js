import React, {Component} from 'react';
import PropTypes from 'prop-types';

const SectionViewHOCWrapper = (InnerComponent) => {
  class SectionViewHOC extends Component {
    state = {
      selectedTab: {},
    };

    componentDidMount() {
      const {sections} = this.props;
      const selectedTab = {};

      for (let i = 0, len = sections.length; i < len; i += 1) {
        const {key, tabs} = sections[i];

        if (tabs) {
          selectedTab[key] = tabs[0].value;
        } else {
          selectedTab[key] = undefined;
        }
      }

      this.setState({selectedTab});
    }

    handleSelectTab = (key, tab) => {
      const {selectedTab} = this.state;

      selectedTab[key] = tab;

      this.setState({selectedTab});
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onSelectTab={this.handleSelectTab}
        />
      );
    }
  }

  SectionViewHOC.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  return SectionViewHOC;
};

export default SectionViewHOCWrapper;
