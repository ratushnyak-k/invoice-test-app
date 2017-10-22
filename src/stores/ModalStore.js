import {
  observable,
  action,
  useStrict,
} from 'mobx'


useStrict(true)

export class ModalStore {

  @observable isOpenCustomer = false
  @observable isOpenProduct = false

  @action.bound
  toggleModal(key, bool) {
    this[key] = bool
  }

}

export default new ModalStore()

