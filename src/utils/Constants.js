const baseUrls = {
  development: 'http://localhost:8000/',
  production: 'http://localhost:8000/',
}

const baseServerURLs = () => {
  switch (process.env.REACT_APP_BUILD_MODE) {
    case 'production':
      return baseUrls.production
    default: /* development */
      return baseUrls.development
  }
}

export const ApiRoutes = {
  baseURL: `${baseServerURLs()}api/`,
  invoices: {
    list: '/invoices',
    item: (id) => `/invoices/${id}`,
  },
  products: {
    list: '/products',
    item: (id) => `/products/${id}`,
  },
  customers: {
    list: '/customers',
    item: (id) => `/customers/${id}`,
  },
  invoiceItems: {
    list: (id) => `/invoices/${id}/items`,
    item: (invoiceId, id) => `/invoices/${invoiceId}/items/${id}`,
  },
}

export const routeURLs = {
  invoices: {
    link: '/',
    route: '/',
  },
  invoiceCreate: {
    link: (id) => `/invoice/${id}`,
    route: 'invoice/:id',
  },
  products: {
    link: '/products',
    route: 'products',
  },
  customers: {
    link: '/customers',
    route: 'customers',
  },
  error: {
    link: '/404',
    route: '404',
  },
}

export const tablesConfig = {
  invoices: [
    {
      title: 'Invoice ID',
      key: 'id',
    },
    {
      title: 'Date created',
      type: 'date',
      key: 'createdAt',
    },
    {
      title: 'Date updated',
      type: 'date',
      key: 'updatedAt',
    },
    {
      title: 'Actions',
      type: 'action',
    },
  ],
  invoiceItems: [
    {
      title: 'Product',
      type: 'select',
      key: 'id',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      type: 'input',
    },
    {
      title: 'Price ($)',
      key: 'price',
      type: 'price',
    },
    {
      title: 'Actions',
      type: 'action',
    },
  ],
  customers: [
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Address',
      key: 'address',
    },
    {
      title: 'Phone Number',
      key: 'phone',
    },
    {
      title: 'Actions',
      type: 'action',
    },
  ],
  products: [
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Price ($)',
      key: 'price',
    },
    {
      title: 'Actions',
      type: 'action',
    },
  ],
}

export const discounts = [
  {
    id: 5,
    name: '5%',
  },
  {
    id: 10,
    name: '10%',
  },
  {
    id: 15,
    name: '15%',
  },
]

export const validationErrorMessages = {
  required: 'This field may not be blank.',
  min: 'Price can\'t be negative',
}