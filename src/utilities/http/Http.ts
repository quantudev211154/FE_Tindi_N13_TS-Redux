import axios, { AxiosInstance } from 'axios'
import { HOST } from '../../constants/APIConstant'

class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: HOST,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }
}

const http = new Http().instance

export default http
