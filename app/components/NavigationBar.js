import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import {useRoute} from '@react-navigation/native';

export default function NavigationBar({ navigation: { navigate} }) {
  const route = useRoute();

  return (
    <View style={styles.Bar}>
      <TouchableWithoutFeedback onPress={() => navigate('Menu')}>
        <View style={[styles.Link, {opacity: route.name=='Menu'? 1: 0.5}]}> 
          <Image
            style={styles.Image}
            source={require('../assets/NavBar/Home.png')}
          />
          <Text>Меню</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigate('Profile')}>
        <View style={[styles.Link, {opacity: route.name=='Profile'? 1: 0.5}]}> 
          <Image
            style={styles.Image}
            source={require('../assets/NavBar/Profile.png')}
          />
          <Text>Профиль</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigate('Contacts')}>
        <View style={[styles.Link, {opacity: route.name=='Contacts'? 1: 0.5}]}> 
          <Image
            style={styles.Image}
            source={require('../assets/NavBar/Contacts.png')}
          />
          <Text>Контакты</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigate('Basket')}>
        <View style={[styles.Link, {opacity: route.name=='Basket'? 1: 0.5}]}> 
          <Image
            style={styles.Image}
            source={require('../assets/NavBar/Basket.png')}
          />
          <Text>Корзина</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  Bar: {
    flexDirection: "row",
    width: '100%',
    height: 75
  },
  Link: {
    flex: 1,
    marginTop: 5,
    alignItems: "center"
  },
  Image: {
    width: 30,
    height: 30
  }
});
