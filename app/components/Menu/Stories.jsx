import React, { useState, useEffect, useRef }  from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import stories from '../../store/stories';

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

const BlockStories = (props) => {
  const [current, setCurrent] = useState(0);
  const [delay, setDelay] = useState(7000)
  const [isRunning, setIsRunning] = useState(true)

  useInterval(() => {
    if(current < props.data.length-1){
      setCurrent(current + 1)
    }else{
      props.changeBlockStories(1)
    }
  }, isRunning ? delay : null);
  
  useEffect(() => {
    setCurrent(0)
  }, [props.data])

  const changeCurrent = (newCurrent) => {
    if(delay == 7001){
      setDelay(7000)
    }else{
      setDelay(7001)
    }
    if(newCurrent >= 0 && newCurrent <= props.data.length-1){
      setCurrent(newCurrent)
    }else{
      if(newCurrent == -1){
        props.changeBlockStories(-1)
      }else{
        props.changeBlockStories(1)
      }
    }
  }

  return (
    <View style={styles.Container}>
      {current < props.data.length && <Image
        style={styles.MainImage}
        source={{uri: props.data[current].Image}}
      />}
      <TouchableWithoutFeedback onPress={() => changeCurrent(current + 1)}>
        <View style={{
          position: "absolute",
          width: "30%",
          height: "100%",
          top: 0,
          right: 0
        }} ></View></TouchableWithoutFeedback> 
      <TouchableWithoutFeedback onPress={() => changeCurrent(current - 1)}>
        <View style={{
          position: "absolute",
          width: "30%",
          height: "100%",
          top: 0,
          left: 0
        }} ></View></TouchableWithoutFeedback> 
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
            style={styles.ImageClose}
            source={require('../../assets/Menu/Close.png')}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const Stories = (props) => {
  const [Text, setText] = useState(0);
  const [image, setImage] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(0); 
  const [data, setData] = useState([stories.stock, stories.comments, stories.cooperation]); 

  useEffect(() => {
    if(props.Text == "Акции"){setText(props.Text); setImage(require('../../assets/Menu/stock.png')); setCurrentBlock(0)}
    if(props.Text == "Отзывы"){setText(props.Text); setImage(require('../../assets/Menu/comments.png')); setCurrentBlock(1)}
    if(props.Text == "Сотрудничество"){setText(props.Text); setImage(require('../../assets/Menu/cooperation.png')); setCurrentBlock(2)}
  }, [])

  useEffect(() => {
    if(currentBlock == 0){setText("Акции"); setImage(require('../../assets/Menu/stock.png'))}
    if(currentBlock == 1){setText("Отзывы"); setImage(require('../../assets/Menu/comments.png'))}
    if(currentBlock == 2){setText("Сотрудничество"); setImage(require('../../assets/Menu/cooperation.png'))}
  }, [currentBlock])

  const changeBlockStories = (change) => {
    if(currentBlock == 0) stories.changeActual("stock")
    if(currentBlock == 1) stories.changeActual("comments")
    if(currentBlock == 2) stories.changeActual("cooperation")

    if(change == 1 && currentBlock < data.length-1 || change == -1 && currentBlock > 0){
      setCurrentBlock(currentBlock + change)
    }else{
      props.closeModal()
    } 
  }
  return (
    <BlockStories 
      data={data[currentBlock]} 
      Text={Text} 
      Image={image} 
      closeModal={props.closeModal} 
      changeBlockStories={changeBlockStories}
    />
  )
}

const styles = StyleSheet.create({
  Container:{
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 40,
      },
      android: {
      },
    }),
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
  ImageClose: {
    width: 28,
    height: 28
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
