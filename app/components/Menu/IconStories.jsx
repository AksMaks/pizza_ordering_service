import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

const IconStories = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.openModal()}>
    <View style={styles.Container}> 
      <Image
        style={{...styles.Image, borderColor: props.Active? "rgba(188, 59, 40, 1)": "rgba(231, 231, 231, 1)"}} // props.Active => gradient
        source={props.Image}
      />
      <Text style={styles.Text}>{props.Text}</Text>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  Container:{
    marginRight: 15,
  },
  Image:{
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "rgba(231, 231, 231, 1)",
    borderRadius: 80,
  },
  Text: {
    color: "rgba(89, 89, 89, 1)",
    fontSize: 15,
    textAlign: "center"
  }
});

export default IconStories
