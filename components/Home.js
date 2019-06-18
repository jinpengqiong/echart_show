import React,{Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import { retrieveData , wrappedFetch , clearData} from './request'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react';
import { HOST } from './constant' 
import CommonActionButton from './actionButton/actionButton'
import DropdownAlert from 'react-native-dropdownalert';

const styles = StyleSheet.create({
    
  })

  @inject('store')
  @observer
  export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        const { appStore } = this.props.store;
        appStore.getMessageRef(this.dropdown)
        appStore.getStartDate(null)
        this.getToken()
    }

    getToken = async () => {
      const token = await retrieveData('token')
      if(token){
        this.getChartRooms(token)
      }else {
        Actions.login()
      }
    }

    getChartRooms = async token => {
        const { appStore } = this.props.store;
        const userId = await retrieveData('userId')
        if(userId){
          const url = `${HOST}/users/${userId}/ownedManagedRooms2?limit=100&skip=0`
          fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.error_code) return
            let arr = responseJson.data.map(
                item => {
                  return item.name
                }
              )
            appStore.getOriginalRoomsData(responseJson.data)
            appStore.getFormatRoomsData(arr)
            appStore.initRoomId(responseJson.data)
          }).catch(() => Actions.login())
        }else {
          Actions.login()
        }
    }

    
    
    render() {
        const { appStore } = this.props.store;
        const tsStart = parseInt((new Date(new Date().toLocaleDateString()).getTime())/1000)
        const tsEnd = parseInt((new Date().getTime())/1000)
        return (
            <>
                <CommonActionButton />
                <WebView source={{ uri: appStore.startDate? `http://datav.aliyuncs.com/share/d081065571c55c57a5916b1efe181579?roomid=${appStore.roomId}&tsStart=${appStore.startDate}&tsEnd=${appStore.endDate}`
                                                                :
                                                            `http://datav.aliyuncs.com/share/d081065571c55c57a5916b1efe181579?roomid=${appStore.roomId}&tsStart=${tsStart}&tsEnd=${tsEnd}`
                }} />  
                <DropdownAlert ref={ref => this.dropdown = ref} /> 
            </>
        )
    }
}