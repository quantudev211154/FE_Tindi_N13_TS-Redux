import axios, { AxiosInstance } from 'axios'
import { HOST } from '../../constants/APIConstant'

class Http {
  private instance: AxiosInstance
  private abortController: AbortController

  constructor() {
    this.instance = axios.create({
      baseURL: HOST,
      timeout: 180000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    this.abortController = new AbortController()
  }

  getInstance = () => {
    return this.instance
  }

  getSignal = () => this.abortController.signal

  abortRequest = () => {
    this.abortController.abort()
  }
}

export const HttpClass = new Http()

const http = HttpClass.getInstance()

export default http
