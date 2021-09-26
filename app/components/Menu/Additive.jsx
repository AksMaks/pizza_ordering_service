import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

const Additive = (props) => {
  if(props.Number == 0){
    return <TouchableWithoutFeedback onPress={() => props.changeNumAdditive(1)}>
      <View style={styles.Container}> 
        <Image
          style={styles.Image}
          source={{uri: props.Image}}
        />
        <Text style={styles.Name}>{props.Name}</Text>
      </View>
    </TouchableWithoutFeedback>
  }else{
    return <View style={styles.Container}> 
      <Text style={styles.Number}>{props.Number}</Text>
      <TouchableWithoutFeedback onPress={() => props.changeNumAdditive(-1)}>
        <Text style={[styles.ButtonChange, styles.Decrease]}>-</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => props.changeNumAdditive(1)}>
        <Text style={[styles.ButtonChange, styles.Increase]}>+</Text>
      </TouchableWithoutFeedback>
      <Text style={styles.Name}>{props.Name}</Text>
    </View>
  }
  
}

const styles = StyleSheet.create({
  Container:{
    width: 80,
    height: 70,
    alignItems: "center",
    marginHorizontal: 2.5,
    marginTop: 10
  },
  Image:{
    width: 50,
    height: 50,
  },
  Name: {
  },
  Number: {
    width: 50,
    height: 50,
    lineHeight: 50,
    fontSize: 20,
    color: "#3D3D3D",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#BC3B28"
  },
  ButtonChange: {
    width: 30,
    height: 30,
    lineHeight: 30,
    textAlign: "center",
    fontSize: 30,
    color: "#3D3D3D",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#BC3B28",
    backgroundColor: "#ffffff",
    position: "absolute",
    top: 10
  },
  Decrease: {
    left: 0,
  },
  Increase: {
    right: 0
  }
});

export default Additive
