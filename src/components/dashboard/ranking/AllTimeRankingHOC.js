import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadRanking, loadUserRanking} from '../../../actions';

const AllTimeRankingHOCWrapper = InnerComponent => {
    class AllTimeRankingHOC extends Component {
        state = {
            loading: true,
        };

        async componentDidMount() {
            await Promise.all([
                this.props.loadRanking(),
                this.props.loadUserRanking(),
            ]);

            this.setState({loading: false});
        }

        render() {
            return <InnerComponent {...this.state} {...this.props} />;
        }
    }

    AllTimeRankingHOC.propTypes = {
        // navigation: PropTypes.objectOf(PropTypes.any).isRequired,
        loadRanking: PropTypes.func.isRequired,
        loadUserRanking: PropTypes.func.isRequired,
    };

    function mapStateToProps({ranking, userRanking}) {
        return {ranking, userRanking};
    }

    return connect(mapStateToProps, {
        loadRanking,
        loadUserRanking,
    })(AllTimeRankingHOC);
};

export default AllTimeRankingHOCWrapper;
