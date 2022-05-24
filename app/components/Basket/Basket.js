import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { observer } from "mobx-react-lite"
import AppLoading from 'expo-app-loading';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/header';
import Product from './Product';
import Arrow from '../../assets/Profile/Arrow'
import BasketEmpty from '../../assets/Basket/BasketEmpty'

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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
      <Header leftText={"PizzData"} centerText={""} rightText={profile.data.Points + " D"}/>
      {basket.list.length == 0 && <View>
          <View style={{height: 146}}><BasketEmpty/></View>
          <Text style={styles.BasketIsEmptyText1}>В корзине пусто</Text>
          <Text style={styles.BasketIsEmptyText2}>Перейдите в меню и выберите понравившийся товар</Text>
        </View>
      }
      {basket.list.length > 0 && <ScrollView showsVerticalScrollIndicator={false}>
        <View>
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
                      <View style={styles.Price}>
                        <Text style={styles.PriceText}>{"от " + Math.min(...(el.Options.map(el => el.Price))) + "р "}<Arrow color={"#BC3B28"}/></Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                )
            })}
          </ScrollView>
        </View>
        <TouchableWithoutFeedback 
          onPress={() => {
            if(!profile.User){
              navigation.navigate("Profile", { screen: 'Registration', params: { Text: "Для оформления заказа нужен ваш телефон" }})
            }else{
              navigation.navigate('Order')
            }
          }}>
          <View style={styles.OrderButton}>
            <Text style={styles.OrderButtonText}>{"Оформить заказ на " + basket.getPrice()}</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      }
    </View>
  );
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
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
  },
  BasketIsEmptyText1: {
    textAlign: "center",
    color: "#202020",
    lineHeight: 22,
    marginVertical: 14,
    fontSize: 18,
    fontFamily: "Raleway_600SemiBold"
  },
  BasketIsEmptyText2: {
    textAlign: "center",
    color: "#202020",
    fontSize: 18,
  }
});

export default Basket
