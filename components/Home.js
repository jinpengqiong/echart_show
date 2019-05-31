import React,{Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import * as Util from './request'

const styles = StyleSheet.create({
    
  })

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        // Util.wrappedFetch()
    }
    
    render() {
        return (
            <WebView source={{ uri: 'http://datav.aliyuncs.com/share/d081065571c55c57a5916b1efe181579' }} />
        )
    }
}