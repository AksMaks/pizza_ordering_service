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

import profile from './store/profile';

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
    await AsyncStorage.setItem("user", "MAKS")
    console.log(await AsyncStorage.getItem("user"))
    /*
    await axios.get("http://84.201.187.93:5000/api/Product")
    .then(Response => {
      console.log({Response: Response.data})
      
    })
    */
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
