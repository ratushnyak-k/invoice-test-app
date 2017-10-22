import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import { string } from 'prop-types'

import List from '../shared/List'
import EditButton from '../shared/buttons/EditButton'
import { routeURLs } from '../../utils/Constants'

@inject('mainStore')
@inject('modalStore')
@observer
class Products extends React.Component {
  onAdd() {
    this.props.modalStore.toggleModal('isOpenProduct', true)
  }

  onEdit() {

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

