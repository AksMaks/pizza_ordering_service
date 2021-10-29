import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import Header from '../header/header';

export default function HistoryOrders() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
    <Header leftText={"< Профиль"} centerText={""} rightText={"300 Б"} leftActive={navigation.goBack}/>
      <ScrollView>
        <Text>HistoryOrders</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff"
  }
});
