import React from 'react';
import {SelectedSingleLesson} from '@traineffective/te-component-library';

const SingleLessonScreen = ({params}) => {
    const singleLessonData = [
        {
            id: 1,
            isLikeActive: true,
            isUnlikeActive: false,
            userName: 'Kalvin Henderson',
            postDateTime: '10 min ago',
            userComment:
                'Technical elegance and absolute expertise in the touch of the ball and free kicks. World class player.',
            likeCount: 12,
            unlikeCount: 1,
        },
        {
            id: 2,
            isLikeActive: false,
            isUnlikeActive: false,
            userName: 'John Smith',
            postDateTime: '2 days ago',
            userComment: 'do you think i can do it? 😝',
            likeCount: 1,
            unlikeCount: 10,
        },
    ];
    return (
        <SelectedSingleLesson
            experienceStats={555}
            experienceMinutes={35}
            data={singleLessonData}
            avatarImage="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
            avatarCommentImage="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
        />
    );
};

export default SingleLessonScreen;
