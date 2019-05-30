import React,{Component} from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview';


export default class Interaction extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    
    render() {
        return (
            <WebView source={{ uri: 'http://datav.aliyuncs.com/share/79702443f27bacaf626d743b0de3638e' }} />
        )
    }
}