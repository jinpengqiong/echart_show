import React,{Component} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import TimerButton from './timerButton'



const styles = StyleSheet.create({
    
  })
var screenWidth = Dimensions.get('window').width;

export default class LoginBySms extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    componentDidMount(){
     
    }
    
    render() {
        return (
            <TimerButton
            // style={{width: screenWidth*0.2,marginRight: 10}}
            timerCount={60}
            textStyle={{color: '#dc1466'}}
            /> 
        )
    }
}