import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'

import Select from '../shared/formComponents/Select'
import List from '../shared/List'
import DeleteButton from '../shared/buttons/DeleteButton'
import AddButton from '../shared/buttons/AddButton'
import {
  discounts,
  routeURLs,
} from '../../utils/Constants'

@inject('mainStore')
@inject('invoiceStore')
@inject('modalStore')
@inject('customerStore')
@inject('productStore')
@observer
class InvoiceCreate extends React.Component {
  componentWillMount() {
    this.invoiceId = this.props.router.params.id
  }

  componentDidMount() {
    this.props.invoiceStore.fetchInvoicesDetail(this.invoiceId).then(res => {
        if (res && res.error) {
          this.props.router.replace(routeURLs.error.link)
        }
      }
    )
    this.props.mainStore.fetchList('customers')
    this.props.mainStore.fetchList('products')
  }

  onCustomerChange(customer_id) {
    this.props.invoiceStore.setVariable('currentCustomerId', customer_id)
    this.props.invoiceStore.updateInvoice(this.invoiceId, {customer_id})
  }

  onDiscountChange(discount) {
    this.props.invoiceStore.setVariable('currentDiscount', discount)
    this.props.invoiceStore.updateInvoice(this.invoiceId, {discount})
  }

  onProductChange(itemId, product_id) {
    this.props.invoiceStore.onProductChange(itemId, product_id)
    this.props.invoiceStore.updateInvoiceItem(this.invoiceId, itemId, {product_id})
  }

  onQuantityChange(itemId, quantity) {
    this.props.invoiceStore.onQuantityChange(itemId, quantity)
    this.props.invoiceStore.updateInvoiceItem(this.invoiceId, itemId, {quantity})
  }

  addProduct() {
    this.props.invoiceStore.addProductToInvoice(this.invoiceId)
  }

  onDelete(itemId) {
    this.props.invoiceStore.deleteProductFromInvoice(this.invoiceId, itemId)
  }

  createCustomer() {
    this.props.customerStore.setVariable('idOfEditCustomer', '')
    this.props.modalStore.toggleModal('isOpenCustomer', true)
  }

  createProduct() {
    this.props.productStore.setVariable('idOfEditProduct', '')
    this.props.modalStore.toggleModal('isOpenProduct', true)
  }

  render() {
    return (
      <div>
        <h2>Create Invoice</h2>
        <div>
          <h4 className="select-label">Customer:</h4>
          <Select
            defaultOptionName="Choose the customer"
            dropDownItems={this.props.mainStore.data.customers}
            action={::this.createCustomer}
            actionTitle="Add new customer"
            onChange={::this.onCustomerChange}
            value={this.props.invoiceStore.currentCustomerId}
          />
        </div>
        <List
          title="Products:"
          onTableAction={::this.onDelete}
          actionButton={DeleteButton}
          entity="invoiceItems"
          param={this.invoiceId}

          counterData={{
            idKey: 'quantity',
            onChange: this.onQuantityChange.bind(this),
          }}

          selectData={{
            defaultOptionName: 'Choose the product',
            idKey: 'product_id',
            options: this.props.mainStore.data.products,
            action: this.createProduct.bind(this),
            actionTitle: 'Add new product',
            onChange: this.onProductChange.bind(this),
          }}

          relatedKey="product_id"
        />
        <div className="action-wrap">
          <AddButton
            title="Product"
            onAdd={::this.addProduct}
          />
          <div>
            <h4 className="select-label">Discount:</h4>
            <Select
              defaultOptionName="Choose the discount"
              dropDownItems={discounts}
              onChange={::this.onDiscountChange}
              value={this.props.invoiceStore.currentDiscount}
            />
          </div>
        </div>
        <div className="total-wrap"><h4>Total: {this.props.invoiceStore.total}$</h4></div>
      </div>
    )
  }
}

export default InvoiceCreate
