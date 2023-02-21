import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import {RegularText} from '../../layout';
import RequirementsHOC from './RequirementsHOC';
import RequirementsLoading from './RequirementsLoading';
import RequirementIcon from './RequirementIcon';

const Requirements = ({
    requirements,
    style,
    itemStyle,
    imageStyle,
    textStyle,
    loading,
}) => {
    if (loading === true) {
        return <RequirementsLoading />;
    }

    return (
        <View style={[styles.container, style]}>
            {requirements.equipments &&
                requirements.equipments.map(equipment => (
                    <View style={[styles.item, itemStyle]} key={equipment.key}>
                        <RequirementIcon
                            style={[styles.itemIcon, imageStyle]}
                            {...equipment}
                        />
                        <RegularText style={[styles.itemText, textStyle]}>
                            {equipment.name}
                        </RegularText>
                    </View>
                ))}
            {requirements.knowledge &&
                requirements.knowledge.map(knowledge => (
                    <View style={styles.item} key={knowledge.key}>
                        <RequirementIcon
                            style={[styles.itemIcon, imageStyle]}
                            {...knowledge}
                        />
                        <RegularText style={styles.itemText}>
                            {knowledge.name}
                        </RegularText>
                    </View>
                ))}
        </View>
    );
};

Requirements.propTypes = {
    requirements: PropTypes.shape({
        equipments: PropTypes.array,
    }).isRequired,
    style: ViewPropTypes.style,
    itemStyle: PropTypes.object,
    imageStyle: PropTypes.object,
    textStyle: PropTypes.object,
    loading: PropTypes.bool.isRequired,
};

Requirements.defaultProps = {
    style: {},
    itemStyle: {},
    imageStyle: {},
    textStyle: {},
};

export default RequirementsHOC(Requirements);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 6,
    },
    item: {
        width: 100,
        alignItems: 'center',
    },
    itemIcon: {
        flex: 0,
        width: 32,
        height: 32,
        resizeMode: 'contain',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 10,
    },
    itemText: {
        textAlign: 'center',
        fontSize: 15,
    },
});
