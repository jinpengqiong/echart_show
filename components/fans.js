import React,{Component} from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';
import { inject, observer } from 'mobx-react';
import CommonActionButton from './actionButton/actionButton'
import { retrieveData , wrappedFetch , clearData} from './request'
@inject('store')
@observer
export default class Fans extends Component {

    componentDidMount(){
        const { appStore } = this.props.store;
        appStore.getStartDate(null)
        retrieveData('token').then(
            res => {
                if(!res){
                    Actions.login()
                }
            }
        )
    }

    render() {
        const { appStore } = this.props.store;
        return (
            <>
                <CommonActionButton />
                <WebView source={{ uri: appStore.startDate? `http://datav.aliyuncs.com/share/01e1c4f8db2235b28cc378c97557bd3b?roomId=${appStore.roomId}&tsStart=${appStore.startDate}&tsEnd=${appStore.endDate}`
                                                                :
                                                            `http://datav.aliyuncs.com/share/01e1c4f8db2235b28cc378c97557bd3b?roomId=${appStore.roomId}`
                }} />    
            </>
        )
    }
}