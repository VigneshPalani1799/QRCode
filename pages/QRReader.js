import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Speech from 'expo-speech';
import { decoding } from '../compression/lempel-ziv';

export default class QRReader extends React.Component{

  constructor(props){
    super(props);
    this.state={
      hasPermission:null,
      scanned:false,
      text:'Not yet scanned',
      lastPress:0
    }
  }

  componentDidMount(){
    this.askForCameraPermission();
    Speech.speak("You are now on the home page of the app. To Generate QR Code, Swipe to left.")
  }

  askForCameraPermission = async()=>{
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    if(status!=='granted')
    this.speak("Please kindly grant permission for the app to use camera.");
    this.setState({hasPermission:status==='granted'})
  }

  handleDoubleTap = () => {
    const currentTime = new Date().getTime();
    const delta = currentTime - this.state.lastPress;
    const DOUBLE_PRESS_DELAY = 400;
    if (delta < DOUBLE_PRESS_DELAY) {
      this.setState({ scanned: false });
    }
    this.setState({ lastPress: currentTime });
  }

  speak = (data) => {
    Speech.speak(data);
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push(data.charCodeAt(i));
    }
    data = decoding(arr);
    console.log(data);
    this.setState({ text: data });
    this.speak(data);
    const delay = setTimeout(() => {
      this.speak("To Scan Again Double tap anywhere on the screen.");
    }, 1500);
  };

  render(){
    const { hasPermission, scanned, text } = this.state;

    if (hasPermission === null) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission</Text>
        </View>
      );
    }
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>No access to camera</Text>
          <Button title={'Allow Camera'} onPress={() => this.askForCameraPermission()} />
        </View>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={this.handleDoubleTap}>
        <View style={styles.container}>
          <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={{ height: 400, width: 400 }}
            />
          </View>
          <Text style={styles.maintext}>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '50%',
      width: '100%',
      overflow: 'hidden',
      borderRadius: 30,
    }
  });