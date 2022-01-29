import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Modal, FlatList} from 'react-native';
import AppLoading from 'expo-app-loading';
import { observer } from "mobx-react-lite"
import { v4 as uuidv4 } from 'uuid';
import Header from '../header/header';

import {
  useFonts,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';

import IconStories from './IconStories'
import Stories from './Stories';
import Product from './Product';
import ProductModal from './ProductModal';

import menu from '../../store/menu';
import profile from '../../store/profile';
import stories from '../../store/stories';

const ProductsList = (props) => {
  return (
    <View style={styles.ProductsList}>
      {props.Products.map(el => {
        return (
        <Product
          key={uuidv4()}
          Name={el.Name}
          Description={el.Description}
          Image={el.Image}
          Price={Math.min(...(el.Options.map(el => el.Price)))}
          SelectProduct={() => {
            props.navigation.navigate('Product', {Product: el})
          }}
        />
        )
      })}
    </View>
  )
}

const Menu = observer((props) => {
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold
  });
  const [cat, setCat] = useState(0); //Активная категория
  const [scrollView, setScrollView] = useState();
  const [showsCategoryView, setShowsCategoryView] = useState(false);
  const [categoryView, setCategoryView] = useState();
  const [modalStories, setModalStories] = useState({
    Visible: false,
    Text: "Отзывы" 
  });

  const Scroll = (ind) => {
    setCat(ind)
    let set = 150
    for(let i = 0; i < ind; i++){
      set += (menu.Products.filter(elf => elf.IdCategory == menu.Category[ind].Id).length-1) * 180
    }
    scrollView.scrollTo({ x: 0, y: set, animated: true })
  }
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
        <Header leftText={"PizzData"} centerText={""} rightText={profile.data.Points + " Б"}/>
        <ScrollView 
          ref={(ref) => setScrollView(ref)}
          showsVerticalScrollIndicator={false}
          onScroll={(event) => {
            if(event.nativeEvent.contentOffset.y < 180){
              categoryView.setNativeProps({style: {height: 0}})
            }else{
              categoryView.setNativeProps({style: {height: 40}})
            }
          }}
          scrollEventThrottle={16}
        >
        <View style={styles.IconsStories}>
          <IconStories Image={require('../../assets/Menu/stock.png')} Text={"Акции"} Active={stories.Actual.stock} openModal={() => setModalStories({Visible: true, Text: "Акции"})}/>
          <IconStories Image={require('../../assets/Menu/comments.png')} Text={"Отзывы"} Active={stories.Actual.comments} openModal={() => setModalStories({Visible: true, Text: "Отзывы"})}/>
          <IconStories Image={require('../../assets/Menu/cooperation.png')} Text={"Сотруднич."} Active={stories.Actual.cooperation} openModal={() => setModalStories({Visible: true, Text: "Сотрудничество"})}/>
        </View>
        <View style={{height: 33}}>
          <ScrollView  horizontal showsHorizontalScrollIndicator={false}> 
            {menu.Category.map((el, ind) => {
              return (
              <TouchableWithoutFeedback 
                key={uuidv4()}
                onPress={() => Scroll(ind)}>
                <View style={cat == ind? styles.activeCategoryContainer: styles.CategoryContainer}>
                  <Text style={cat == ind? styles.activeCategory: styles.Category}>{el.Name}</Text>
                </View>
              </TouchableWithoutFeedback>
              )
            })}
          </ScrollView>
        </View>
        {
          menu.Category.length > 0 && menu.Category.map(el => {
            return ( <ProductsList
              key={uuidv4()}
              Title={el.Name}
              Products={menu.Products.filter(elf => elf.IdCategory == el.Id)}
              navigation={props.navigation}
            />)
          })
        }
        </ScrollView>
        {
        <View 
          ref={(ref) => setCategoryView(ref)} 
          style={{
            height: 0, 
            width: "100%",
            position: "absolute", 
            top: 50, 
            marginHorizontal: 20,
            backgroundColor: "#ffffff"
          }}
        >
          <ScrollView  horizontal showsHorizontalScrollIndicator={false}> 
            {menu.Category.map((el, ind) => {
              return (
              <TouchableWithoutFeedback 
                key={uuidv4()}
                onPress={() => Scroll(ind)}>
                <View style={cat == ind? styles.activeCategoryContainer: styles.CategoryContainer}>
                  <Text style={cat == ind? styles.activeCategory: styles.Category}>{el.Name}</Text>
                </View>
              </TouchableWithoutFeedback>
              )
            })}
          </ScrollView>
        </View>
        }
      </View>
    );
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff"
  },
  IconsStories: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30
  },
  activeCategoryContainer: {
    width: 91,
    height: 33,
    borderRadius: 32,
    backgroundColor: "#BC3B28",
    marginRight: 5,
  },
  CategoryContainer: {
    width: 91,
    height: 33,
    borderRadius: 32,
    backgroundColor: "#E7E7E7",
    marginRight: 5
  },
  Category: {
    fontSize: 15,
    color: "#808080",
    textAlign: "center",
    lineHeight: 30,
    fontFamily: "Raleway_600SemiBold"
  },
  activeCategory: {
    fontSize: 15,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 30,
    fontFamily: "Raleway_600SemiBold"
  }
});

export default Menu