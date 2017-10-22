import {
  observable,
  action,
  useStrict,
} from 'mobx'
import API from '../utils/API'
import Logger from '../utils/Logger'
import { ApiRoutes } from '../utils/Constants'


useStrict(true)

export class MainStore {

  @observable data = {
    invoices: [],
    customers: [],
    products: [],
    invoiceItems: [],
  }

  @action.bound
  async fetchList(entity, id) {
    try {
      const {list} = ApiRoutes[entity]
      const url = id ? list(id) : list
      const response = await API.getData(url)
      this.setDerivedData(entity, response.data)

    } catch (error) {
      Logger.error(error)
    }
  }

  @action.bound
  setDerivedData(key, data) {
    this.data[key] = data
  }

  @action.bound
  removeData(id) {
    const toDelete = new Set([id]);
    this.data.invoiceItems = this.data.invoiceItems.filter(obj => !toDelete.has(obj.id))
  }

  @action.bound
  editData(entity, key,  id, data) {
    const editableData = this.data[entity].find((item) => item.id === id)
    editableData[key] = data
  }

  @action.bound
  pushDerivedData(key, data) {
    this.data[key].push(data)
  }
}

export default new MainStore()

