import axios from 'axios'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { API_GET_REFRESH_TOKEN } from '../../constants/APIConstant'

class JWTManager {
  LOGOUT_EVENT_NAME = 'Tindi-logout'
  inMemoryToken: string | null
  refreshTokenTimeoutId: number | null
  userId: string | null

  constructor() {
    this.inMemoryToken = null
    this.refreshTokenTimeoutId = null
    this.userId = null

    window.addEventListener('storage', (event) => {
      if (event.key === this.LOGOUT_EVENT_NAME) this.inMemoryToken = null
    })
  }

  getToken = () => this.inMemoryToken

  getUserId = () => this.userId

  setToken = (accessToken: string) => {
    this.inMemoryToken = accessToken

    const decoded = jwtDecode<JwtPayload & { userId: string }>(accessToken)
    this.userId = decoded.userId

    this.setRefreshTokenTimeout(
      (decoded.exp as number) - (decoded.iat as number)
    )

    this.pinBearerTokenToCommonHeader(accessToken)

    return true
  }

  getRefreshToken = async () => {
    try {
      const response = await axios.get(API_GET_REFRESH_TOKEN, {
        withCredentials: true,
      })

      const data = response.data as {
        success: boolean
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

    window.localStorage.setItem(this.LOGOUT_EVENT_NAME, Date.now().toString())

    return true
  }

  setRefreshTokenTimeout = (delay: number) => {
    this.refreshTokenTimeoutId = window.setTimeout(
      this.getRefreshToken,
      delay * 1000 - 5000
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
