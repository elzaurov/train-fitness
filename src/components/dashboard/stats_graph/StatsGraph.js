import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {withTranslation} from 'react-i18next';
import {LineChart, YAxis, XAxis} from 'react-native-svg-charts';
import StatsGraphHOC from './StatsGraphHOC';
import {RegularText, ScreenScrollView} from '../../layout';
import {ProfileStats} from '../../settings';
import {Colors, Layout} from '../../../constants';

const StatsGraph = ({points, stats, t}) => {
  const axesSvg = {fontSize: 10, fill: 'grey'};
  const verticalContentInset = {top: 10, bottom: 10};
  const xAxisHeight = 30;

  return (
    <ScreenScrollView>
      <RegularText style={styles.title}>{t('title')}</RegularText>
      <View
        style={{
          height: 200,
          width: Layout.window.width - Layout.padding * 2,
          flexDirection: 'row',
        }}>
        <YAxis
          data={points.map((p) => p.experience)}
          formatLabel={(value) => `${value}xp`}
          style={{marginBottom: xAxisHeight}}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart
            horizontal={true}
            style={{flex: 1}}
            data={points.map((p) => p.experience)}
            animate={true}
            animationDuration={10000}
            contentInset={verticalContentInset}
            svg={{stroke: Colors.secondary, strokeWidth: 2}}
          />
          <XAxis
            style={{marginHorizontal: -10, height: xAxisHeight}}
            data={points.map((p, i) => i)}
            formatLabel={(value, index) => `${points[index].name}`}
            contentInset={{left: 10, right: 10}}
            svg={axesSvg}
          />
        </View>
      </View>
      <ProfileStats hideHelpLink={true} stats={stats} style={{padding: 0}} />
    </ScreenScrollView>
  );
};

StatsGraph.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default StatsGraphHOC(
  withTranslation('statsGraphComponent')(StatsGraph),
);

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    paddingBottom: Layout.padding,
  },
});
