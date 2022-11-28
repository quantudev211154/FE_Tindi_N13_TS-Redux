import {
  API_CHANGE_PASSWORD,
  API_CHECK_PASSWORD,
} from '../constants/APIConstant'
import http from '../utilities/http/Http'

export const checkValidPassword = (phone: string, pwd: string) => {
  return http.get(`${API_CHECK_PASSWORD}${phone}`, {
    params: {
      password: pwd,
    },
  })
}

export const changePwd = (
  phone: string,
  oldPassword: string,
  newPassword: string
) => {
  return http.post(
    `${API_CHANGE_PASSWORD}${phone}?oldPassword=${oldPassword}&newPassword=${newPassword}`
  )
}
