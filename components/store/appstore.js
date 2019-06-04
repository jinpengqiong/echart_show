import { observable, action } from 'mobx';


class AppStore {
  @observable form = { };
  @observable chartRooms = null;
  @observable token = null;
  @observable userId = '';
  @observable url1 = 'http://datav.aliyuncs.com/share/d081065571c55c57a5916b1efe181579';
  @observable url2 = 'http://datav.aliyuncs.com/share/79702443f27bacaf626d743b0de3638e';
  @observable url3 = 'http://datav.aliyuncs.com/share/01e1c4f8db2235b28cc378c97557bd3b';


  @action
  handleFormChange(value) {
    this.form = value;
  }

  @action
  getChartRoom(value) {
    this.chartRooms = value;
  }

  @action
  getToken(value) {
    this.token = value;
  }

  @action
  getUserId(value) {
    this.userId = value;
  }

  @action
  changeUrl(urlType, key, value){
    switch(urlType){
        case 'url1':
            this.url1 = this.url1.indexOf('?') === -1? `${this.url1}?${key}=${value}` 
            : `${this.url1}&${key}=${value}`
            break;
        case 'url2':
            this.url2 = this.url2.indexOf('?') === -1? `${this.url2}?${key}=${value}` 
            : `${this.url2}&${key}=${value}`
            break;
        case 'url3':
            this.url3 = this.url3.indexOf('?') === -1? `${this.url3}?${key}=${value}` 
            : `${this.url3}&${key}=${value}`
            break;
        default:
            break;
    }
  }
}

export default new AppStore()