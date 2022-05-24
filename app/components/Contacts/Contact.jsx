import React, { useCallback } from "react";
import { StyleSheet, Text, View, Image, Alert, Linking, TouchableHighlight} from 'react-native';

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableHighlight onPress={handlePress} underlayColor="white">
      {children}
    </TouchableHighlight>
  )
};


const Contact = (props) => {
  return (
    <View style={styles.Contact}>
      <Image
        style={styles.Image}
        source={{uri: props.Image}}
        resizeMode="contain"
      />
      <Text style={styles.Text}>{props.Text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Contact: {
    flexDirection: "row",
    height: 62,
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  Image: {
    width: 20,
    height: 20
  },
  Text: {
    fontSize: 18,
    marginLeft: 15,
    justifyContent: 'center',
  }
});

export default Contact