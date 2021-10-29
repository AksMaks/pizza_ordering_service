import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import { observer } from "mobx-react-lite"
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

import basket from '../../store/basket';

const Product = observer((props) => {
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });

  //Считает суммарную цену
  const getPrice = () => {
    let price = props.Product.Option.Price
    props.Product.Option.Additives.forEach(el => {
      price += el.Price*el.Number
    })
    return price
  }
  //Получить все добавки
  const getAdditives = () => {
    let additives = ""
    props.Product.Option.Additives.forEach(el => {
      if(el.Number > 0){
        additives += "\n" + el.Number + " x " + el.Name + " " + el.Weight + "г, " 
      }
    })
    if(additives != ""){
      return "Добавлено: " + additives.slice(0, -2)
    }else{
      return additives
    }
    
  }
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.Container}> 
      <Image
        style={styles.Image}
        source={{uri: props.Product.Image}}
      />
      <View style={styles.Text}>
        <Text style={styles.Name}>{props.Product.Name}</Text>
        <Text style={styles.Description}>{props.Product.Option.Name + " " + props.Product.Option.Size + "см"}</Text>
        <Text style={styles.Description}>{getAdditives()}</Text>
        <View style={styles.Panel}>
          <View><Text style={styles.PriceText}>{getPrice() + "р"}</Text></View>
          <View style={styles.ChangeNumberPanel}>
            <TouchableWithoutFeedback onPress={() => props.changeNumber(-1)}>
              <Text style={{color: "#CACACA", fontSize: 25, lineHeight: 30, width: 26, textAlign: "center"}}>-</Text>
            </TouchableWithoutFeedback>
            <Text style={{color: "#CACACA", fontSize: 14, lineHeight: 30, width: 26, textAlign: "center"}}>{props.Product.Number}</Text>
            <TouchableWithoutFeedback onPress={() => props.changeNumber(1)}>
              <Text style={{color: "#CACACA", fontSize: 25, lineHeight: 30, width: 26, textAlign: "center"}}>+</Text>
            </TouchableWithoutFeedback>
          </View>  
        </View>
      </View>
    </View>
  )
  }
})

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
    marginLeft: 16,
    width: "50%",
  },
  Name: {
    width: 170,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Raleway_600SemiBold"
  },
  Description: {
    width: 170,
    fontSize: 12,
    color: "#808080",
    marginTop: 5
  },
  Panel: {
    height: 30,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  PriceText: {
    width: "100%",
    height: "100%",
    color: "#BC3B28",
    fontSize: 14,
    lineHeight: 25
  },
  ChangeNumberPanel: {
    height: 30,
    width: 78,
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#CACACA",
  }
});

export default Product
