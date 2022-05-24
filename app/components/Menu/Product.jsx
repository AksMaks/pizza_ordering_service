import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import AppLoading from 'expo-app-loading';

import Arrow from '../../assets/Profile/Arrow'

import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

const Product = (props) => {
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => props.SelectProduct()}>
      <View style={styles.Container}> 
        <Image
          style={styles.Image}
          source={{uri: props.Image}}
        />
        <View style={styles.Text}>
          <Text style={styles.Name}>{props.Name}</Text>
          {props.Description && <Text style={styles.Description}>{props.Description}</Text>}
          <View style={styles.Price}>
            <Text style={styles.PriceText}>{"от " + props.Price + "р "}<Arrow color={"#BC3B28"}/></Text>
          </View>
        </View>
      </View>  
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  Container:{
    paddingVertical: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E7E7E7",
  },
  Image:{
    width: 140,
    height: 140,
    borderRadius: 5
  },
  Text: {
    marginLeft: 10,
  },
  Name: {
    width: 170,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Raleway_600SemiBold"
  },
  Description: {
    width: 170,
    maxHeight: 55,
    fontSize: 12,
    lineHeight: 18,
    color: "#808080",
    marginTop: 5,
    borderWidth: 0,
    borderColor: "#BC3B28",
  },
  Price: {
    height: 32,
    marginTop: 10,
    alignItems: "flex-start",
  },
  PriceText: {
    textAlignVertical: "center",
    height: "100%",
    color: "#BC3B28",
    fontSize: 14,
    lineHeight: 16,
    paddingLeft: 12,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#BC3B28",
    borderRadius: 7,
  }
});

export default Product
