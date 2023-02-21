import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../../layout';

const BrowseCollectionScreenHOCWrapper = InnerComponent => {
    class BrowseCollectionScreenHOC extends Component {
        static navigationOptions = {
            title: 'COLLECTION',
            header: props => <Header mode="back" {...props} backButton />,
        };

        render() {
            const id = this.props.route.params?.id;

            return <InnerComponent {...this.props} {...this.state} id={id} />;
        }
    }

    BrowseCollectionScreenHOC.propTypes = {
        route: PropTypes.object.isRequired,
    };

    return BrowseCollectionScreenHOC;
};

export default BrowseCollectionScreenHOCWrapper;
