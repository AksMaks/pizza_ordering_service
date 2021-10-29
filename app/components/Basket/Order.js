import React, {useEffect} from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { observer } from "mobx-react-lite"
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/header';
import Product from './Product';
import Arrow from '../../assets/Profile/Arrow'

import basket from '../../store/basket';
import profile from '../../store/profile';

import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

const Order = observer(() => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });

  return (
    <View style={styles.container}>
      <Header leftText={"< Назад"} centerText={"Доставка"} rightText={""} leftActive={() => navigation.goBack()}/>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('BasketAddresses')}>
        <View style={styles.Item}>
          <Text style={styles.Text}>{basket.currentAddress? basket.currentAddress.Address.Street + ", " + basket.currentAddress.Address.House: ""}</Text>
          <View style={{marginRight: 5}}><Arrow/></View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('PaymentMethod')}>
      <View style={styles.Item}>
          <Text style={styles.Text}>{basket.paymentMethod}</Text>
          <View style={{marginRight: 5}}><Arrow/></View>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback 
        onPress={() => {
          navigation.navigate("SuccessfulOrder")
          ////////Тут функция для выполения заказа
        }}>
        <View style={styles.OrderButton}>
          <Text style={styles.OrderButtonText}>{"Заказать"}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff"
  },
  Item: {
    width: "100%",
    height: 64,
    borderBottomWidth: 1,
    borderColor: "#E7E7E7",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  Text: {
    color: "#202020",
    fontSize: 18,
    lineHeight: 64
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

export default Order
