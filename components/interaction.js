import React,{Component} from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview';
import { inject, observer } from 'mobx-react';
import CommonActionButton from './actionButton/actionButton'
import { retrieveData , wrappedFetch , clearData} from './request'

@inject('store')
@observer
export default class Interaction extends Component {
    constructor(props){
        super(props);
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
            }
        )
    }
    
    render() {
        const { appStore } = this.props.store;
        return (
            <>
                <CommonActionButton />
                <WebView source={{ uri: appStore.startDate? `http://datav.aliyuncs.com/share/79702443f27bacaf626d743b0de3638e?roomId=${appStore.roomId}&tsStart=${appStore.startDate}&tsEnd=${appStore.endDate}`
                                                                :
                                                            `http://datav.aliyuncs.com/share/79702443f27bacaf626d743b0de3638e?roomId=${appStore.roomId}`
                }} />    
            </>
        )
    }
}