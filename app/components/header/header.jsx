import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { v4 as uuidv4 } from 'uuid';

import {
  useFonts,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';

//(leftText, centerText, rightText)
const Header = (props) => {
  let [fontsLoaded] = useFonts({
    Raleway_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.Header}>
        <TouchableWithoutFeedback onPress={() => !!props.leftActive? props.leftActive(): {}}>
          <Text style={[styles.Text, styles.TextLeft]} numberOfLines={1}>{props.leftText}</Text>
        </TouchableWithoutFeedback>
        <Text style={[styles.Text, styles.TextCenter]} numberOfLines={1}>{props.centerText}</Text>
        <TouchableWithoutFeedback onPress={() => !!props.rightActive? props.rightActive(): {}}>
          <Text style={[styles.Text, styles.TextRight]} numberOfLines={1}>{props.rightText}</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 20,
    justifyContent: "space-between",
    backgroundColor: "#ffffff"
  },
  Text: {
    fontSize: 15,
    color: "#BC3B28",
    fontFamily: "Raleway_700Bold"
  },
  TextLeft: {

  },
  TextCenter: {
    position: "absolute",
    width: 150,
    left: (Dimensions.get('window').width-150)/2
  },
  TextRight: {
    
  }
});

export default Header
