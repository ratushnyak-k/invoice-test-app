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

export class ProductStore {

  @action.bound
  async addProduct(data) {
    try {
      const response = await API.postData(ApiRoutes.products.list, data)
      MainStore.pushDerivedData('products', response.data)

    } catch (error) {
      Logger.error(error)
    }
  }

}

export default new ProductStore()

