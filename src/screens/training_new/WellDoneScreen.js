import React from 'react';
import { WellDone } from '@traineffective/te-component-library'
import { Colors } from '../../constants'

const WellDoneScreen = ({
    navigation,
}) => {
    return (
        <WellDone
            experience={1250}
            finshedDate={'6 APRIL 2021'}
            workout={'Workout', 'The anyhwere workout dribbling A'}
            handleCollectButton={()=>{navigation.popToTop()}}
        />
    )
}

export default WellDoneScreen;
