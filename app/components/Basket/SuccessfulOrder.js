import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { observer } from "mobx-react-lite"
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/header';
import Basket from '../../assets/Basket/Basket'

import basket from '../../store/basket';

import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

const SuccessfulOrder = observer(() => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });

  return (
    <View style={styles.container}>
      <Header leftText={"< Назад"} centerText={"Доставка"} rightText={""} leftActive={() => navigation.goBack()}/>
      <View style={styles.Image}><Basket/></View>
      <View style={{marginTop: 80}}><Text style={styles.Text}>Спасибо за заказ. Менеджер позвонит Вам в течение 10 минут</Text></View>
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff"
  },
  Image: {
    marginTop: 130
  },
  Text: {
    color: "#202020",
    fontSize: 18,
    textAlign: "center"
  }
});

export default SuccessfulOrder
