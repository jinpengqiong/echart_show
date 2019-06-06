import React,{Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ScrollableTabView , { DefaultTabBar } from 'react-native-scrollable-tab-view';
import LoginByAccount from './loginByAccount'
import LoginBySms from './loginBySms'

const styles = StyleSheet.create({
    
})

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    componentDidMount(){
        
    }
    
    render() {
        return (
            <ScrollableTabView 
                locked={false}
                style={{ marginTop: '50%', position:'relative' }}
                initialPage={0}
                renderTabBar={() => <DefaultTabBar/>}>
                <LoginByAccount tabLabel="帐号登录" />
                <LoginBySms tabLabel="验证码登录" />
            </ScrollableTabView>            
        )
    }
}