import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './Routes';
import 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';


OneSignal.setLogLevel(6, 0);
OneSignal.setAppId('38dfac23-7150-475b-898b-f284b7b965dc');


class App extends Component {
   render() {
      return (
         <Routes />
      )
   }
}
export default App
AppRegistry.registerComponent('App', () => App)

