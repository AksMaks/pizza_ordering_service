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
            <Text style={styles.PriceText}>{"от " + props.Price + "р"}</Text>
            <View style={{marginLeft: 5}}><Arrow color={"#BC3B28"}/></View>
          </View>
        </View>
      </View>  
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  Container:{
    marginVertical: 20,
    flexDirection: "row",
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
    maxHeight: 72,
    fontSize: 12,
    color: "#808080",
    marginTop: 5
  },
  Price: {
    width: 73,
    height: 30,
    borderWidth: 1,
    borderColor: "#BC3B28",
    borderRadius: 7,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 10
  },
  PriceText: {
    width: "100%",
    height: "100%",
    color: "#BC3B28",
    fontSize: 14,
    lineHeight: 25,
    paddingLeft: 5
  }
});

export default Product
