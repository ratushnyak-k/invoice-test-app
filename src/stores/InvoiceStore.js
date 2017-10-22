import {
  observable,
  action,
  useStrict,
  computed,
} from 'mobx'
import { ApiRoutes } from '../utils/Constants'
import API from '../utils/API'
import Logger from '../utils/Logger'
import MainStore from './MainStore'
import InvoiceItem from '../models/InvoiceItem'


useStrict(true)

export class InvoiceStore {

  @observable currentInvoiceId
  @observable currentCustomerId
  @observable currentDiscount = 0

  @action.bound
  async fetchInvoicesDetail(id) {
    try {
      const response = await API.getData(ApiRoutes.invoices.item(id))
      this.setVariable('currentCustomerId', response.data.customer_id)
      this.setVariable('currentDiscount', +response.data.discount)

    } catch (error) {
      Logger.error(error)
    }
  }

  @action.bound
  async addInvoice(data, cb) {
    try {
      const response = await API.postData(ApiRoutes.invoices.list, data)
      this.setVariable('currentInvoiceId', response.data.id)
      cb(response.data.id)
    } catch (error) {
      Logger.error(error)
    }
  }

  @action.bound
  async updateInvoice(id, data) {
    try {
      await API.putData(ApiRoutes.invoices.item(id), data)
    } catch (error) {
      Logger.error(error)
    }
  }

  @action.bound
  async updateInvoiceItem(invoiceId, itemId, data) {
    try {
      await API.putData(ApiRoutes.invoiceItems.item(invoiceId, itemId), data)
    } catch (error) {
      Logger.error(error)
    }
  }

  @action.bound
  async addProductToInvoice(id) {
    try {
      const response = await API.postData(ApiRoutes.invoiceItems.list(id))
      MainStore.pushDerivedData('invoiceItems', new InvoiceItem(response.data))
    } catch (error) {
      Logger.error(error)
    }
  }

  @action.bound
  async deleteProductFromInvoice(invoiceId, itemId) {
    try {
      await API.deleteData(ApiRoutes.invoiceItems.item(invoiceId, itemId))
      MainStore.removeData(itemId)
    } catch (error) {
      Logger.error(error)
    }
  }

  @action.bound
  onProductChange(itemId, productId) {
    MainStore.editData('invoiceItems', 'product_id', itemId, productId)
  }

  @action.bound
  onQuantityChange(itemId, quantity) {
    MainStore.data.invoiceItems.forEach((item) => {
      if (item.id === itemId) {
        item.quantity = quantity
      }
    })
  }

  @action.bound
  setVariable(key, data) {
    this[key] = data
  }

  @computed
  get total() {
    if (!MainStore.data.products.length) return 0
    let sum = 0

    MainStore.data.invoiceItems.forEach((item) => {
      let product = {}
      if (item.product_id) {
        product = MainStore.data.products.find((product) => {
          return product.id === item.product_id
        })
      } else {
        product.price = 0
      }
      sum += product.price * item.quantity
    })
    let sumWithDiscount = sum
    if (this.currentDiscount) {
      sumWithDiscount = sum - (sum * this.currentDiscount / 100)
    }
    return sumWithDiscount.toFixed(2)
  }
}

export default new InvoiceStore()

