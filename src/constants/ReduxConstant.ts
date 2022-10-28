export const AUTH_SLICE_NAME = 'auth'
export const AUTH_LOGIN_THUNK = AUTH_SLICE_NAME + '/login'
export const AUTH_REGISTER_THUNK = AUTH_SLICE_NAME + '/register'
export const AUTH_CHECK_AUTH_THUNK = AUTH_SLICE_NAME + '/checkAuth'

export const CONVERSATION_SLICE_NAME = 'conversation'
export const CONVERSATION_LOAD_CONVERS_THUNK =
  CONVERSATION_SLICE_NAME + '/loadConvers'

export const CONTACT_SLICE_NAME = 'contact'
export const CONTACT_LOAD_CONTACTS = CONTACT_SLICE_NAME + '/loadContacts'
export const CONTACT_ADD_NEW_CONTACT = CONTACT_SLICE_NAME + '/addNewContact'

export const CONVERSATION_DETAIL_NAME = 'converDetail'
export const CONVERSATION_DETAIL_LOAD_MESSAGES =
  CONVERSATION_DETAIL_NAME + '/loadMessages'
export const CONVERSATION_DETAIL_SAVE_MESSAGE =
  CONVERSATION_DETAIL_NAME + '/saveMessage'

export const FIREBASE_AUTH_NAME = 'firebaseAuth'

export const SOCKET_SLICE_NAME = 'socket'
