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
        source={{uri: 'https://sun9-87.userapi.com/impg/jcQEd8L9B4za71HXua_plW975TTwqnL_xYFFBw/atmaoogbxFg.jpg?size=1280x853&quality=96&sign=f8dd44f08fbb5c534b5a3fcce8a34613&type=album'}}
      />
      <View style={{paddingHorizontal: 20}}>
        {contacts.getContacts().map(el => {
          return <Contact key={uuidv4()} Url={el.Url} Text={el.Text} Image={el.Image}/>
        })}
        <Text style={styles.Text}>Политика конфиденциальности</Text>
      </View>  
    </ScrollView>
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: "#ffffff",
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
    marginVertical: 30,
  }
});

export default Contacts
