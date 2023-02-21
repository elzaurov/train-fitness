import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Feed} from '../../components';
import {CheckPlanWrapper} from '../../layout';
import {
    loadMoreLatestNotes,
    loadLatestNotes,
    loadNotesCategories,
    loadNotesFeelings,
} from '../../actions';

const FeedScreen = ({navigation}) => {
    const latestNotes = useSelector(state => state.latestNotes);
    const notesFeelings = useSelector(state => state.notesFeelings);
    const notesCategories = useSelector(state => state.notesCategories);

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [reachEnd, setReachEnd] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        async function getNotes() {
            await Promise.all([
                dispatch(loadNotesCategories()),
                dispatch(loadNotesFeelings()),
                dispatch(loadLatestNotes()),
            ]);
        }
        getNotes();
        setIsLoading(false);
        return {};
    }, [dispatch]);

    const handleLoadMore = async () => {
        if (latestNotes.length > 0 && !updating && !isLoading) {
            if (!reachEnd) {
                setUpdating(true);
            }
            const lastIndex = latestNotes.length - 1;
            const latestEditedAt = latestNotes[lastIndex].editedAt;
            const request = {
                latestEditedAt,
                onSuccess: latest => {
                    setUpdating(false);
                    if (latest.length === 0) {
                        setReachEnd(true);
                    }
                    setUpdating(false);
                },
                onFail: err => {
                    setUpdating(false);
                },
            };
            dispatch(loadMoreLatestNotes(request));
        }
    };

    const onLatestNotes = () => {
        dispatch(loadLatestNotes());
    };

    return (
        <CheckPlanWrapper navigation={navigation}>
            <Feed
                updating={updating}
                isLoading={isLoading}
                navigation={navigation}
                onLoadMore={handleLoadMore}
                notesFeelings={notesFeelings}
                notesCategories={notesCategories}
                onLatestNotes={onLatestNotes}
                latestNotesFilled={latestNotes.sort(
                    (a, b) => b.editedAt - a.editedAt,
                )}
            />
        </CheckPlanWrapper>
    );
};

FeedScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default FeedScreen;
