import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './Routes';
import 'react-native-gesture-handler';

class App extends Component {
   render() {
      return (
         <Routes />
      )
   }
}
export default App
AppRegistry.registerComponent('App', () => App)

