import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationBar from './NavigationBar';
import Menu from './Menu/Menu';
import Profile from './Profile/Profile';
import Contacts from './Contacts/Contacts';
import Basket from './Basket/Basket';

const Stack = createStackNavigator();

const MenuScreen = (props) => {
  return (
    <View style={styles.container}>
      <Menu/>
      <NavigationBar {...props}/>
    </View>
  )
}
const ProfileScreen = (props) => {
  return (
    <View style={styles.container}>
      <Profile/>
      <NavigationBar {...props}/>
    </View>
  )
}
const ContactsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Contacts/>
      <NavigationBar {...props}/>
    </View>
  )
}
const BasketScreen = (props) => {
  return (
    <View style={styles.container}>
      <Basket/>
      <NavigationBar {...props}/>
    </View>
  )
}

const configOptions = {
  headerShown: false
}

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
    backgroundColor: "#ffffff"
  }
});
