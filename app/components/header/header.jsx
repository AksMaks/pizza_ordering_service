import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

//(leftText, centerText, rightText)
const Header = (props) => {
  return (
    <View style={styles.Header}>
      <TouchableWithoutFeedback onPress={() => props.leftActive()}><Text style={styles.Text}>{props.leftText}</Text></TouchableWithoutFeedback>
      <Text style={styles.Text}>{props.centerText}</Text>
      <Text style={styles.Text}>{props.rightText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 20
  },
  Text: {
    fontSize: 15,
    color: "#BC3B28"
  }
});

export default Header
