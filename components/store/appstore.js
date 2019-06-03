import { observable, action } from 'mobx';


class AppStore {
  @observable form = { };


  @action
  handleFormChange(value) {
    this.form = value;
  }
}

export default new AppStore()