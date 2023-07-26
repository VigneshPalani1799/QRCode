import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = () => {
    const qrData = 'Your data goes here';
  
    return (
      <View style={styles.container}>
        <Q
        RCode value={qrData} size={200} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
  
export default QRCodeGenerator;
  