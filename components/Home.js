import React,{Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import { retrieveData , wrappedFetch , clearData} from './request'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react';
import { HOST } from './constant' 
import CommonActionButton from './actionButton/actionButton'

const styles = StyleSheet.create({
    
  })

  @inject('store')
  @observer
  export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:null
        }
    }
    componentDidMount(){
        const { appStore } = this.props.store;
        if(!appStore.token){
            Actions.login()
        }
        this.getChartRooms()
    }

    getChartRooms = () => {
        const { appStore } = this.props.store;
        const userId = appStore.userId
        const token = appStore.token
        const url = `${HOST}/users/${userId}/ownedRooms`
        const query = {
            limit: 100,
            skip: 0,
          }
        fetch(url,
            {
                method: 'POST',
                headers:{
                    'content-type':'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(query)
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data:responseJson.data
                })
            }).catch(error => console.log(error))
    }

    
    
    render() {
        const { appStore } = this.props.store;
        return (
            <>
                <View>
                    <Text>{appStore.token}</Text>
                    <Text>{appStore.userId}</Text>
                    <Text>{JSON.stringify(this.state.data)}</Text>
                </View>
                <CommonActionButton />
                <WebView source={{ uri: appStore.url1 }} />   
            </>
        )
    }
}