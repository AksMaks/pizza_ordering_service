import React, {useState} from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, SafeAreaView, AsyncStorage } from 'react-native';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Raleway_400Regular,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

import { setCustomText } from 'react-native-global-props';

import Main from './components/Main'
import * as axios from 'axios';

import basket from './store/basket';
import contacts from './store/contacts';
import levels from './store/levels';
import menu from './store/menu';
import profile from './store/profile';
import stories from './store/stories';

export default function App() {
  const [load, setLoad] = useState(true)
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold
  });

  const customTextProps = { 
    style: { 
      fontFamily: "Raleway_400Regular",
      fontVariant: ["lining-nums"]
    }
  }
  setCustomText(customTextProps);
  
  const _Async = async () => {
    await AsyncStorage.setItem("user", "MAKS1")
    console.log(await AsyncStorage.getItem("user"))

    await AsyncStorage.setItem("IdUser", "39")
    let IdUser = await AsyncStorage.getItem("IdUser")
    
    console.log(IdUser)
    profile.SetAddresses(IdUser)
    profile.GetOne(IdUser).then((res2) => {
      profile.setData(res2.Data.Users)
      profile.seUser(true)
    })

    contacts.GetData()
    levels.GetData()
    stories.GetData()
    menu.GetData()
  }

  if(load && fontsLoaded){
    return (
      <View style={styles.container}>
        <StatusBar/>
        <Main/>
      </View>
    );
  }else{
    return (
      <AppLoading 
        startAsync={_Async}
        onFinish={() => {
          setLoad(true);
        }}
        onError={console.warn} 
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 40,
      },
      android: {
      },
    }),
  }
});
