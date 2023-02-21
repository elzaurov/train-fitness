import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Linking, StyleSheet, View, FlatList} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import Swipeout from 'react-native-swipeout';
import {G, Text} from 'react-native-svg';
import {LinkText, RegularText} from '../../layout';
import {Colors, Layout, STATS_HELP_URL} from '../../../constants';
import ProfileStatsList from './ProfileStatsList';

const ProfileStats = ({hideGeneralStats, hideHelpLink, stats, style, t}) => {
  const {
    boxing,
    cycling,
    gym,
    running,
    swimming,
    tennis,
    yoga,
    liveMatchAnalysis,
    // personalCoachingSession,
    gameBrainSession,
    mentalSkillsTraining,
    casualmatch,
    casualMatch,
    match,
    matches,
    teamTraining,
    workouts,
    distance = {},
    passes = {},
    shots = {},
    touches = {},
  } = stats;

  const colors = [
    Colors.seance,
    Colors.alizarinCrimson,
    Colors.orange,
    Colors.seaBuckthorn,
    Colors.dodgerBlur,
    Colors.green,
    Colors.tamarillo,
  ];

  const crossTrainingStats = {
    name: t('crossTraining'),
    generalStats: true,
    data: [
      {subject: t('boxing'), value: boxing || 0.001},
      {subject: t('cycling'), value: cycling || 0.001},
      {subject: t('gym'), value: gym || 0.001},
      {subject: t('running'), value: running || 0.001},
      {subject: t('swimming'), value: swimming || 0.001},
      {subject: t('tennis'), value: tennis || 0.001},
      {subject: t('yoga'), value: yoga || 0.001},
    ],
  };

  const matchStats = {
    name: t('matchesWorkouts'),
    generalStats: true,
    data: [
      {subject: t('teamTraining'), value: teamTraining || 0.001},
      {subject: t('workouts'), value: workouts || 0.001},
      {
        subject: t('casualMatches'),
        value: casualmatch || 0 + casualMatch || 0 || 0.001,
      },
      {subject: t('matches'), value: match || 0 + matches || 0 || 0.001},
    ],
  };

  const mentalStats = {
    name: t('mentalTacticalTraining'),
    totalName: t('trainings'),
    generalStats: true,
    data: [
      {subject: t('matchAnalysis'), value: liveMatchAnalysis || 0.001},
      {subject: t('gameBrain'), value: gameBrainSession || 0.001},
      // { subject: t('personalCoaching'), value: personalCoachingSession || 0.001 },
      {subject: t('mentalSkills'), value: mentalSkillsTraining || 0.001},
    ],
  };

  const touchesStats = {
    name: t('touches'),
    data: [
      {subject: t('aerial'), value: touches.aerial || 0.001},
      {subject: t('dribbling'), value: touches.dribbling || 0.001},
      {subject: t('first'), value: touches.first || 0.001},
      {subject: t('juggles'), value: touches.juggles || 0.001},
    ],
  };

  const shotsStats = {
    name: t('shots'),
    data: [
      {subject: t('aerial'), value: shots.aerial || 0.001},
      {subject: t('long'), value: shots.long || 0.001},
      {subject: t('short'), value: shots.short || 0.001},
    ],
  };

  const passesStats = {
    name: t('passes'),
    data: [
      {subject: t('long'), value: passes.long || 0.001},
      {subject: t('short'), value: passes.short || 0.001},
    ],
  };

  const distanceStats = {
    name: t('distance'),
    data: [
      {
        subject: t('highTempo'),
        sufix: 'km',
        value: Number(((distance.highTempo || 0) / 1000).toFixed(2)) || 0.001,
      },
      {
        subject: t('jogging'),
        sufix: 'km',
        value: Number(((distance.jogging || 0) / 1000).toFixed(2)) || 0.001,
      },
      {
        subject: t('sprinting'),
        sufix: 'km',
        value: Number(((distance.sprinting || 0) / 1000).toFixed(2)) || 0.001,
      },
    ],
  };

  const Labels = ({slices}) =>
    slices.map((slice, index) => {
      const {labelCentroid, pieCentroid, data, startAngle, endAngle} = slice;
      const xValue = pieCentroid[0] > 0 ? pieCentroid[0] : -pieCentroid[0];
      const yValue = pieCentroid[1] > 0 ? pieCentroid[1] : -pieCentroid[1];
      const isXBigger = xValue > yValue;
      const angleDiff = endAngle - startAngle;
      const subject = data.subject.split(' ');
      const totalTitle = data.totalTitle.replace(' &', '_&').split(' ');
      const factor = index % 2 === 0 && angleDiff < 0.5 ? -1 : 1;
      const tx = pieCentroid[0] >= 0 ? 32 * factor : -32 * factor;
      const ty = pieCentroid[1] >= 0 ? 32 * factor : -32 * factor;

      return (
        <G key={index}>
          {data.value >= 0.1 && (
            <G
              transform={`translate(${isXBigger ? tx : 0} ${
                isXBigger ? 0 : ty
              })`}>
              {subject.map((text, tIndex) => (
                <Text
                  key={text}
                  x={pieCentroid[0]}
                  y={pieCentroid[1] + tIndex * 8}
                  fill="white"
                  textAnchor="middle"
                  alignmentBaseline="text-bottom"
                  fontSize="7">
                  {text}
                </Text>
              ))}
              <Text
                x={pieCentroid[0]}
                y={pieCentroid[1] + (subject.length - 1) * 8}
                fill="white"
                textAnchor="middle"
                alignmentBaseline="text-top"
                fontSize="9">
                {data.value < 0.1
                  ? `${Math.round(data.value)}${data.sufix}`
                  : `${data.value}${data.sufix}`}
              </Text>
            </G>
          )}
          {index === 0 && (
            <G>
              {totalTitle.map((text, tIndex) => (
                <Text
                  key={text}
                  x={0}
                  y={-3 + (totalTitle.length - 1 - tIndex) * -9}
                  fill="white"
                  textAnchor="middle"
                  alignmentBaseline="text-bottom"
                  fontSize="9">
                  {text.replace('_&', ' &')}
                </Text>
              ))}
              <Text
                x={0}
                y={0}
                fill="white"
                textAnchor="middle"
                alignmentBaseline="text-top"
                fontSize="13">
                {!data.isLast
                  ? Math.round(data.total)
                  : `${data.total.toFixed(2)}${data.sufix}`}
              </Text>
            </G>
          )}
        </G>
      );
    });

  const statsItems = [
    crossTrainingStats,
    matchStats,
    mentalStats,
    touchesStats,
    shotsStats,
    passesStats,
    distanceStats,
  ];

  const chartDataStats = statsItems.filter(
    ({generalStats}) => !hideGeneralStats || !generalStats,
  );

  const itemKeyExtractor = ({name}) => name;

  const ChartItem = ({index: key, item: {name, totalName, data}}) => (
    <View key={name} style={styles.chart}>
      <RegularText style={styles.title}>{name}</RegularText>
      <Swipeout
        style={styles.swipe}
        buttonWidth={Layout.window.width / 2}
        right={[
          {
            component: <ProfileStatsList colors={colors} data={data} />,
          },
        ]}>
        <PieChart
          style={{height: Layout.window.width - Layout.padding * 4}}
          valueAccessor={({item}) => item.value}
          spacing={10}
          outerRadius="80%"
          innerRadius="55%"
          labelRadius={10}
          data={data.map(({subject, sufix, value}, index) => ({
            key: subject,
            svg: {
              fill: colors[index],
            },
            subject,
            value,
            sufix: sufix || '',
            isLast: key === statsItems.length - 1,
            total: data.map((d) => d.value).reduce((d1, d2) => d1 + d2),
            totalTitle: `${t('total')} ${totalName || name}`,
          }))}>
          <Labels />
        </PieChart>
      </Swipeout>
    </View>
  );

  return (
    <View style={[styles.view, style]}>
      {!hideHelpLink && (
        <LinkText
          style={styles.linkWrapper}
          textStyle={styles.link}
          onPress={() => Linking.openURL(STATS_HELP_URL)}
          iconLeft="help-circle">
          {t('help')}
        </LinkText>
      )}
      <FlatList
        data={chartDataStats}
        renderItem={ChartItem}
        keyExtractor={itemKeyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

ProfileStats.propTypes = {
  hideGeneralStats: PropTypes.bool,
  hideHelpLink: PropTypes.bool,
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
  style: PropTypes.any,
  t: PropTypes.func.isRequired,
};

ProfileStats.defaultProps = {
  hideGeneralStats: false,
  hideHelpLink: false,
  style: {},
};

export default withTranslation('profileStatsComponent')(ProfileStats);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: Layout.padding,
    paddingTop: Layout.padding,
  },
  title: {
    fontSize: 16,
    marginBottom: Layout.halfMargin,
  },
  linkWrapper: {
    marginBottom: Layout.margin,
  },
  link: {
    fontSize: 16,
  },
  swipe: {
    backgroundColor: Colors.background,
  },
  chart: {
    marginBottom: Layout.margin,
  },
});
