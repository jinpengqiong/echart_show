import { observable, action } from 'mobx';


class AppStore {
  @observable form = null;
  @observable originalRoomsData = null;
  @observable formatRoomsData = null;
  @observable token = null;
  @observable userId = '';
  @observable roomId = -1;
  @observable startDate = null;
  @observable endDate = null;
  @observable messageRef = null;
  @observable testData = null;
  


  @action
  getTestdata(value) {
    this.testData = value;
  }

  @action
  handleFormChange(value) {
    this.form = value;
  }

  @action
  getMessageRef(ref) {
    this.messageRef = ref;
  }

  @action
  showMessage(type, info) {
    this.messageRef.alertWithType(type, info, '');;
  }

  @action
  getRoomId(name) {
    if(this.originalRoomsData){
        const obj = this.originalRoomsData.filter(item => item.name === name[0])
        this.roomId = (obj[0].id + 1982)*168
    }else{
        this.roomId = -1
    }
  }

  @action
  initRoomId(data) {
    this.roomId = (data[0].id + 1982)*168
  }

  @action
  getStartDate(value) {
    this.startDate = parseInt(new Date(value).getTime()/1000);
  }

  @action
  getCurrentDate() {
    this.endDate = parseInt(new Date().getTime()/1000)
  }

  @action
  getOriginalRoomsData(value) {
    this.originalRoomsData = value;
  }

  @action
  getFormatRoomsData(value) {
    this.formatRoomsData = value;
  }

  @action
  getToken(value) {
    this.token = value;
  }

  @action
  getUserId(value) {
    this.userId = value;
  }
}

export default new AppStore()