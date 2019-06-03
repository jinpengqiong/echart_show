import React,{Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import { retrieveData , wrappedFetch , clearData} from './request'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react';

const styles = StyleSheet.create({
    
  })

  @inject('store')
  @observer
  export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            token:'1111'
        }
    }
    componentDidMount(){
        const token = retrieveData('token')
        this.setState({
            token
        })
        if(!token){
            Actions.login()
        }
    }
    
    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.props.store.appStore.form)}</Text>
                {/* <WebView source={{ uri: 'http://datav.aliyuncs.com/share/d081065571c55c57a5916b1efe181579' }} /> */}
            </View>
            
        )
    }
}