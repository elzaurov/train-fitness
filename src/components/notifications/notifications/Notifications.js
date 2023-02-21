import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {ScrollFlatList} from '../../layout';
import Notification from './Notification';
import NotificationLoading from './NotificationLoading';
import NotificationsHOC from './NotificationsHOC';

const Notifications = ({loading, navigation, notifications, onLoadMore}) => {
  const loadingItems = [
    {key: '0'},
    {key: '1'},
    {key: '2'},
    {key: '3'},
    {key: '4'},
    {key: '5'},
  ];

  return (
    <ScrollFlatList
      style={styles.list}
      headerStyle={styles.list}
      optionsStyle={styles.list}
      hideSearch={true}
      hideListOptions={true}
      onLoadMore={onLoadMore}
      data={loading ? loadingItems : notifications}
      renderItem={({item, index, loadingMore}) => {
        if (loading) {
          return <NotificationLoading />;
        }

        if (index === notifications.length - 1 && loadingMore) {
          return (
            <Fragment>
              <Notification navigation={navigation} notification={item} />
              {loadingItems.map((it, indx) => (
                <NotificationLoading key={indx} />
              ))}
            </Fragment>
          );
        }

        return <Notification navigation={navigation} notification={item} />;
      }}
    />
  );
};

Notifications.propTypes = {
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default NotificationsHOC(Notifications);

const styles = StyleSheet.create({
  list: {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    paddingTop: 0,
  },
});