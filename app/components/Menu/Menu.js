import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Modal } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import Header from '../header/header';

import IconStories from './IconStories'
import Stories from './Stories';
import Product from './Product';
import ProductModal from './ProductModal';
import menu from '../../store/menu';
import comments from '../../store/comments';

export default function Menu() {
  //Активная категория
  const [cat, setCat] = useState(menu.Category[0].Id);

  const [modalStories, setModalStories] = useState({
    Visible: false, 
    Data: comments.data, 
    Image: require('../../assets/Menu/comments.png'), 
    Text: "Отзывы" 
  });
  const [modalProduct, setModalProduct] = useState({
    Visible: true,
    Id: 11
  });

  return (
    <View style={styles.container}>
      <Modal
        animationType={"none"}
        transparent={false}
        visible={modalStories.Visible}
        onRequestClose={() => {
          setModalStories({Visible: false, Data: [] }); //поменять на пустой массив
        }}>
        <Stories 
          data={modalStories.Data} 
          Image={modalStories.Image} 
          Text={modalStories.Text} 
          closeModal={ () => setModalStories({Visible: false, Data: []}) }/>
      </Modal>
      <Modal
        animationType={"none"}
        transparent={false}
        visible={modalProduct.Visible}
        onRequestClose={() => {
          setModalProduct({Visible: false}); //поменять на пустой массив
        }}>
        <ProductModal
          Id={modalProduct.Id}
          closeModal={ () => setModalProduct({Visible: false, Id: null}) }
        />
      </Modal>
      <Header leftText={"PizzData"} centerText={""} rightText={"300 Б"}/>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.IconsStories}>
        <IconStories Image={require('../../assets/Menu/stock.png')} Text={"Акции"} Active={true}/>
        <IconStories Image={require('../../assets/Menu/comments.png')} Text={"Отзывы"} Active={true} openModal={() => setModalStories({Visible: true, Data: comments.data, Image: require('../../assets/Menu/comments.png'), Text: "Отзывы"})}/>
        <IconStories Image={require('../../assets/Menu/cooperation.png')} Text={"Сотруднич."} Active={false}/>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}> 
        {menu.Category.map(el => {
          return (
          <TouchableWithoutFeedback 
            key={uuidv4()}
            onPress={() => setCat(el.Id)}>
            <Text style={cat == el.Id? styles.activeCategory: styles.Category}>
              {el.Name}
            </Text>
          </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
      <View  style={styles.ProductsList}>
        {menu.Products.filter(elf => elf.IdCategory == cat).map(el => {
          return (
          <Product 
            key={uuidv4()}
            Name={el.Name}
            Description={el.Description}
            Image={el.Image}
            Price={"От 100р >"}
            SelectProduct={() => setModalProduct({Visible: true, Id: el.Id})}
            closeModal={ () => setModalProduct({Visible: false, Id: null}) }
          />
          )
        })}
      </View> 
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  IconsStories: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30
  },
  Category: {
    width: 91,
    height: 33,
    fontSize: 15,
    lineHeight: 33,
    color: "#808080",
    borderRadius: 32,
    textAlign: "center",
    backgroundColor: "#E7E7E7",
    marginRight: 5
  },
  activeCategory: {
    width: 91,
    height: 33,
    fontSize: 15,
    lineHeight: 33,
    color: "#ffffff",
    borderRadius: 32,
    textAlign: "center",
    backgroundColor: "#BC3B28",
    marginRight: 5
  },
  ProductsList: {
    marginTop: 30
  }
});
