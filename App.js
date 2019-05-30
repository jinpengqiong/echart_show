/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {Platform, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import Home from './components/Home'
import Interaction from './components/interaction'
import Fans from './components/fans'
import Icon from 'react-native-vector-icons/FontAwesome';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state= {
      selectedTab:'home'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="主页"
            renderIcon={() => <Icon name="home" size={25} color="black" />}
            renderSelectedIcon={() => <Icon name="home" size={25} color="#0079FF" />}
            // badgeText="1"
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <Home></Home>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'interaction'}
            title="互动数据"
            renderIcon={() => <Icon name="american-sign-language-interpreting" size={25} color="black" />}
            renderSelectedIcon={() => <Icon name="american-sign-language-interpreting" size={25} color="#0079FF" />}
            // renderBadge={() => <CustomBadgeView />}
            onPress={() => this.setState({ selectedTab: 'interaction' })}>
            <Interaction></Interaction>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'fans'}
            title="粉丝数据"
            renderIcon={() => <Icon name="users" size={25} color="black" />}
            renderSelectedIcon={() => <Icon name="users" size={25} color="#0079FF" />}
            // renderBadge={() => <CustomBadgeView />}
            onPress={() => this.setState({ selectedTab: 'fans' })}>
            <Fans></Fans>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
