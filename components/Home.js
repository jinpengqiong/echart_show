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
        }
    }
    componentDidMount(){
        const { appStore } = this.props.store;
        appStore.getStartDate(null)
        retrieveData('token').then(
            res => {
                if(!res){
                    Actions.login()
                }
                this.getChartRooms(res)
            }
        ).catch( err => Actions.login())
    }

    getChartRooms = token => {
        const { appStore } = this.props.store;
        const userId = appStore.userId
        // const token = appStore.token
        const url = `${HOST}/users/${userId}/ownedManagedRooms2?limit=100&skip=0`
        fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
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
          })
    }

    
    
    render() {
        const { appStore } = this.props.store;
        const tsStart = parseInt((new Date(new Date().toLocaleDateString()).getTime())/1000)
        const tsEnd = parseInt((new Date().getTime())/1000)
        return (
            <>
                {/* <View>
                    <Text>{appStore.token}</Text>
                    <Text>{appStore.userId}</Text>
                    <Text>{JSON.stringify(appStore.formatRoomsData)}</Text>
                    <Text>{JSON.stringify(appStore.startDate)}</Text>
                    <Text>{JSON.stringify(appStore.endDate)}</Text>
                    <Text>{JSON.stringify(appStore.roomId)}</Text>
                    <Text>
                    { appStore.startDate? `http://datav.aliyuncs.com/share/d081065571c55c57a5916b1efe181579?roomid=${appStore.roomId}&tsStart=${appStore.startDate}&tsEnd=${appStore.endDate}`
                                                                :
                                                            `http://datav.aliyuncs.com/share/d081065571c55c57a5916b1efe181579?roomid=${appStore.roomId}&tsStart=${tsStart}&tsEnd=${tsEnd}`
                    }
                    </Text>
                </View> */}
                <CommonActionButton />
                <WebView source={{ uri: appStore.startDate? `http://datav.aliyuncs.com/share/d081065571c55c57a5916b1efe181579?roomid=${appStore.roomId}&tsStart=${appStore.startDate}&tsEnd=${appStore.endDate}`
                                                                :
                                                            `http://datav.aliyuncs.com/share/d081065571c55c57a5916b1efe181579?roomid=${appStore.roomId}&tsStart=${tsStart}&tsEnd=${tsEnd}`
                }} />   
            </>
        )
    }
}