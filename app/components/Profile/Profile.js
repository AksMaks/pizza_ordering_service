import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import Header from '../header/header';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Header leftText={"PizzData"} centerText={""} rightText={"300 Б"}/>
      <ScrollView>
        <Text>Profile</Text>
        <Text>Profile</Text>
        <Text>Profile</Text>
        <Text>Profile</Text>
        <Text>Profile</Text>
        <Text>Profile</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
