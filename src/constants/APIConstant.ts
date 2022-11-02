const HOST = 'http://localhost:8089/api/'
// const HOST = 'https://tindy-app-chat.herokuapp.com/api/'
export const API_LOGIN = HOST + 'auth/login'
export const API_REGISTER = HOST + 'auth/register'
export const API_GET_REFRESH_TOKEN = HOST + 'auth/refresh_token'
export const API_CHECK_EXISTING_PHONE = HOST + 'auth/exist?phone='

export const API_LOAD_CONVERS = HOST + 'conversations'
export const API_ADD_CONVER = HOST + 'conversations'

export const API_LOAD_CONTACTS = HOST + 'users/contacts?userId='
export const API_ADD_NEW_CONTACT = HOST + 'users/contacts'
export const API_GET_USER_BY_PHONE = HOST + 'users?phone='

export const API_CHECK_EXISTING_CONTACT = HOST + 'contacts/exist'

export const API_LOAD_MSG_OF_CONVER = HOST + 'messages/'
export const API_SAVE_MSG = HOST + 'messages'
