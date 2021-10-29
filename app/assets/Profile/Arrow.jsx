import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import React from 'react';
import { View, StyleSheet } from 'react-native';

const Arrow  = (props) => {
  return (
    <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' },]}>
      <Svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M1 11L6 6L1 1" stroke={props.color? props.color: "#959595"} stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    </View>
  );
}
export default Arrow