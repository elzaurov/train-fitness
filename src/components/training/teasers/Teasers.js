import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {ScrollFlatList} from '../../layout';
import Teaser from './Teaser';
import TeaserLoading from './TeaserLoading';
import TeasersHOC from './TeasersHOC';

const Teasers = ({
  isSmall,
  isListSequencial,
  navigation,
  loading,
  teasers,
  pushKey,
  pushUrl,
  onToggleListOptions,
  hideName,
  hideSearch,
  hideListOptions,
  t,
}) => {
  const loadingItem = [{key: '0'}, {key: '1'}, {key: '2'}];

  return (
    <ScrollFlatList
      searchPlaceholder={t('searchPlaceholder')}
      hideSearch={!!hideName}
      hideListOptions={!!hideListOptions}
      data={loading ? loadingItem : teasers}
      startWithSequencialList={isListSequencial}
      renderItem={({item}) => {
        if (loading) {
          return <TeaserLoading />;
        }

        return (
          <Teaser
            teaser={item}
            isSmall={isSmall}
            hideName={hideName}
            isListSequencial={isListSequencial}
            onPress={() => navigation.push(pushUrl, {[pushKey]: item.key})}
          />
        );
      }}
      onToggleListOptions={onToggleListOptions}
    />
  );
};

Teasers.propTypes = {
  isListSequencial: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  teasers: PropTypes.arrayOf(PropTypes.object).isRequired,
  pushKey: PropTypes.string.isRequired,
  pushUrl: PropTypes.string.isRequired,
  onToggleListOptions: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default TeasersHOC(withTranslation('teasersComponent')(Teasers));
