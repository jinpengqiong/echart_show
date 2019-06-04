import React,{Component} from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';
import { inject, observer } from 'mobx-react';
import CommonActionButton from './actionButton/actionButton'

@inject('store')
@observer
export default class Fans extends Component {
    render() {
        const { appStore } = this.props.store;
        return (
            <>
                <CommonActionButton />
                <WebView source={{ uri: appStore.url3 }} />   
            </>
        )
    }
}