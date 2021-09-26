import React, {useState} from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AppLoading from 'expo-app-loading';

import Main from './components/Main'
import * as axios from 'axios';

export default function App() {
  const [load, setLoad] = useState(true)
  
  const _Async = async () => {
    setData(111)
    /*
    await axios.get("http://84.201.187.93:5000/api/Product")
    .then(Response => {
      console.log({Response: Response.data})
      
    })
    */
  }

  if(load){
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <Main style={styles.app}/>
      </SafeAreaView>
    );
  }else{
    return (
      <AppLoading 
        startAsync={_Async}
        onFinish={() => setLoad(true)}
        onError={console.warn} 
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "5%",
    marginRight: "5%",
    width: "90%",
    ...Platform.select({
      ios: {
      },
      android: {
      },
    }),
  }
});
