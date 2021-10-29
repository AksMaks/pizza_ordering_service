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

const checkMark  = (props) => {
  return (
    <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' },]}>
      <Svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M12.8182 1L4.54545 11L1 7.25" stroke={props.color? props.color: "#959595"} stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    </View>
  );
}
export default checkMark