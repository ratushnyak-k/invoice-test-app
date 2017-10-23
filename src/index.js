import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { MuiThemeProvider } from 'material-ui'
import {
  browserHistory,
  Router,
} from 'react-router'

import routes from './routes'
import MainStore from './stores/MainStore'
import InvoiceStore from './stores/InvoiceStore'
import ModalStore from './stores/ModalStore'
import ProductStore from './stores/ProductStore'
import CustomerStore from './stores/CustomerStore'

import 'normalize.css'
import './styles/index.styl'

ReactDOM.render(
  <Provider
    mainStore={MainStore}
    invoiceStore={InvoiceStore}
    modalStore={ModalStore}
    productStore={ProductStore}
    customerStore={CustomerStore}
  >
    <MuiThemeProvider>
      <Router
        routes={routes}
        history={browserHistory}
      />
    </MuiThemeProvider>
  </Provider>, document.getElementById('root'));
