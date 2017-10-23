import {
  observable,
  action,
  useStrict,
} from 'mobx'
import API from '../utils/API'
import Logger from '../utils/Logger'
import { ApiRoutes } from '../utils/Constants'
import { InvoiceItem } from '../models/InvoiceItem'


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
  async fetchInvoiceItems(id) {
    try {
      const response = await API.getData(ApiRoutes.invoiceItems.list(id))
      this.setDerivedData('invoiceItems', response.data.map((item) => {
        return new InvoiceItem(item)
      }))

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
  editObject(entity, id, data) {
    this.data[entity] = this.data[entity].map((item) => {
      if(item.id === id) {
        return data
      } else {
        return item
      }
    })
  }

  @action.bound
  pushDerivedData(key, data) {
    this.data[key].push(data)
  }
}

export default new MainStore()

