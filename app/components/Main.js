import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationBar from './NavigationBar';


import Menu from './Menu/Menu';
import Product from './Menu/ProductModal';
const MenuStack = createStackNavigator();
const MenuScreen = (props) => {
  const [product, setProduct] = useState(null) 

  return (
    <View style={styles.container}>
      <ProfileStack.Navigator initialRouteName="Menu"> 
        <ProfileStack.Screen name="Menu" component={Menu} options={configOptions} selectProduct={setProduct}/>
        <ProfileStack.Screen name="Product" component={Product} options={configOptions}/>
      </ProfileStack.Navigator>
      <NavigationBar {...props}/>
    </View>
  )
}

import Profile from './Profile/Profile';
import Settings from './Profile/Settings';
import Points from './Profile/Points';
import Addresses from './Profile/Addresses';
import HistoryOrders from './Profile/HistoryOrders';
import Registration from './Profile/Registration';

const ProfileStack = createStackNavigator();
const ProfileScreen = (props) => {
  return (
    <View style={styles.container}>
      <ProfileStack.Navigator initialRouteName="Profile">
        <ProfileStack.Screen name="Profile" component={Profile} options={configOptions}/>
        <ProfileStack.Screen name="Settings" component={Settings} options={configOptions}/>
        <ProfileStack.Screen name="Points" component={Points} options={configOptions}/>
        <ProfileStack.Screen name="Addresses" component={Addresses} options={configOptions}/>
        <ProfileStack.Screen name="HistoryOrders" component={HistoryOrders} options={configOptions}/>
        <ProfileStack.Screen name="Registration" component={Registration} options={configOptions}/>
      </ProfileStack.Navigator>
      <NavigationBar {...props}/>
    </View>
  )
}

import Contacts from './Contacts/Contacts';
const ContactsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Contacts/>
      <NavigationBar {...props}/>
    </View>
  )
}

import Basket from './Basket/Basket';
import BasketProduct from './Menu/ProductModal';
import Order from './Basket/Order';
import BasketAddresses from './Basket/Addresses';
import PaymentMethod from './Basket/PaymentMethod';
import SuccessfulOrder from './Basket/SuccessfulOrder';
const BasketStack = createStackNavigator();
const BasketScreen = (props) => {
  return (
    <View style={styles.container}>
      <BasketStack.Navigator initialRouteName="Basket">
        <BasketStack.Screen name="Basket" component={Basket} options={configOptions}/>
        <BasketStack.Screen name="Product" component={BasketProduct} options={configOptions}/>
        <BasketStack.Screen name="Order" component={Order} options={configOptions}/>
        <BasketStack.Screen name="BasketAddresses" component={BasketAddresses} options={configOptions}/>
        <BasketStack.Screen name="PaymentMethod" component={PaymentMethod} options={configOptions}/>
        <BasketStack.Screen name="SuccessfulOrder" component={SuccessfulOrder} options={configOptions}/>
      </BasketStack.Navigator>
      <NavigationBar {...props}/>
    </View>
  )
}

const configOptions = {
  headerShown: false,
  
}
/*

*/
const Stack = createStackNavigator();
export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuScreen} options={configOptions}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={configOptions}/>
        <Stack.Screen name="Contacts" component={ContactsScreen} options={configOptions}/>
        <Stack.Screen name="Basket" component={BasketScreen} options={configOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff"
  }
});
