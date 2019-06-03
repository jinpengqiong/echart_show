import { observable, action } from 'mobx';


class AppStore {
  @observable form = { phone: '18113062680'};


  @action
  handleFormChange(value) {
    this.form = value;
  }
}

export default new AppStore()