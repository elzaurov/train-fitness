import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {
    LeaderBoardScreenWrapper,
    FlexEnd,
    AvatarsWrapper,
} from '@traineffective/te-component-library';
// import { Colors } from '../../../constants';
// import UserRankingLoading from './UserRankingLoading';
import AllTimeRankingHOC from './AllTimeRankingHOC';
// import UserRanking from './UserRanking';
import LeaderBoardItemView from './LeaderBoardItemView';
import LeaderBoardTopThreeItemView from './LeaderBoardTopThreeItemView';

const AllTimeRanking = ({loading, ranking}) => {
    if (loading) {
        return null;
    }

    if (ranking.length < 5) {
        return (
            <LeaderBoardScreenWrapper>
                <FlatList
                    data={ranking}
                    keyExtractor={item => item.uid}
                    renderItem={({item}) => (
                        <LeaderBoardItemView userRanking={item} />
                    )}
                />
            </LeaderBoardScreenWrapper>
        );
    }

    return (
        <LeaderBoardScreenWrapper>
            <FlatList
                data={ranking.splice(3)}
                keyExtractor={item => item.uid}
                ListHeaderComponent={() => (
                    <AvatarsWrapper>
                        <FlexEnd>
                            <LeaderBoardTopThreeItemView
                                userRanking={ranking[1]}
                                stars={2}
                                headerRankStatus="2"
                            />
                        </FlexEnd>

                        <LeaderBoardTopThreeItemView
                            userRanking={ranking[0]}
                            isLeader
                            stars={0}
                        />
                        <FlexEnd>
                            <LeaderBoardTopThreeItemView
                                userRanking={ranking[2]}
                                stars={1}
                                headerRankStatus="3"
                            />
                        </FlexEnd>
                    </AvatarsWrapper>
                )}
                renderItem={({item}) => (
                    <LeaderBoardItemView userRanking={item} />
                )}
            />
        </LeaderBoardScreenWrapper>
    );
};

AllTimeRanking.propTypes = {
    loading: PropTypes.bool.isRequired,
    ranking: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AllTimeRankingHOC(AllTimeRanking);
