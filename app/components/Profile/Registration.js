import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, Image, View , TouchableWithoutFeedback, Alert, TextInput, ScrollView} from 'react-native';
import AppLoading from 'expo-app-loading';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid';
import { observer } from "mobx-react-lite"
import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

import Arrow from '../../assets/Profile/Arrow'

import Header from '../header/header';

import profile from '../../store/profile';

const CodeInput = observer((props) => {
  const navigation = useNavigation();
  const [code, setCode] = useState()
  const [disabled, setDisabled] = useState(true)
  const [time, setTime] = useState(60)
  
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });

  useEffect(() => {
    if(time != 0){
      setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }else{
      setDisabled(false)
    }
  }, [time])

  const repeat = () =>{
    setTime(60)
    setDisabled(true)
    //navigation.navigate("Profile")
  }
  
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={[styles.container, {paddingHorizontal: 20}]}>
        <Header leftText={"< Назад"} centerText={""} rightText={""} leftActive={navigation.goBack}/>
        <View style={{alignItems: "center"}}>
          <Text style={{width: "80%", textAlign: "center", fontFamily: "Raleway_600SemiBold", fontSize: 18, marginVertical: 10}}>Теперь введите код</Text>
          <Text style={{width: "80%", textAlign: "center", color: "#202020", fontSize: 15}}>Код отправлен на номер</Text>
          <Text style={{width: "80%", textAlign: "center", color: "#202020", fontSize: 15}}>{props.route.params.Phone}</Text>
        </View>
        <View style={styles.Item}>
          <Text style={styles.ItemText}>Код</Text>
          <TextInput
            style={styles.Iteminput}
            onChangeText={setCode}
            value={code}
            maxLength={50}
            keyboardType={"numeric"}
          />
        </View>
        <View style={{position: "absolute", bottom: 0, left: 20, width: "100%"}}>
          <Text style={{marginHorizontal: 27, textAlign: "center", color: "#959595", fontSize: 12}}>
            {time != 0? "Если код не пришел, получить новый можно через "+time+" сек": "Можно получить новый код"}
          </Text>
          <TouchableWithoutFeedback disabled={disabled} onPress={() => repeat()}>
            <View style={[styles.OrderButton, {backgroundColor: !disabled? "#D84C38": "#E7E7E7"}]}>
              <Text style={[styles.OrderButtonText, {color: !disabled? "#FFFFFF": "#959595"}]}>{"Получить новый код"}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
})

const PhoneInput = observer((props) => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState()

  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });

  const sendNumber = () =>{
    navigation.navigate("CodeInput", {Phone: phone})
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={[styles.container, {paddingHorizontal: 20}]}>
        <Header leftText={"< Назад"} centerText={""} rightText={""} leftActive={navigation.goBack}/>
        <View style={{justifyContent: "center", flexDirection: "row"}}>
          <Text style={{width: "80%", textAlign: "center", fontFamily: "Raleway_600SemiBold", fontSize: 18}}>{props.route.params.Text}</Text>
        </View>
        <View style={styles.Item}>
          <Text style={styles.ItemText}>Номер</Text>
          <TextInput
            style={styles.Iteminput}
            onChangeText={setPhone}
            value={phone}
            maxLength={50}
            keyboardType={"numeric"}
          />
        </View>
        <View style={{position: "absolute", bottom: 0, left: 20}}>
          <Text style={{marginHorizontal: 27, textAlign: "center", color: "#959595", fontSize: 12}}>Продолжая, вы соглашаетесь с политикой конфиденциальности</Text>
          <TouchableWithoutFeedback onPress={() => sendNumber()}>
            <View style={styles.OrderButton}>
              <Text style={styles.OrderButtonText}>{"Продолжить"}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
})

const RegistrationStack = createStackNavigator();

const Registration = (props) => {
  const [address, setAddress] = useState(null)
  
  return (
    <View style={styles.container}>
      <RegistrationStack.Navigator initialRouteName="PhoneInput">
        <RegistrationStack.Screen 
          name="PhoneInput"
          component={PhoneInput} 
          options={{headerShown: false}}
          initialParams={{ Text: props.route.params.Text}}
          />
        <RegistrationStack.Screen 
          name="CodeInput" 
          component={CodeInput} 
          options={{headerShown: false}}/>
      </RegistrationStack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
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
  OrderButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#D84C38",
    borderRadius: 8,
    marginVertical: 20
  },
  OrderButtonText: {
    textAlign: "center",
    lineHeight: 22,
    color: "#FFFFFF",
    marginVertical: 14,
    fontSize: 15,
    fontFamily: "Raleway_600SemiBold"
  }
});

export default Registration  
