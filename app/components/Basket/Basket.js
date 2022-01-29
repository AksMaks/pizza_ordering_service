import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { observer } from "mobx-react-lite"
import AppLoading from 'expo-app-loading';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/header';
import Product from './Product';
import Arrow from '../../assets/Profile/Arrow'

import profile from '../../store/profile';
import basket from '../../store/basket';
import menu from '../../store/menu';

import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

const Basket = observer(() => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });

  //Считает суммарную цену
  const getPrice = () => {
    let sum = 0
    basket.list.forEach(el => {
      let price = el.Option.Price
      el.Option.Additives.forEach(el => {
        price += el.Price*el.Number
      })
      sum += price*el.Number
    })
    return sum
  }
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
      <Header leftText={"PizzData"} centerText={""} rightText={profile.data.Points + " Б"}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        {basket.list.map((el, ind) => {
          return (
            <Product
              key={uuidv4()}
              Product={el}
              changeNumber={(change) => {
                basket.changeNumber(ind, change)
              }}
            />
            )
        })}
        <Text style={{marginVertical: 20, fontSize: 15, fontWeight: "bold", fontFamily: "Raleway_600SemiBold"}}>{"Рекомендуем"}</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {menu.Products.map(el => {
            return (
              <TouchableWithoutFeedback key={uuidv4()} onPress={() => navigation.navigate('Product', {Product: el})}>
                <View style={{flexDirection: "row", marginHorizontal: 10}}>
                  <Image
                    style={styles.Image}
                    source={{uri: el.Image}}
                  />
                  <View>
                    <Text style={styles.Name}>{el.Name}</Text>
                    <View style={styles.PriceConteiner}>
                      <Text style={styles.Price}>{"от " + Math.min(...(el.Options.map(el => el.Price))) + "р"}</Text>
                      <View style={{marginLeft: 5}}><Arrow color={"#BC3B28"}/></View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              )
          })}
        </ScrollView>
      </ScrollView>
      {basket.list.length > 0 && <TouchableWithoutFeedback 
        onPress={() => {
          if(!profile.User){
            navigation.navigate("Profile", { screen: 'Registration', params: { Text: "Для оформления заказа нужен ваш телефон" }})
          }else{
            navigation.navigate('Order')
          }
        }}>
        <View style={styles.OrderButton}>
          <Text style={styles.OrderButtonText}>{"Оформить заказ на " + getPrice()}</Text>
        </View>
      </TouchableWithoutFeedback>
      }
    </View>
  );
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff"
  },
  Image: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  Name: {
    fontSize: 12,
    color: "#202020"
  },
  PriceConteiner: {
    width: 75,
    height: 25,
    borderColor: "#BC3B28",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "center"
  },
  Price: {
    color: "#BC3B28",
  },
  OrderButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#D84C38",
    borderRadius: 8,
    marginVertical: 20
  },
  OrderButtonText: {
    textAlign: "center",
    lineHeight: 22,
    color: "#FFFFFF",
    marginVertical: 14,
    fontSize: 15,
    fontFamily: "Raleway_600SemiBold"
  }
});

export default Basket
