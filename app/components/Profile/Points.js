import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/header2';

import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

import levels from '../../store/levels';

export default function Points() {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Header leftText={"< Назад"} centerText={""} rightText={"300 D"} leftActive={navigation.goBack}/>
        <ScrollView>
          <Text style={styles.Title}>Кэшбек система</Text>
          <View key={uuidv4()} style={styles.LevelHeader}>
            <Text>Уровень</Text>
            <Text>Процент</Text>
            <Text>Уловие перехода</Text>
          </View>
          {levels.data.map(el => {
            return (
              <View key={uuidv4()} style={styles.Level}>
                <Text>{el.Name}</Text>
                <Text>{el.Сashback+"%"}</Text>
                <Text>{el.Border}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff"
  },
  Title: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 24,
    marginVertical: 20
  },
  LevelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Raleway_600SemiBold",
    borderBottomWidth: 1,
    borderColor: "#d0d0d0",
  },
  Level: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#E7E7E7",
  }
});
