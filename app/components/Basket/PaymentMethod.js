import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { observer } from "mobx-react-lite"
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/header';
import CheckMark from '../../assets/Basket/checkMark'

import basket from '../../store/basket';

import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

const PaymentMethod = observer(() => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });

  return (
    <View style={styles.container}>
      <Header leftText={"< Назад"} centerText={"Способ оплаты"} rightText={""} leftActive={() => navigation.goBack()}/>
      <TouchableWithoutFeedback 
        onPress={() => {
          basket.setPaymentMethod("Apple Pay")
          navigation.goBack()
        }}>
        <View style={styles.Item}>
          <Text style={styles.Text}>Apple Pay</Text>
          <View style={{marginRight: 5}}>
            {basket.paymentMethod == "Apple Pay" && <CheckMark color={"#BC3B28"}/>}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback 
        onPress={() => {
          basket.setPaymentMethod("Наличными курьеру")
          navigation.goBack()
        }}>
        <View style={styles.Item}>
          <Text style={styles.Text}>Наличными курьеру</Text>
          <View style={{marginRight: 5}}>
            {basket.paymentMethod == "Наличными курьеру" && <CheckMark color={"#BC3B28"}/>}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback 
        onPress={() => {
          basket.setPaymentMethod("Картой курьеру")
          navigation.goBack()
        }}>
        <View style={styles.Item}>
          <Text style={styles.Text}>Картой курьеру</Text>
          <View style={{marginRight: 5}}>
            {basket.paymentMethod == "Картой курьеру" && <CheckMark color={"#BC3B28"}/>}
          </View>
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
});

export default PaymentMethod
