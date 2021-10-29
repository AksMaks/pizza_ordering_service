import React from 'react';
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';
import { observer } from "mobx-react-lite"
import { v4 as uuidv4 } from 'uuid';

import Contact from './Contact'

import contacts from '../../store/contacts';

const Contacts = observer(() => {
  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} >
      <Image
        style={styles.Image}
        source={{uri: 'https://sun9-39.userapi.com/impg/TFoGPMxwVD5Ige-fR2i7W7oFJjHjaikQ6AiYZQ/PRESMDWsOr4.jpg?size=292x292&quality=96&sign=d3f8e0440f94de30ad0bfd06ac80a528&type=album'}}
      />
      {contacts.getContacts().map(el => {
        return <Contact key={uuidv4()} Url={el.Url} Text={el.Text} Image={el.Image}/>
      })}
      <Text style={styles.Text}>Политика конфиденциальности</Text>
    </ScrollView>
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff"
  },
  Image:{
    width: "100%",
    height: 300,
    marginTop: 40
  },
  Text: {
    fontSize: 15,
    textDecorationLine: "underline",
    color: "rgba(188, 59, 40, 1)",
    textAlign: "center",
    marginVertical: 30
  }
});

export default Contacts
