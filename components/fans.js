import React,{Component} from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

export default class Fans extends Component {
    render() {
        return (
            <WebView source={{ uri: 'http://datav.aliyuncs.com/share/01e1c4f8db2235b28cc378c97557bd3b' }} />
        )
    }
}