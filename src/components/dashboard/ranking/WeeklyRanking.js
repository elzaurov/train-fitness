import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {
    LeaderBoardScreenWrapper,
    FlexEnd,
    AvatarsWrapper,
} from '@traineffective/te-component-library';
import WeeklyRankingHOC from './WeeklyRankingHOC';
import LeaderBoardItemView from './LeaderBoardItemView';
import LeaderBoardTopThreeItemView from './LeaderBoardTopThreeItemView';

const WeeklyRanking = ({loading, weeklyRanking}) => {
    if (loading) {
        return null;
    }

    if (weeklyRanking.length < 5) {
        return (
            <LeaderBoardScreenWrapper>
                <FlatList
                    data={weeklyRanking}
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
                data={weeklyRanking.splice(3)}
                keyExtractor={item => item.uid}
                ListHeaderComponent={() => (
                    <AvatarsWrapper>
                        <FlexEnd>
                            <LeaderBoardTopThreeItemView
                                userRanking={weeklyRanking[1]}
                                stars={2}
                                headerRankStatus="2"
                            />
                        </FlexEnd>

                        <LeaderBoardTopThreeItemView
                            userRanking={weeklyRanking[0]}
                            isLeader
                            stars={0}
                        />
                        <FlexEnd>
                            <LeaderBoardTopThreeItemView
                                userRanking={weeklyRanking[2]}
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

WeeklyRanking.propTypes = {
    loading: PropTypes.bool.isRequired,
    weeklyRanking: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WeeklyRankingHOC(WeeklyRanking);
