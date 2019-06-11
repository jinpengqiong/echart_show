import React,{Component} from 'react'
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import Picker from 'react-native-picker';
import { View, Text, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { clearData } from '../request'

@inject('store')
@observer
export default class CommonActionButton extends Component {  
  constructor(props){
    super(props)
    this.state = {
        currentDate:this._getCurrentDate(),
    }
  }

  selectChartRoom = () => {
    const { appStore } = this.props.store;
    Picker.init({
        pickerData: appStore.formatRoomsData? appStore.formatRoomsData.toJS() : [],
        selectedValue: [1],
        onPickerConfirm: data => {
            console.log(data);
            appStore.getRoomId(data)
            appStore.showMessage('success','设置成功')
        },
        onPickerCancel: data => {
            console.log(data);
        },
        onPickerSelect: data => {
            console.log(data);
        },
        pickerConfirmBtnText:'确认',
        pickerCancelBtnText:'取消',
        pickerTitleText:'请选择'
    });
    Picker.show();
}

selectTimeRange = () => {
    const { appStore } = this.props.store;
    var year = ''
    var month = ''
    var day = ''
    var dateStr = this.state.currentDate
    //console.log('dateStr',dateStr)
    year = dateStr.substring(0,4)
    month = parseInt(dateStr.substring(5,7))
    day = parseInt(dateStr.substring(8,10))
    Picker.init({
    pickerTitleText:'选择开始时间',
    pickerCancelBtnText:'取消',
    pickerConfirmBtnText:'确定',
    selectedValue:[year+'年',month+'月',day+'日'],
    pickerBg:[255,255,255,1],
    pickerData: this._createDateData(),
    pickerFontColor: [33, 33 ,33, 1],
    onPickerConfirm: (pickedValue, pickedIndex) => {
        var year = pickedValue[0].substring(0,pickedValue[0].length-1)
        var month = pickedValue[1].substring(0,pickedValue[1].length-1)
        month = month.padStart(2,'0')
        var day = pickedValue[2].substring(0,pickedValue[2].length-1)
        day = day.padStart(2,'0')
        let str = year+'-'+month+'-'+day
        this.setState({
            currentDate:str,
        })
        appStore.getStartDate(str)
        appStore.getCurrentDate()
        appStore.showMessage('success','设置成功')
    },
    onPickerCancel: (pickedValue, pickedIndex) => {
        console.log('date', pickedValue, pickedIndex);
    },
    onPickerSelect: (pickedValue, pickedIndex) => {
        console.log('date', pickedValue, pickedIndex);
    }
    });
    Picker.show();
}

_getCurrentDate(){
    var currDate = new Date()
    var year = currDate.getFullYear()
    var month = (currDate.getMonth()+1).toString()
    month = month.padStart(2,'0')
    var dateDay = currDate.getDate().toString()
    dateDay = dateDay.padStart(2,'0')
    let time = year+'-'+month+'-'+dateDay
    return time;
  }
  //组装日期数据
  _createDateData(){
    let date = [];
    var currDate = new Date()
    var year = currDate.getFullYear()
    var month = currDate.getMonth()+1
    for(let i=1970;i<=year;i++){
        let month = [];
        for(let j = 1;j<13;j++){
            let day = [];
            if(j === 2){
                for(let k=1;k<29;k++){
                    day.push(k+'日');
                }
                //Leap day for years that are divisible by 4, such as 2000, 2004
                if(i%4 === 0){
                    day.push(29+'日');
                }
            }
            else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                for(let k=1;k<32;k++){
                    day.push(k+'日');
                }
            }
            else{
                for(let k=1;k<31;k++){
                    day.push(k+'日');
                }
            }
            let _month = {};
            _month[j+'月'] = day;
            month.push(_month);
        }
        let _date = {};
        _date[i+'年'] = month;
        date.push(_date);
    }
    return date;
  }

  logout = () => {
    clearData()
    Actions.login()
  }

  render () {
    return (
      <ActionButton 
          style={styles.aButton}
          position='right'
          offsetY={80}
          renderIcon={() => <Icon name="align-justify" size={30} color="#0079FF" />}
          buttonColor="#ccc">
              <ActionButton.Item buttonColor='#9b59b6' title="直播间" onPress={this.selectChartRoom}>
                  <Icon name="comments"  style={styles.actionButtonIcon}/>
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="时间范围" onPress={this.selectTimeRange}>
                  <Icon name="history"  style={styles.actionButtonIcon}/>
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#1abc9c' title="退出登录" onPress={this.logout}>
                  <Icon name="reply"  style={styles.actionButtonIcon}/>
              </ActionButton.Item>
      </ActionButton>
    )
  }
}

const styles = StyleSheet.create({
  actionButtonIcon:{
      fontSize: 20,
      height: 22,
      color: 'white',
  },
  aButton:{
      position:'absolute',
      top:100,
      zIndex:1000
  }
})