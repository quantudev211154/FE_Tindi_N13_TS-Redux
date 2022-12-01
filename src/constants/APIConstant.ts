export const HOST =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:8089/api/'
    : 'https://tindy-app-service-production.up.railway.app/api/'
export const API_LOGIN = 'auth/login'
export const API_REGISTER = 'auth/register'
export const API_GET_REFRESH_TOKEN = 'auth/refresh_token'
export const API_CHECK_EXISTING_PHONE = 'auth/exist?phone='
export const API_FORGOT_PWD = 'auth/forgot/password/'

export const API_LOAD_CONVERS = 'conversations'
export const API_ADD_CONVER = 'conversations'
export const API_DELETE_CONVER = 'conversations/'
export const API_UPDATE_CONVER = 'conversations/avatar/'
export const API_ADD_MEMBERS_TO_CONVERSATION = 'participants/group'
export const API_REMOVE_MEMBER = 'participants/group/participant'
export const API_GRANT_PERMISSION = 'participants/grant'
export const API_OUT_GROUP = 'participants/group/'
export const API_UPDATE_STATUS_OF_MEMBER = 'participants/mute'

export const API_LOAD_CONTACTS = 'users/contacts?userId='
export const API_ADD_NEW_CONTACT = 'users/contacts'
export const API_GET_USER_BY_PHONE = 'users?phone='

export const API_UPDATE_USER_PROFILE = 'users/'
export const API_CHECK_PASSWORD = 'users/password/'
export const API_CHANGE_PASSWORD = 'users/change/password/'

export const API_CHECK_EXISTING_CONTACT = 'contacts/exist'

export const API_LOAD_MSG_OF_CONVER = 'messages/'
export const API_REVOKE_MSG = 'messages/revoke/'
export const API_DELETE_MSG = 'messages/delete'
export const API_SAVE_MSG = 'messages'
export const API_DOWLOAD_FILE = 'messages/attachments/'
export const API_FORWARD_MSG = 'messages/forward/' //tmp
export const API_FIND_MESSAGE = 'messages/find/'
export const API_LOAD_ATTACHMENTS = 'messages/attachments/'
