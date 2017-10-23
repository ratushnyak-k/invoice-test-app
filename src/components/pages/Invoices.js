import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'

import List from '../shared/List'
import EditButton from '../shared/buttons/EditButton'
import { routeURLs } from '../../utils/Constants'

const entity = 'invoices'
@inject('invoiceStore')
@observer
class Invoices extends React.Component {
  onAdd() {
    const {router, invoiceStore} = this.props

    const redirectToInvoice = () => {
      return function (id) {
        router.push(routeURLs.invoiceCreate.link(id))
      }
    }

    invoiceStore.addInvoice({}, redirectToInvoice())
  }

  onEdit(id) {
    this.props.router.push(routeURLs.invoiceCreate.link(id))
  }

  render() {
    return (
      <List
        title="Invoices List"
        actionButton={EditButton}
        onTableAction={::this.onEdit}
        onAdd={::this.onAdd}
        entity={entity}
      />
    )
  }
}


export default Invoices

