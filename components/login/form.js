import React,{Component} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import { HOST } from '../constant' 
import { storeData, wrappedFetch } from '../request'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react';

const styles = StyleSheet.create({
        myButton:{
            width:100
        }
  })

@inject('store')
@observer
export default class FormSection extends Component {
    constructor(props){
        super(props)
        this.state = {
            // form: {
            //     phone: '',
            //     checkCode: ''
            //   }
        }
    }
    componentDidMount(){
     
    }

    handleValueChange = values => {
        console.log('handleValueChange', values)
        const { appStore } = this.props.store;
        // this.setState({ form: values })
        appStore.handleFormChange(values)
    }

    handleSubmit = () => {
        const { appStore } = this.props.store;
        const url = `${HOST}/auth/smsLogin`
        const query = {
                        phone: appStore.form.phone,
                        code: appStore.form.checkCode,
                    }
        wrappedFetch(url, 'post', query).then(
            res => {
              console.log('res',res)
              appStore.getToken(res.sessionToken)
              appStore.getUserId(res.userID)
              storeData('token', res.sessionToken)
              Actions.app()
            }
          ).catch(err => console.log(err))
    }
    
    render() {
        return (
            <GiftedForm
                formStyles={{
                    containerView: {
                    backgroundColor: '#F5FCFF'
                    }
                }}
                formName='smsLogin' // GiftedForm instances that use the same name will also share the same states
                clearOnClose={false} // delete the values of the form when unmounted
                onValueChange={this.handleValueChange}
                defaults={{
                phone: '',
                checkCode: ''
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
                checkCode: {
                    title: 'checkCode',
                    validate: [{
                    validator: 'isLength',
                    arguments: [6, 16],
                    message: '请输入正确的验证码'
                    }]
                    }
                }}
            >
                <GiftedForm.TextInputWidget
                    name='phone'
                    title='手机号'
                    placeholder=''
                    clearButtonMode='while-editing'
                />
                <GiftedForm.TextInputWidget
                    name='checkCode' // mandatory
                    title='验证码'
                    placeholder=''
                    clearButtonMode='while-editing'
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
                            GiftedFormManager.reset('smsLogin');
                        }
                    }}
                />
        </GiftedForm>
        )
    }
}