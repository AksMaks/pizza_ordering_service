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
      <Svg width="106" height="114" viewBox="0 0 106 114" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M69.6666 59.25L46.3332 88.4167L36.3333 76.7292" stroke="#BC3B28" strokeWidth="5" strokeLinecap="round" stroke-linejoin="round"/>
        <Path d="M28 36.3333V28C28 21.3696 30.6339 15.0107 35.3223 10.3223C40.0107 5.63392 46.3696 3 53 3V3C59.6304 3 65.9893 5.63392 70.6777 10.3223C75.3661 15.0107 78 21.3696 78 28V36.3333M7.16667 36.3333C6.0616 36.3333 5.00179 36.7723 4.22039 37.5537C3.43899 38.3351 3 39.3949 3 40.5V96.75C3 104.625 9.70833 111.333 17.5833 111.333H88.4167C96.2917 111.333 103 104.951 103 97.0755V40.5C103 39.3949 102.561 38.3351 101.78 37.5537C100.998 36.7723 99.9384 36.3333 98.8333 36.3333H7.16667Z" stroke="#BC3B28" strokeWidth="5" stroke-linecap="round" strokeLinejoin="round"/>
      </Svg>
    </View>
  );
}
export default checkMark