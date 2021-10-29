import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, Image, View , TouchableWithoutFeedback, Alert, TextInput, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid';
import { observer } from "mobx-react-lite"
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

import CheckMark from '../../assets/Basket/checkMark'
import Header from '../header/header';

import profile from '../../store/profile';
import basket from '../../store/basket';

const Address = (props) => {
  const navigation = useNavigation();
  const [Street, setStreet] = useState("")
  const [House, setHouse] = useState("")
  const [Apartment, setApartment] = useState("")
  const [Entrance, setEntrance] = useState("")
  const [Floor, setFloor] = useState("")
  const [Comment, setComment] = useState("")

  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });

  return (
    <View style={[styles.container, {paddingHorizontal: 20}]}>
      <Header
        leftText={"< Назад"}
        centerText={"Адреса доставки"}
        rightText={"Готово"} 
        leftActive={() => {
          navigation.navigate("ListAddresses")
        }}
        rightActive={() => {
          basket.setAddress({
            Address: {Street, House, Apartment, Entrance, Floor},
            Comment: Comment
          })
          profile.addAddress({Street, House, Apartment, Entrance, Floor}, Comment)
          navigation.navigate("Order")
        }}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Item}>
          <Text style={styles.ItemText}>Улица</Text>
          <TextInput
            style={styles.Iteminput}
            onChangeText={setStreet}
            value={Street}
            maxLength={50}
          />
        </View>
        <View style={styles.Item}>
          <Text style={styles.ItemText}>Дом</Text>
          <TextInput
            style={styles.Iteminput}
            onChangeText={setHouse}
            value={House}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.Item}>
          <Text style={styles.ItemText}>Квартира</Text>
          <TextInput
            style={styles.Iteminput}
            onChangeText={setApartment}
            value={Apartment}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.Item}>
          <Text style={styles.ItemText}>Подьезд</Text>
          <TextInput
            style={styles.Iteminput}
            onChangeText={setEntrance}
            value={Entrance}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.Item}>
          <Text style={styles.ItemText}>Этаж</Text>
          <TextInput
            style={styles.Iteminput}
            onChangeText={setFloor}
            value={Floor}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.Item}>
          <Text style={styles.ItemText}>Название</Text>
          <TextInput
            style={styles.Iteminput}
            onChangeText={setComment}
            value={Comment}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const ListAddresses = observer((props) => {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={[styles.container, {paddingHorizontal: 20}]}>
      <Header leftText={"< Назад"} centerText={"Адреса доставки"} rightText={""} leftActive={navigation.goBack}/>
      <ScrollView showsVerticalScrollIndicator={false}>
      {profile.Addresses.map(el => {
        return(
          <TouchableWithoutFeedback 
            key={uuidv4()}
            onPress={() => {
              basket.setAddress(el)
              navigation.goBack()
            }}>
            <View style={styles.ItemList} key={uuidv4()}>
                <Text style={styles.Text} multiline={true}>{el.Address.Street + ", " + el.Address.House}</Text>
                <View style={{marginRight: 5}}>{JSON.stringify(basket.currentAddress) == JSON.stringify(el) && <CheckMark color={"#BC3B28"}/>}</View>
              </View>
          </TouchableWithoutFeedback>
        )
      })}
      <TouchableWithoutFeedback 
        onPress={() => {
          navigation.navigate("Address")
        }}>
        <View style={{marginVertical: 40, width: "100%"}}>
          <Text 
            style={{
              textAlign: "center", 
              lineHeight: 22, 
              fontSize: 15,
              fontFamily: "Raleway_600SemiBold",
              color: "#BC3B28"}}>{"Добавить адрес"}</Text>
        </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
  }
})

const AddressesStack = createStackNavigator();

const Addresses = () => {
  const [address, setAddress] = useState(null)
  return (
    <View style={styles.container}>
      <AddressesStack.Navigator initialRouteName="ListAddresses">
        <AddressesStack.Screen 
          name="ListAddresses" 
          component={ListAddresses} 
          options={{headerShown: false}}/>
        <AddressesStack.Screen 
          name="Address" 
          component={Address} 
          options={{headerShown: false}}/>
      </AddressesStack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  Name: {
    fontFamily: "Raleway_600SemiBold",
    color: "#000000",
    fontSize: 24,
  },
  ImageSettings: {
    width: 20,
    height: 20,
    marginTop: 10
  },
  ItemList: {
    width: "100%",
    height: 64,
    borderBottomWidth: 1,
    borderColor: "#E7E7E7",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Text: {
    color: "#202020",
    fontSize: 18,
    lineHeight: 64,
  },
  Item: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: "#E7E7E7",
  },
  ItemText: {
    color: "#959595",
    fontSize: 12,
  },
  Iteminput: {
    color: "#202020",
    fontSize: 18,
  }
});

export default Addresses  
