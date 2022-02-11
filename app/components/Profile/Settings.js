import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Alert, TouchableWithoutFeedback } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { observer } from "mobx-react-lite"
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

import Header from '../header/header';

import profile from '../../store/profile';

const Settings = observer(() => {
  const navigation = useNavigation();
  const [Name, setName] = useState(profile.data.Name)
  const [Phone, setPhone] = useState(profile.data.Phone)

  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });

  const saveChange = () => {
    profile.ChangeNamePhone(Name, Phone)
    navigation.goBack()
  }
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
      <Header leftText={"< Сохранить"} centerText={""} rightText={"300 Б"} leftActive={() => saveChange()}/>
      <Text style={[styles.Title, {fontFamily: 'Raleway_600SemiBold'}]}>Настройки</Text>
      <View style={styles.Item}>
        <Text style={styles.ItemText}>Имя</Text>
        <TextInput
          style={styles.Iteminput}
          onChangeText={setName}
          value={Name}
          maxLength={100}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => {profile.Exit(), navigation.navigate('Menu')}}>
        <View style={styles.RegButton}>
          <Text style={styles.RegButtonText}>{"Выйти"}</Text>
        </View>
      </TouchableWithoutFeedback>
      {false &&
      <View style={styles.Item}>
        <Text style={styles.ItemText}>День рождения</Text>
        <TextInput
          style={styles.Iteminput}
          onChangeText={() => Alert.alert("Уведовление", "В день рождения мы дарим скидку 10%. К сожажению, его нельзя изменить.")}
          value={profile.data.Birthday}
        />
      </View>
      }
      {false &&
      <View style={styles.Item}>
        <Text style={styles.ItemText}>Телефон</Text>
        <TextInput
          style={styles.Iteminput}
          onChangeText={setPhone}
          value={Phone}
          maxLength={12}
          keyboardType='numeric'
        />
      </View>
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
  Title: {
    fontSize: 24,
    color: "#000000",
    marginTop: 20,
    marginBottom: 5
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
  },
  RegButton: {
    width: "50%",
    height: 40,
    backgroundColor: "#D84C38",
    borderRadius: 8,
    marginVertical: 20
  },
  RegButtonText: {
    textAlign: "center",
    lineHeight: 20,
    color: "#FFFFFF",
    marginVertical: 10,
    fontSize: 12,
    fontFamily: "Raleway_600SemiBold"
  },
});
export default Settings