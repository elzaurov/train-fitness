import React, {useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Toast} from '../common';
import {removeEvent} from '../../actions';

const Events = () => {
  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const latestEvent = useMemo(() => {
    if (!events || Object.keys(events).length === 0) {
      return null;
    }

    const latestEventId = Object.keys(events).sort((a, b) => b - a)[0];

    return {
      id: latestEventId,
      ...events[latestEventId],
    };
  }, [events]);

  const handleEventSeen = () => {
    dispatch(removeEvent(latestEvent.id));
  };
  const handlePress = () => {
    const {onPress, ...rest} = latestEvent;
    onPress(rest);
    handleEventSeen();
  };

  return latestEvent ? (
    <Toast
      key={latestEvent.id}
      title={latestEvent.title}
      text={latestEvent.text.toString()}
      type={latestEvent.type}
      onPress={handlePress}
      onSeen={handleEventSeen}
    />
  ) : null;
};

export default Events;
