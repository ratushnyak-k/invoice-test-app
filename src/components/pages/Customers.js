import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'

import List from '../shared/List'
import EditButton from '../shared/buttons/EditButton'

@inject('mainStore')
@inject('modalStore')
@inject('customerStore')
@observer
class Customers extends React.Component {
  onAdd() {
    this.props.customerStore.setVariable('idOfEditCustomer', '')
    this.props.modalStore.toggleModal('isOpenCustomer', true)
  }


  onEdit(id) {
    this.props.customerStore.setVariable('idOfEditCustomer', id)
    this.props.modalStore.toggleModal('isOpenCustomer', true)
  }

  render() {
    return (
      <List
        title="Customers List"
        onTableAction={::this.onEdit}
        actionButton={EditButton}
        onAdd={::this.onAdd}
        entity="customers"
      />
    )
  }
}


export default Customers

