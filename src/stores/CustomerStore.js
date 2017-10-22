import {
  observable,
  action,
  useStrict,
} from 'mobx'
import API from '../utils/API'
import { ApiRoutes } from '../utils/Constants'
import MainStore from './MainStore'
import Logger from '../utils/Logger'


useStrict(true)

export class CustomerStore {

  @action.bound
  async addCustomer(data) {
    try {
      const response = await API.postData(ApiRoutes.customers.list, data)
      MainStore.pushDerivedData('customers', response.data)

    } catch (error) {
      Logger.error(error)
    }
  }
}

export default new CustomerStore()

