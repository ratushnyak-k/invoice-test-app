import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'

import List from '../shared/List'
import EditButton from '../shared/buttons/EditButton'

@inject('mainStore')
@inject('modalStore')
@inject('productStore')
@observer
class Products extends React.Component {
  onAdd() {
    this.props.productStore.setVariable('idOfEditProduct', '')
    this.props.modalStore.toggleModal('isOpenProduct', true)
  }

  onEdit(id) {
    this.props.productStore.setVariable('idOfEditProduct', id)
    this.props.modalStore.toggleModal('isOpenProduct', true)
  }
  render() {
    return (
      <List
        title="Products list"
        onTableAction={::this.onEdit}
        actionButton={EditButton}
        onAdd={::this.onAdd}
        entity="products"
      />
    )
  }
}


export default Products

