import React,{Component} from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';
import { inject, observer } from 'mobx-react';
import CommonActionButton from './actionButton/actionButton'
import DropdownAlert from 'react-native-dropdownalert';

@inject('store')
@observer
export default class Fans extends Component {

    componentDidMount(){
        const { appStore } = this.props.store;
        appStore.getMessageRef(this.dropdown)
        appStore.getStartDate(null)
    }

    render() {
        const { appStore } = this.props.store;
        const tsStart = parseInt((new Date(new Date().toLocaleDateString()).getTime())/1000)
        const tsEnd = parseInt((new Date().getTime())/1000)
        return (
            <>
                <CommonActionButton />
                <WebView source={{ uri: appStore.startDate? `http://datav.aliyuncs.com/share/01e1c4f8db2235b28cc378c97557bd3b?roomid=${appStore.roomId}&tsStart=${appStore.startDate}&tsEnd=${appStore.endDate}`
                                                                :
                                                            `http://datav.aliyuncs.com/share/01e1c4f8db2235b28cc378c97557bd3b?roomid=${appStore.roomId}&tsStart=${tsStart}&tsEnd=${tsEnd}`
                }} />   
                <DropdownAlert ref={ref => this.dropdown = ref} />  
            </>
        )
    }
}