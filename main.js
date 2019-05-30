import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import App from './App'
import { Router,Stack, Scene } from 'react-native-router-flux'

export default class Main extends Component {
  render() {
    return (
      <Router sceneStyle={{ backgroundColor: '#F5FCFF' }}>
          <Stack key='root'>
              <Scene 
              key='app'
              component={App}
              title=''
              hideNavBar={true}
              />
              {/* <Scene 
              key='movieList'
              component={MovieList}
              title='热映电影'
              />
              <Scene 
              key='movieDetail'
              component={MovieDetail}
              title='电影详情'
              /> */}
          </Stack>
      </Router>
    )
  }
}