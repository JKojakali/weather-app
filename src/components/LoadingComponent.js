import React from 'react';
import { 
  Image, 
  StyleSheet, 
  View, 
  Dimensions, } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  
  render() {
    return (
        <View style={styles.rootContainer}>
          <Image source={require('../../assets/images/loading-sun.gif')} style={styles.loadingGif} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    rootContainer: { 
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position: 'absolute',
      top: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5FCFFA' 
    },
    loadingGif: {
      height: 100,
      width: 100
    }
});