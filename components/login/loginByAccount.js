import React,{Component} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import { HOST } from '../constant' 
import { storeData, wrappedFetch } from '../request'
import { Actions } from 'react-native-router-flux'


const styles = StyleSheet.create({
        myButton:{
            width:100,
            // position:absolute,
            // top:100
        }
  })

export default class LoginByAccount extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                phone: '',
                password: ''
              }
        }
    }
    componentDidMount(){
     
    }

    handleValueChange = values => {
        console.log('handleValueChange', values)
        this.setState({ form: values })
    }

    handleSubmit = () => {
        const url = `${HOST}/auth/loginv2`
        const query = {
                      account: this.state.form.phone,
                      password: this.state.form.password,
                    }
        wrappedFetch(url, 'post', query).then(
            res => {
              console.log('res',res)
              storeData('token', res.data.sessionToken)
              Actions.app()
            }
          )
    }
    
    render() {
        return (
            <GiftedForm
                formStyles={{
                    containerView: {
                    backgroundColor: '#F5FCFF'
                    }
                }}
                formName='account' // GiftedForm instances that use the same name will also share the same states
                clearOnClose={false} // delete the values of the form when unmounted
                onValueChange={this.handleValueChange}
                defaults={{
                phone: '',
                password: ''
                }}
                validators={{
                phone: {
                    title: 'phone',
                    validate: [{
                    validator: 'isLength',
                    arguments: [3, 11],
                    message: '请输入正确的手机号'
                    },{
                    validator: 'matches',
                    arguments: /^1[34578]\d{9}$/,
                    message: '请输入正确的手机号'
                    }]
                },
                password: {
                    title: 'Password',
                    validate: [{
                    validator: 'isLength',
                    arguments: [6, 16],
                    message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                    }]
                    }
                }}
            >
                <GiftedForm.TextInputWidget
                    name='phone'
                    title='手机号'
                    placeholder='手机号'
                    clearButtonMode='while-editing'
                />
                <GiftedForm.TextInputWidget
                    name='password' // mandatory
                    title='密码'
                    placeholder='密码'
                    clearButtonMode='while-editing'
                    secureTextEntry={true}
                />
                <GiftedForm.SubmitWidget
                    title='登录'
                    widgetStyles={{
                        submitButton: {
                        backgroundColor: '#48B6AC',
                        borderRadius: 100
                        }
                    }}
                    onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                        if (isValid === true) {
                            this.handleSubmit().then(
                                res => {
                                    postSubmit()
                                    GiftedFormManager.reset('account');
                                    // storeData('token', res.data.sessionToken)
                                }
                            ) 
                        }
                    }}
                />
        </GiftedForm>
        )
    }
}