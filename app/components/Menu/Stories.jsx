import React, { useState, useEffect, useRef }  from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

const delay = 2000

function useInterval(callback, delay) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

const Stories = (props) => {
  const [current, setCurrent] = useState(0);

  useInterval(() => {
    if(current < props.data.length-1){
      setCurrent(current + 1)
    }else{
      props.closeModal()
    }
  }, delay);

  return (
    <View style={styles.Container}>
      <Image
        style={styles.MainImage}
        source={{uri: props.data[current].Image}}
      />
      <View style={styles.StoriesProgress}>
        {props.data.map((el, ind) => {
          return (
            (current == ind)? 
            <View 
              key={uuidv4()} 
              style={styles.StoryProgressActive}>
            </View>:
            <View 
              key={uuidv4()} 
              style={styles.StoryProgress}>
            </View> )
        })}
      </View>
      <View style={styles.Header}>
        <View style={{flexDirection: "row"}}>
          <Image
            style={styles.Image}
            source={props.Image}
          />
          <Text style={styles.Text}>{props.Text}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => props.closeModal()}>
          <Image
            style={styles.Image, styles.ImageClose}
            source={require('../../assets/Menu/Close.png')}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container:{
    flex: 1
  },
  StoriesProgress: {
    marginVertical: 7,
    marginHorizontal: 7.5,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  StoryProgress: {
    flex: 1,
    height: 5,
    marginHorizontal: 2.5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 21
  },
  StoryProgressActive: {
    flex: 1,
    height: 5,
    marginHorizontal: 2.5,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 21
  },
  Header: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between"
  },
  Image: {
    width: 33,
    height: 33
  },
  Text: {
    lineHeight: 33,
    color: "#FFFFFF",
    marginLeft: 9
  },
  MainImage: {
    position: "absolute",
    height: "100%",
    width: "100%"
  }
});

export default Stories
