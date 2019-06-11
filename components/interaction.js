import React,{Component} from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';
import { inject, observer } from 'mobx-react';
import CommonActionButton from './actionButton/actionButton'
import { retrieveData , wrappedFetch , clearData} from './request'
import DropdownAlert from 'react-native-dropdownalert';
@inject('store')
@observer
export default class Interaction extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        const { appStore } = this.props.store;
        appStore.getMessageRef(this.dropdown)
        appStore.getStartDate(null)
        retrieveData('token').then(
            res => {
                if(!res){
                    Actions.login()
                }
            }
        ).catch( err => Actions.login())
    }
    
    render() {
        const { appStore } = this.props.store;
        const tsStart = parseInt((new Date(new Date().toLocaleDateString()).getTime())/1000)
        const tsEnd = parseInt((new Date().getTime())/1000)
        return (
            <>
                {/* <View>
                    <Text>
                    { appStore.startDate? `http://datav.aliyuncs.com/share/79702443f27bacaf626d743b0de3638e?roomid=${appStore.roomId}&tsStart=${appStore.startDate}&tsEnd=${appStore.endDate}`
                                                                :
                                                            `http://datav.aliyuncs.com/share/79702443f27bacaf626d743b0de3638e?roomid=${appStore.roomId}&tsStart=${tsStart}&tsEnd=${tsEnd}`
                    }
                    </Text>
                </View> */}
                <CommonActionButton />
                <WebView source={{ uri: appStore.startDate? `http://datav.aliyuncs.com/share/79702443f27bacaf626d743b0de3638e?roomid=${appStore.roomId}&tsStart=${appStore.startDate}&tsEnd=${appStore.endDate}`
                                                                :
                                                            `http://datav.aliyuncs.com/share/79702443f27bacaf626d743b0de3638e?roomid=${appStore.roomId}&tsStart=${tsStart}&tsEnd=${tsEnd}`
                }} />   
                <DropdownAlert ref={ref => this.dropdown = ref} /> 
            </>
        )
    }
}