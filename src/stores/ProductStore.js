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

export class ProductStore {
  @observable idOfEditProduct
  @action.bound
  async addProduct(data) {
    try {
      const response = await API.postData(ApiRoutes.products.list, data)
      MainStore.pushDerivedData('products', response.data)

    } catch (error) {
      Logger.error(error)
    }
  }

  @action.bound
  async updateProduct(id, data) {
    try {
      const response = await API.putData(ApiRoutes.products.item(id), data)
      MainStore.editObject('products', id, response.data)

    } catch (error) {
      Logger.error(error)
    }
  }

  @action.bound
  setVariable(key, data) {
    this[key] = data
  }

  @computed
  get editableProductObject() {
    return MainStore.data.products.find((item) => {
      return item.id === this.idOfEditProduct
    }) || {}
  }
}

export default new ProductStore()

