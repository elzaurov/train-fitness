import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {Section} from '../common';
import Requirements from './requirements/Requirements';

const RequirementSections = ({requirements}) => {
    let equipments;
    let knowledge;

    if (
        requirements &&
        requirements.equipments &&
        requirements.equipments.length &&
        requirements.equipments.length > 0
    ) {
        equipments = (
            <Section title="You Will Need">
                <ScrollView horizontal bounces={false}>
                    <Requirements
                        requirements={{equipments: requirements.equipments}}
                    />
                </ScrollView>
            </Section>
        );
    }

    if (
        requirements &&
        requirements.knowledge &&
        requirements.knowledge.length &&
        requirements.knowledge.length > 0
    ) {
        knowledge = (
            <Section title="What to Know">
                <ScrollView horizontal bounces={false}>
                    <Requirements
                        requirements={{knowledge: requirements.knowledge}}
                    />
                </ScrollView>
            </Section>
        );
    }

    return (
        <>
            {equipments}
            {knowledge}
        </>
    );
};

RequirementSections.propTypes = {
    requirements: PropTypes.objectOf(PropTypes.any),
};

RequirementSections.defaultProps = {
    requirements: null,
};

export default RequirementSections;
