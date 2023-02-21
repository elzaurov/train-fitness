import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, ViewPropTypes} from 'react-native';
import {Svg, G, Path, Text, TSpan} from 'react-native-svg';
import {Colors} from '../../../constants';

const SELECTED_TSHIRT_BACK_COLOR = Colors.primary;
const SELECTED_TSHIRT_FORE_COLOR = Colors.secondary;
const TSHIRT_BACK_COLOR = Colors.gray4;
const TSHIRT_FORE_COLOR = Colors.auto;

const Position = ({isSelected, onSelect, text, style, ...rest}) => (
  <TouchableOpacity onPress={onSelect} style={style}>
    <Svg viewBox="0 0 32 43" {...rest}>
      <G transform="translate(-0.448 0)">
        <Path
          d="M819.846,538.1h16l-8,9.777Z"
          transform="translate(-811.751 -538.097)"
          fill={isSelected ? SELECTED_TSHIRT_BACK_COLOR : TSHIRT_BACK_COLOR}
        />
        <Path
          d="M810.7,538.1h-1.9a.769.769,0,0,0-.757.642,3.79,3.79,0,0,1-7.47,0,.769.769,0,0,0-.757-.642h-1.792a4.658,4.658,0,0,0-3.271,1.341l-6,5.909a1.5,1.5,0,0,0-.008,2.124l2.512,2.512a1.5,1.5,0,0,0,2.116,0l1.493-1.493a.714.714,0,0,1,1.219.505v9.594a3.323,3.323,0,0,0,2.152,3.125,17.545,17.545,0,0,0,6.066.891,18.638,18.638,0,0,0,6.108-.826,3.326,3.326,0,0,0,2.209-3.146v-9.539a.714.714,0,0,1,1.219-.505l1.393,1.393a1.5,1.5,0,0,0,2.116,0l2.52-2.52a1.5,1.5,0,0,0,0-2.116l-5.884-5.884A4.661,4.661,0,0,0,810.7,538.1Z"
          transform="translate(-787.865 -538.097)"
          fill={isSelected ? SELECTED_TSHIRT_FORE_COLOR : TSHIRT_FORE_COLOR}
        />
        <Text
          fill={TSHIRT_FORE_COLOR}
          transform="translate(16 38)"
          fontSize="12"
          fontFamily="TitilliumWeb-Bold, Titillium Web"
          fontWeight="700"
          letterSpacing="0.01em"
          textAnchor="middle">
          <TSpan x="0" y="0">
            {text}
          </TSpan>
        </Text>
      </G>
    </Svg>
  </TouchableOpacity>
);

Position.propTypes = {
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  text: PropTypes.string,
  style: ViewPropTypes.style,
};

Position.defaultProps = {
  onSelect: () => {},
  isSelected: false,
  text: '',
  style: null,
};

export default Position;
