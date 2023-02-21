import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updatePreferences} from '../../actions';

const WelcomeModalHOCWrapper = (InnerComponent) => {
  class WelcomeModalHOC extends Component {
    state = {
      notShowAgain: false,
      selectedIndex: -1,
      item: undefined,
      submitting: false,
    };

    handleItemClick = (selectedIndex, item) => {
      this.setState({selectedIndex, item});
    };

    handleToggleNotShowAgain = () => {
      this.setState({notShowAgain: !this.state.notShowAgain});
    };

    handleModalSubmit = () => {
      const {notShowAgain, item} = this.state;

      this.setState({submitting: true}, () => {
        if (notShowAgain) {
          this.props
            .updatePreferences({
              welcomeMessage: true,
              subcategory: item,
            })
            .then(() => {
              this.props.onSubmit(item);
              this.setState({submitting: false});
            });
        } else {
          this.props.onSubmit(item);
          this.setState({submitting: false});
        }
      });
    };

    render() {
      return (
        <InnerComponent
          {...this.state}
          {...this.props}
          onItemClick={this.handleItemClick}
          onToggleNotShowAgain={this.handleToggleNotShowAgain}
          onModalSubmit={this.handleModalSubmit}
        />
      );
    }
  }

  function mapStateToProps({plan}) {
    return {plan};
  }

  WelcomeModalHOC.propTypes = {
    updatePreferences: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, {updatePreferences})(WelcomeModalHOC);
};

export default WelcomeModalHOCWrapper;
