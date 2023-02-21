import * as React from 'react';
import {LeaderBoardItem} from '@traineffective/te-component-library';
import {withTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import UserRankingHOC from './UserRankingHOC';
import {getBadgeColor} from '../../../utils/badgeColor';

interface ILeaderBoardItemViewProps {
    profile: any;
    loading: boolean;
    handlePress: () => void;
    level?: number;
    userRanking?: any;
    t: (string: string) => string;
}

const LeaderBoardItemView: React.FC<ILeaderBoardItemViewProps> = props => {
    if (props.loading) {
        return null;
    }

    const userLevel = props?.profile?.level ?? props?.userRanking?.level;

    return (
        <TouchableOpacity onPress={props?.handlePress}>
            <LeaderBoardItem
                badgeColor={getBadgeColor(userLevel)}
                index={props?.userRanking?.position}
                item={{
                    avatarImage:
                        props?.profile?.photoURL ??
                        'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
                    level: userLevel,
                    experience: `${props?.userRanking?.experience} XP`,
                    streak: props?.profile?.streak ?? 0,
                    rank: props?.userRanking?.position,
                    rankStatus:
                        // eslint-disable-next-line no-nested-ternary
                        props?.userRanking?.positionDiff === 0
                            ? 'both'
                            : props?.userRanking?.positionDiff < 0
                            ? 'down'
                            : 'up',
                    userName: props?.profile?.displayName ?? props?.t('Player'),
                    userId: props?.profile?.uid ?? props?.userRanking?.uid,
                }}
            />
        </TouchableOpacity>
    );
};

export default UserRankingHOC(withTranslation('profile')(LeaderBoardItemView));
