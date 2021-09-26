import React from 'react';
import { StyleSheet, Text, ScrollView, Image } from 'react-native';
import { observer } from "mobx-react-lite"
import { v4 as uuidv4 } from 'uuid';

import Contact from './Contact'

import contacts from '../../store/contacts';

const Contacts = observer(() => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image
        style={styles.Image}
        source={{uri: 'https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg'}}
      />
      <Contact Url={"https://google.com"} Text={"Test"} Image={"https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg"}/>
      {contacts.getContacts().map(el => {
        return <Contact key={uuidv4()} Url={el.Url} Text={el.Text} Image={el.Image}/>
      })}
      <Text style={styles.Text}>Политика конфиденциальности</Text>
    </ScrollView>
  );
})

const styles = StyleSheet.create({
  Image:{
    width: "100%",
    height: 200,
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
