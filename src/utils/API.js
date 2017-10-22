import * as axios from 'axios'

import { ApiRoutes } from './Constants'

axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.baseURL = ApiRoutes.baseURL

class API {
  static getData(url, params) {
    return axios({
      method: 'GET',
      url,
      params,
    })
  };

  static postData(url, data) {
    return axios({
      method: 'POST',
      url,
      data,
    })
  };

  static patchData(url, data) {
    return axios({
      method: 'PATCH',
      url,
      data,
    })
  };

  static putData(url, data) {
    return axios({
      method: 'PUT',
      url,
      data,
    })
  };

  static deleteData(url, data) {
    return axios({
      method: 'DELETE',
      url,
      data,
    })
  };
}


export default API
