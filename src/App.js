import React from 'react';
import { View, StatusBar } from 'react-native';
import Router from './Router';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        <Router/>
      </View>
    );
  }
}