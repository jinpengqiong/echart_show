import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import App from './App'
import Login from './components/login/login'
import { Router,Stack, Scene } from 'react-native-router-flux'
import { Provider } from 'mobx-react';
import store from './components/store'

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router sceneStyle={{ backgroundColor: '#F5FCFF' }}>
            <Stack key='root'>
                <Scene 
                key='app'
                component={App}
                title=''
                hideNavBar={true}
                />
                <Scene 
                key='login'
                component={Login}
                title=''
                hideNavBar={true}
                />
            </Stack>
        </Router>
      </Provider>
    )
  }
}