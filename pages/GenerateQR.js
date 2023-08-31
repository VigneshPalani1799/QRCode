import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Speech from 'expo-speech';
import QRCode from "react-native-qrcode-svg";
import { encoding } from "../compression/lempel-ziv";
import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

class QRCodeGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  handleInputChange = (text) => {
    this.setState({ data: text });
  };

  componentDidMount() {
    const encodedData = encoding(this.state.data);
    this.setState({ data: encodedData });
    Speech.speak("You are now on the QR Generator page. If you want to scan the qr code please swipe to Right");
  }

  //save the qrcode image function
  saveQRCodeImage = async () => {
    try {
      const uri = await this.viewShotRef.capture();
      // uri for import image from local path and then save from same way .
      console.log("Image saved at:", uri);
      Sharing.shareAsync(uri);

    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  render() {
    const { data } = this.state;
    if (this.state.data)
      return (
        <View style={styles.container}>
          <ViewShot
            ref={(ref) => (this.viewShotRef = ref)}
            options={{ format: "jpg", quality: 0.9 }}
          >
            <QRCode
              value={this.state.data.toString()}
              size={200}
              getRef={(c) => (this.svg = c)}
            />
          </ViewShot>
          <TextInput
            onChangeText={this.handleInputChange}
            value={data}
            placeholder="Type your data here"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ data: "" });
            }}
          >
            <Text>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.saveQRCodeImage}
          >
            <Text>Save QR Code Image</Text>
          </TouchableOpacity>
        </View>

      );
    else
      return (
        <View style={styles.container}>
          <TextInput
            onChangeText={this.handleInputChange}
            value={data}
            placeholder="Type your data here"
            style={styles.input}
          />
          <Text>No text to display</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    backgroundColor: "white",
    margin: 20,
  },
});

export default QRCodeGenerator;