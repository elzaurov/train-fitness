import * as React from 'react';
import {LeaderBoardAvatar} from '@traineffective/te-component-library';
import {withTranslation} from 'react-i18next';
import UserRankingHOC from './UserRankingHOC';
import {getBadgeColor} from '../../../utils/badgeColor';

interface ILeaderBoardTopThreeItemViewProps {
    profile: any;
    loading: boolean;
    handlePress: () => void;
    level?: number;
    userRanking?: any;
    isLeader?: boolean;
    t: (string: string) => string;
    stars: number;
    headerRankStatus: string;
}

const LeaderBoardTopThreeItemView: React.FC<ILeaderBoardTopThreeItemViewProps> =
    props => {
        if (props.loading) {
            return null;
        }

        const userlevel = props?.profile?.level ?? props?.userRanking?.level;

        return (
            <LeaderBoardAvatar
                badgeColor={getBadgeColor(userlevel)}
                stars={props.stars}
                badgeText={userlevel}
                streak={props?.userRanking?.streak || 0}
                userName={props?.profile?.displayName ?? props.t('Player')}
                leaderBoardStats={`${props?.userRanking?.experience} ${props.t(
                    'XP',
                )}`}
                avatarImage={
                    props.profile.photoURL ??
                    'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'
                }
                userId={props?.profile?.uid ?? props?.userRanking?.uid}
                showCrownBadge={props?.isLeader}
                rankStatus={
                    // eslint-disable-next-line no-nested-ternary
                    props?.userRanking?.positionDiff === 0
                        ? 'both'
                        : props?.userRanking?.positionDiff < 0
                        ? 'down'
                        : 'up'
                }
                handlePress={props.handlePress}
                headerRankStatus={props.headerRankStatus}
            />
        );
    };

export default UserRankingHOC(
    withTranslation('profile')(LeaderBoardTopThreeItemView),
);
