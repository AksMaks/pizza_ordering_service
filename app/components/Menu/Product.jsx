import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback} from 'react-native';

const Product = (props) => {
  return (
    <View style={styles.Container}> 
      <Image
        style={styles.Image}
        source={{uri: props.Image}}
      />
      <View style={styles.Text}>
        <Text style={styles.Name}>{props.Name}</Text>
        {props.Description && <Text style={styles.Description}>{props.Description}</Text>}
        <TouchableWithoutFeedback onPress={() => props.SelectProduct()}>
          <Text style={styles.Price}>
            {props.Price}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container:{
    marginBottom: 40,
    flexDirection: "row",
  },
  Image:{
    width: 140,
    height: 140
  },
  Text: {
    marginLeft: 25
  },
  Name: {
    width: 170,
    fontSize: 18,
    fontWeight: "bold"
  },
  Description: {
    width: 170,
    maxHeight: 72,
    fontSize: 12,
    color: "#808080",
    marginTop: 5
  },
  Price: {
    width: 73,
    height: 30,
    color: "#BC3B28",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 30,
    borderWidth: 1,
    borderColor: "#BC3B28",
    borderRadius: 7,
    marginTop: 10
  }
});

export default Product
