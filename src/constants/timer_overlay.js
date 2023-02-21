import Layout from './Layout';
import {Platform, StatusBar} from 'react-native';

export const ANIMATION_DURATION = 250;
const STATUSBAR_HEIGHT = Platform.select({
  ios: Layout.isIphoneX ? 24 : 0,
  android: StatusBar.currentHeight - 20,
  default: 0,
});
const ADDITIONAL_HEIGHT = Platform.select({
  ios: Layout.isIphoneX ? 110 : 75,
  android: 75,
  default: 0,
});

const VIDEO_HEIGHT = (9 / 16) * Layout.window.width;
const MARGIN_VALUE = Layout.headerHeight + ADDITIONAL_HEIGHT;
export const VIDEO_OVERLAY_MAX_HEIGHT =
  Layout.window.height - VIDEO_HEIGHT - MARGIN_VALUE - STATUSBAR_HEIGHT;

export const OVERLAY_MAX_HEIGHT = Layout.window.height * 0.65;
export const OVERLAY_MEDIUM_HEIGHT = Layout.window.height * 0.15;
export const OVERLAY_MIN_HEIGHT = 0.08;

export const ACTION_CONTAINER_HEIGHT = 80;
export const ACTION_CONTAINER_PADDING = Layout.padding;
export const TITLE_CONTAINER_HEIGHT = 50;

export const TIME_TEXT_WIDTH = 120;
export const TIME_CONTAINER_LEFT =
  (Layout.window.width / 2 - 2 * Layout.padding - TIME_TEXT_WIDTH) * -1;
export const TIME_TEXT_FONT_SIZE = 90;

export const CLOSE_CONTAINER_LEFT = Layout.padding - 6;
export const CLOSE_ACTION_WIDTH = 50;

export const REST_TEXT_CONTAINER_HEIGHT = 80;
