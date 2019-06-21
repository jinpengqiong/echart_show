import React,{Component} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import { HOST } from '../constant' 
import { storeData } from '../request'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react';

const styles = StyleSheet.create({
        myButton:{
            width:100,
            // position:absolute,
            // top:100
        }
  })
@inject('store')
@observer
export default class LoginByAccount extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                account: '',
                password: ''
              }
        }
    }
    componentDidMount(){
    }

    handleValueChange = values => {
        this.setState({ form: values })
    }

    handleSubmit = () => {
        const { appStore } = this.props.store;
        const { form } = this.state
        const url = `${HOST}/auth/loginv2`
        const query = form
          fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                body: JSON.stringify(query)
            })
            .then((response) => response.json())
            .then(
                res => {
                if(res.error_code){
                    appStore.showMessage('error', res.local_message)
                    return
                }
                appStore.getToken(res.sessionToken)
                appStore.getUserId(res.userID)
                storeData('token', res.sessionToken)
                storeData('userId', JSON.stringify(res.userID))
                GiftedFormManager.reset('account');
                Actions.app()
                appStore.showMessage('success','登录成功')
            }).catch(error => appStore.showMessage('error','登录失败，请重试'))
    }
    
    render() {
        const { appStore } = this.props.store;
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
                    account: '',
                    password: ''
                    }}
                    validators={{
                    account: {
                        title: 'account',
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
                        title: 'password',
                        validate: [{
                        validator: 'isLength',
                        arguments: [6, 16],
                        message: '请输入正确的密码'
                        }]
                        }
                    }}
                >
                    <GiftedForm.TextInputWidget
                        name='account'
                        title='手机号'
                        placeholder=''
                        clearButtonMode='while-editing'
                    />
                    <GiftedForm.TextInputWidget
                        name='password' // mandatory
                        title='密码'
                        placeholder=''
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
                                this.handleSubmit()
                                postSubmit()
                                // GiftedFormManager.reset('account');
                            }else{
                                appStore.showMessage('error','请输入必选项再登录')
                            }
                        }}
                    />
                </GiftedForm>  
        )
    }
}