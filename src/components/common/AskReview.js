import PropTypes from 'prop-types';
import AskReviewHOC from './AskReviewHOC';

const AskReview = ({children}) => children;

AskReview.propTypes = {
  children: PropTypes.node,
};

AskReview.defaultProps = {
  children: null,
};

export default AskReviewHOC(AskReview);
