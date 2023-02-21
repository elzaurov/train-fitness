import React, {createRef, Component} from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

class RecommendationSwiper extends Component {
  constructor(props) {
    super(props);

    this.swiperRef = createRef();
    this.index = this.props.selectedIndex;
  }

  shouldComponentUpdate(nextProps) {
    const offsetIndex = nextProps.selectedIndex - this.index;

    if (offsetIndex) {
      this.index = nextProps.selectedIndex;
      this.swiperRef.current?.scrollBy(offsetIndex);
    }

    return false;
  }

  handleIndexChanged = (index) => {
    this.index = index;
    this.props.onIndexChanged(index);
  };

  render() {
    return (
      <Swiper
        {...this.props}
        ref={this.swiperRef}
        index={this.index}
        onIndexChanged={this.handleIndexChanged}
      />
    );
  }
}

RecommendationSwiper.propTypes = {
  selectedIndex: PropTypes.number,
  onIndexChanged: PropTypes.func,
};

RecommendationSwiper.defaultProps = {
  selectedIndex: 0,
  onIndexChanged: null,
};

export default RecommendationSwiper;
