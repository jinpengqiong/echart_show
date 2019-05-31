import React,{Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import { retrieveData , wrappedFetch } from './request'
import { Actions } from 'react-native-router-flux'


const styles = StyleSheet.create({
    
  })

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        let token = retrieveData('token')
        if(token){
            Actions.login()
        }
    }
    
    render() {
        return (
            <WebView source={{ uri: 'http://datav.aliyuncs.com/share/d081065571c55c57a5916b1efe181579' }} />
        )
    }
}