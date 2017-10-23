import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  AppBar,
  BottomNavigation,
  BottomNavigationItem,
  FlatButton,
  Paper,
} from 'material-ui'

import Invoice from 'material-ui/svg-icons/editor/attach-money'
import Products from 'material-ui/svg-icons/action/shopping-cart'
import Customers from 'material-ui/svg-icons/social/group'
import { routeURLs } from '../utils/Constants'
import ModalWrapper from './shared/ModalWrapper'
import CreateProductForm from './shared/forms/CreateProductForm'
import CreateCustomerForm from './shared/forms/CreateCustomerForm'

@inject('modalStore')
@inject('customerStore')
@inject('productStore')
@observer
class App extends React.Component {
  constructor() {
    super()
    const {invoices, customers, products, about} = routeURLs
    this.navConfig = [invoices.link, customers.link, products.link]
    this.navigateToInvoices = this.navigateTo.bind(this, invoices.link)
    this.navigateToCustomers = this.navigateTo.bind(this, customers.link)
    this.navigateToProducts = this.navigateTo.bind(this, products.link)
    this.navigateToAbout = this.navigateTo.bind(this, about.link)
  }

  navigateTo(route) {
    this.props.router.push(route)
  }

  render() {
    const {pathname} = this.props.router.getCurrentLocation()
    return (
      <div className="container">
        <AppBar
          title="Invoices Test App"
          showMenuIconButton={false}
          iconElementRight={<FlatButton
            label="About the project"
            onClick={this.navigateToAbout}
          />}
        />
        <div className="content">{this.props.children}</div>
        <ModalWrapper
          open={this.props.modalStore.isOpenProduct}
          title="Create Product"
          onClose={this.props.modalStore.toggleModal.bind(this, 'isOpenProduct', false)}
        >
          <CreateProductForm data={this.props.productStore.editableProductObject}/>
        </ModalWrapper>
        <ModalWrapper
          open={this.props.modalStore.isOpenCustomer}
          title="Create Customer"
          onClose={this.props.modalStore.toggleModal.bind(this, 'isOpenCustomer', false)}>
          <CreateCustomerForm data={this.props.customerStore.editableCustomerObject}/>
        </ModalWrapper>
        <Paper>
          <BottomNavigation selectedIndex={this.navConfig.indexOf(pathname)}>
            <BottomNavigationItem
              label="Invoices"
              icon={<Invoice />}
              onClick={this.navigateToInvoices}
            />
            <BottomNavigationItem
              label="Customers"
              icon={<Customers />}
              onClick={this.navigateToCustomers}
            />
            <BottomNavigationItem
              label="Products"
              icon={<Products />}
              onClick={this.navigateToProducts}
            />
          </BottomNavigation>
        </Paper>
      </div>
    )
  }
}

export default App
