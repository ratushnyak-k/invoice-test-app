import {
  observable,
  action,
  useStrict,
} from 'mobx'


useStrict(true)

export class InvoiceItem {
  @observable createdAt
  @observable id
  @observable invoice_id
  @observable product_id
  @observable quantity
  @observable updatedAt
  constructor(data) {
    this.createdAt = data.createdAt
    this.id = data.id
    this.invoice_id = data.invoice_id
    this.product_id = data.product_id
    this.quantity = data.quantity || 0
    this.updatedAt = data.updatedAt
  }

  @action
  update(key, data) {
    this[key] = data
  }
}

export default InvoiceItem

