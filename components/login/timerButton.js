import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { wrappedFetch } from '../request'
import { inject, observer } from 'mobx-react';
import { HOST } from '../constant' 

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

@inject('store')
@observer
export default  class TimerButton extends Component {

    constructor(props) {
        super(props)
        this.store = this.props.store.appStore
        this.state = {
            timerCount: this.props.timerCount || 60,
            timerTitle: this.props.timerTitle || '获取验证码',
            counting: false,
            selfEnable: true,
        };
        this.shouldStartCountting = this.shouldStartCountting.bind(this)
        this.countDownAction = this.countDownAction.bind(this)
    }
    countDownAction() {
        const codeTime = this.state.timerCount;
        this.interval = setInterval(() => {
            const timer = this.state.timerCount - 1
            if (timer === 0) {
                this.interval && clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: this.props.timerTitle || '获取验证码',
                    counting: false,
                    selfEnable: true
                })
            } else {
                this.setState({
                    timerCount: timer,
                    timerTitle: `重新获取(${timer}s)`,
                })
            }
        }, 1000)
    }

    shouldStartCountting(shouldStart) {
        if (this.state.counting) {
            return
        }
        if (shouldStart) {
            this.countDownAction()
            this.setState({counting: true, selfEnable: false})
        } else {
            this.setState({selfEnable: true})
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    sendCheckCode = () => {
        const { appStore } = this.props.store;
        if(appStore.form && appStore.form.phone === ''){
            return
        }
        const url = `${HOST}/smsCode`
        const query = {
                    phone: appStore.form.phone,
                    }
        wrappedFetch(url, 'post', query).then(
            res => {
                console.log('code',res)
            }
        )
    }

    render() {
        const {onClick, style, textStyle, disableColor} = this.props;
        const {counting, timerTitle, selfEnable} = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={counting ? 1 : 0.8} onPress={() => {
                    if (!counting &&selfEnable) {
                        this.setState({selfEnable: false});
                        this.shouldStartCountting(true);
                        this.sendCheckCode()
                    };
                }}>
                    <View
                        style={styles.styleCodeView}>
                        <Text
                            style={[{fontSize: 12}, textStyle, {color: ((!counting && selfEnable) ? textStyle.color : disableColor || 'gray')}]}>{timerTitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '70%',
        right: 10
    },
    styleCodeView: {
        height: 28,
        width: screenWidth*0.32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleTextCode: {
        fontSize: 12,
        color: '#dc1466',
        textAlign: 'center',
    },

});