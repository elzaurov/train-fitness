import React from 'react';
import PropTypes from 'prop-types';
import ProgramScreenHOC from '../training/ProgramScreenHOC';
import {
  ActivityDetails,
  ActivityLoading,
  IntendedResults,
  // Earnings,
  ProgramWorkouts,
  CollapsibleTextView,
  FeaturedPeople,
  RequirementSections,
} from '../../components';
import {CheckPlanWrapper} from '../../layout';
import {Colors} from '../../constants';

const ProgramScreen = ({
  navigation,
  program,
  loading,
  scheduling,
  onAddToCalendarPress,
  disabledPhases,
}) => {
  if (loading === true) {
    return <ActivityLoading />;
  }

  let selectTitle = '';

  if (onAddToCalendarPress) {
    selectTitle = 'Select This Program';
  } else {
    selectTitle = 'Add to Calendar';
  }

  const {
    description,
    designedBy,
    requirements,
    phases,
    isPremium,
    intendedResults,
  } = program;
  return (
    <CheckPlanWrapper navigation={navigation}>
      <ActivityDetails
        selectTitle={selectTitle}
        activity={program}
        navigation={navigation}
        scheduling={scheduling}
        onAddToCalendarPress={onAddToCalendarPress}>
        <CollapsibleTextView
          text={description || ''}
          initialCollapsed={true}
          numberOfLines={5}
          textStyle={{fontSize: 15, color: Colors.text}}
        />
        <RequirementSections requirements={requirements} />
        <IntendedResults intendedResults={intendedResults} />
        <ProgramWorkouts
          phases={phases}
          isPremium={isPremium}
          navigation={navigation}
          disabledPhases={disabledPhases}
        />
        {designedBy && <FeaturedPeople people={[designedBy]} />}
        {/* <Earnings earnings={earnings} /> */}
      </ActivityDetails>
    </CheckPlanWrapper>
  );
};

ProgramScreen.propTypes = {
  onAddToCalendarPress: PropTypes.func,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  program: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool.isRequired,
  scheduling: PropTypes.bool.isRequired,
  disabledPhases: PropTypes.bool,
};

ProgramScreen.defaultProps = {
  onAddToCalendarPress: null,
  program: null,
  disabledPhases: false,
};

const wrappedProgramScreen = ProgramScreenHOC(ProgramScreen);
wrappedProgramScreen.navigationOptions = {
  header: () => null,
};

export default wrappedProgramScreen;
