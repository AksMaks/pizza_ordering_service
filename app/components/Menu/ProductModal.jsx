import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback, Alert} from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import menu from '../../store/menu';
import Additive from './Additive';

import Header from '../header/header';

const ProductModal = (props) => {
  const [Product, setProduct] = useState({...(menu.Products.find(el => el.Id == props.Id))})
  const [indOption, setIndOption] = useState(0)

  //Изменение количество добавок (индекс добавки, [-1, 1])
  const changeNumAdditive = (ind, change) => {
    let tempProduct = {...Product}
    let sumAdditives = 0
    tempProduct.Options[indOption].Additives.forEach(el => {
      sumAdditives += el.Number
    })
    if(sumAdditives < tempProduct.Options[indOption].Additive || change == -1){
      tempProduct.Options[indOption].Additives[ind].Number += change
      setProduct(tempProduct)
    }else{
      Alert.alert("В выбранный товар можно добавить только " + tempProduct.Options[indOption].Additive + " добавки.")
    }
  }
  //Считает сумарную массу
  const getWeight = () => {
    let weight = Product.Options[indOption].Weight
    Product.Options[indOption].Additives.forEach(el => {
      weight += el.Weight*el.Number
    })
    return weight
  }
  //Считает суммарную цену
  const getPrice = () => {
    let price = Product.Options[indOption].Price
    Product.Options[indOption].Additives.forEach(el => {
      price += el.Price*el.Number
    })
    return price
  }

  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header leftText={"< Меню"} centerText={""} rightText={""} leftActive={() => props.closeModal()}/>
        <View style={styles.ImageContainer}>
          <Image
            style={styles.Image}
            source={{uri: Product.Image}}
          />
        </View>
        <View style={styles.Text}>
          <Text style={styles.Name}>{Product.Name}</Text>
          {Product.Description && <Text style={styles.Description}>{Product.Description}</Text>}
        </View>
        <View style={styles.Parameters}>
          <Text style={styles.Weight}>{"Вес: " + getWeight() + "гр"}</Text>
          <Text style={styles.Size}>{"Размер: " + Product.Options[indOption].Size + "см"}</Text>
        </View>
        {Product.Options.length > 0 && <View style={styles.Options}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}> 
            {Product.Options.map((el, ind) => {
              return <TouchableWithoutFeedback 
                key={uuidv4()}
                onPress={() => setIndOption(ind)}>
                <Text style={indOption == ind? styles.activeOption: styles.Option}>
                  {el.Name}
                </Text>
              </TouchableWithoutFeedback>
            })}
          </ScrollView>
        </View>}
        {Product.Options[indOption].Additives.length > 0 && <View style={styles.AdditivesContainer}>
          <Text style={styles.AdditivesTitle}>{"Добавки"}</Text>
          <View style={styles.Additives}> 
            {Product.Options[indOption].Additives.map((el, ind) => {
              return <Additive 
                key={uuidv4()}
                Name={el.Name}
                Number={el.Number}
                Image={el.Image}
                changeNumAdditive={(change) => changeNumAdditive(ind, change)}/>
            })}
          </View>
        </View>}
      </ScrollView>
      <View style={styles.PriceContainer}>
          <Text style={styles.Price}>{"Добавить в корзину за " + getPrice() + "р"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container:{
    height: "100%",
    marginHorizontal: 20
  },
  ImageContainer:{
    alignItems: "center",
  },
  Image:{
    width: 270,
    height: 270,
  },
  Text: {
    marginTop: 20
  },
  Name: {
    fontSize: 24,
    color: "#202020"
  },
  Description: {
    fontSize: 15,
    color: "#808080"
  },
  Parameters: {
    flexDirection: "row",
    marginTop: 20,
  },
  Weight: {
    marginRight: 25,
    fontSize: 15,
  },
  Size: {
    fontSize: 15
  },
  Options: {
    marginTop: 10,
    width: "100%",
    height: 40,
    backgroundColor: "#F3F2F7"
  },
  activeOption: {
    flex: 1,
    marginHorizontal: 2,
    marginVertical: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    fontSize: 15
  },
  Option: {
    flex: 1,
    marginHorizontal: 2,
    marginVertical: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    fontSize: 15
  },
  AdditivesContainer: {
    marginTop: 20,
    marginBottom: 90
  },
  AdditivesTitle: {
    color: "#202020",
    fontSize: 18,
    fontWeight: "bold"
  },
  Additives: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  PriceContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingVertical: 20,
    backgroundColor: "#ffffff"
  },
  Price: {
    height: 50,
    backgroundColor: "rgba(216, 76, 56, 1)",
    borderRadius: 8,
    fontSize: 15,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 50,
  }
});

export default ProductModal
