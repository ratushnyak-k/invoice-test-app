import {
  observable,
  action,
  useStrict,
  computed,
} from 'mobx'
import API from '../utils/API'
import { ApiRoutes } from '../utils/Constants'
import MainStore from './MainStore'
import Logger from '../utils/Logger'


useStrict(true)

export class CustomerStore {

  @observable idOfEditCustomer

  @action.bound
  async addCustomer(data) {
    try {
      const response = await API.postData(ApiRoutes.customers.list, data)
      MainStore.pushDerivedData('customers', response.data)

    } catch (error) {
      Logger.error(error)
    }
  }

  @action.bound
  async updateCustomer(id, data) {
    try {
      const response = await API.putData(ApiRoutes.customers.item(id), data)
      MainStore.editObject('customers', id, response.data)

    } catch (error) {
      Logger.error(error)
    }
  }

  @action.bound
  setVariable(key, data) {
    this[key] = data
  }

  @computed
  get editableCustomerObject() {
    return MainStore.data.customers.find((item) => {
      return item.id === this.idOfEditCustomer
    }) || {}
  }
}


export default new CustomerStore()

