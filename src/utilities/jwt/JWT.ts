import { ErrorOutlined } from '@mui/icons-material'
import axios from 'axios'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { API_GET_REFRESH_TOKEN } from '../../constants/APIConstant'
import {
  LOCAL_LOGOUT_EVENT_NAME,
  LOCAL_REFRESH_TOKEN_NAME,
} from '../../constants/AuthConstant'

class JWTManager {
  inMemoryToken: string | null
  refreshTokenTimeoutId: number | null
  userId: string | null

  constructor() {
    this.inMemoryToken = null
    this.refreshTokenTimeoutId = null
    this.userId = null

    window.addEventListener('storage', (event) => {
      if (event.key === LOCAL_LOGOUT_EVENT_NAME) this.inMemoryToken = null
    })

    axios.defaults.withCredentials = true
  }

  getToken = () => this.inMemoryToken

  getUserId = () => this.userId

  setToken = (accessToken: string) => {
    this.inMemoryToken = accessToken

    const decoded = jwtDecode<
      JwtPayload & { userId: string; phone: string; name: string }
    >(accessToken)
    this.userId = decoded.userId

    this.setRefreshTokenTimeout(
      (decoded.exp as number) - (decoded.iat as number)
    )

    this.pinBearerTokenToCommonHeader(accessToken)

    return true
  }

  getRefreshToken = async () => {
    try {
      const inLocalStorageRefreshToken = localStorage.getItem(
        LOCAL_REFRESH_TOKEN_NAME
      )

      if (!inLocalStorageRefreshToken) {
        this.deleteToken()
        return false
      }

      const response = await axios.post(API_GET_REFRESH_TOKEN, {
        refreshToken: inLocalStorageRefreshToken,
      })

      console.log(response.data)

      const data = (await response.data) as {
        accessToken: string
      }

      this.setToken(data.accessToken)

      return true
    } catch (error) {
      console.log(error)
      this.deleteToken()

      return false
    }
  }

  abortRefreshToken = () => {
    if (this.refreshTokenTimeoutId)
      window.clearTimeout(this.refreshTokenTimeoutId)
  }

  deleteToken = () => {
    this.inMemoryToken = null

    this.abortRefreshToken()

    window.localStorage.setItem(LOCAL_LOGOUT_EVENT_NAME, Date.now().toString())
    window.localStorage.removeItem(LOCAL_REFRESH_TOKEN_NAME)

    return true
  }

  setRefreshTokenTimeout = (delay: number) => {
    this.refreshTokenTimeoutId = window.setTimeout(
      this.getRefreshToken,
      delay * 10
    )
  }

  private pinBearerTokenToCommonHeader = (accessToken: string) => {
    accessToken
      ? (axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`)
      : delete axios.defaults.headers.common['Authorization']
  }
}

export const JWT = new JWTManager()
