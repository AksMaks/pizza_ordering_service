import React, {useEffect} from 'react';
import { StyleSheet, Text, Image, View , TouchableWithoutFeedback} from 'react-native';
import { observer } from "mobx-react-lite"
import { useNavigation} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

import Arrow from '../../assets/Profile/Arrow'

import Header from '../header/header';
import profile from '../../store/profile';

const Profile = observer(({ navigation: { navigate} }) => {
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
      <View style={{flexDirection: "row", justifyContent: "space-between", heightL: 50}}>
        <Text style={styles.Name}>{profile.data.Name}</Text>
        <TouchableWithoutFeedback onPress={() => navigate('Settings')}>
          <Image
              style={styles.ImageSettings}
              source={require('../../assets/Profile/Settings.png')}
            />
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={() => navigate('Points')}>
        <View style={styles.Item}>
          <Text style={styles.Text}>DataCoin</Text>
          <View style={{marginRight: 5}}><Arrow/></View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigate('HistoryOrders')}>
      <View style={styles.Item}>
          <Text style={styles.Text}>История заказов</Text>
          <View style={{marginRight: 5}}><Arrow/></View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigate('Addresses')}>
      <View style={[styles.Item, {borderBottomWidth: 0}]}>
          <Text style={styles.Text}>Адреса доставки</Text>
          <View style={{marginRight: 5}}><Arrow/></View>
        </View>
      </TouchableWithoutFeedback>
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
  Arrow: {
    width: 10,
    height: 10,
    borderColor: "#959595",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    transform: [{ rotateZ: "315deg"}],
  }
});
export default Profile
