import React,{Component} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import TimerButton from './timerButton'
import FormSection from './form'


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
            <>
                <FormSection />
                <TimerButton
                timerCount={60}
                textStyle={{color: '#dc1466'}}
                /> 
            </>
            
        )
    }
}