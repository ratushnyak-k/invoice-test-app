import React from 'react'
import {
  Route,
  IndexRoute,
  Redirect,
} from 'react-router'

import App from './components/App'
import Invoices from './components/pages/Invoices'
import InvoiceCreate from './components/pages/InvoiceCreate'
import Products from './components/pages/Products'
import Customers from './components/pages/Customers'
import About from './components/pages/About'
import ErrorPage from './components/pages/ErrorPage'
import {
  routeURLs,
} from './utils/Constants'


const routes = (
  <Route
    path={routeURLs.invoices.route}
    component={App}
  >
    <IndexRoute component={Invoices} />

    <Route
      path={routeURLs.invoiceCreate.route}
      component={InvoiceCreate}
    />

    <Route
      path={routeURLs.products.route}
      component={Products}
    />

    <Route
      path={routeURLs.customers.route}
      component={Customers}
    />

    <Route
      path={routeURLs.about.route}
      component={About}
    />

    <Route path={routeURLs.error.route} component={ErrorPage} />
    <Redirect from="*" to={routeURLs.error.link} />
  </Route>
)

export default routes
