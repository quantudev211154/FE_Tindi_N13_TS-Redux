export const AUTH_SLICE_NAME = 'auth'
export const AUTH_LOGIN_THUNK = AUTH_SLICE_NAME + '/login'
export const AUTH_REGISTER_THUNK = AUTH_SLICE_NAME + '/register'
export const AUTH_CHECK_AUTH_THUNK = AUTH_SLICE_NAME + '/checkAuth'
export const AUTH_FORGOT_PWD_THUNK = AUTH_SLICE_NAME + '/forgot'

export const CONVERSATION_SLICE_NAME = 'conversation'
export const CONVERSATION_LOAD_CONVERS_THUNK =
  CONVERSATION_SLICE_NAME + '/loadConvers'
export const CONVERSATION_ADD_NEW_CONVER =
  CONVERSATION_SLICE_NAME + '/addConver'
export const CONVERSATION_DELETE_CONVER =
  CONVERSATION_SLICE_NAME + '/deleteConversation'
export const CONVERSATION_UPDATE_CONVER =
  CONVERSATION_SLICE_NAME + '/updateConversation'
export const CONVERSATION_ADD_MEMBER = CONVERSATION_SLICE_NAME + '/addMembers'
export const CONVERSATION_REMOVE_MEMBER =
  CONVERSATION_SLICE_NAME + '/removeMember'
export const CONVERSATION_GRANT_PERMISSION =
  CONVERSATION_SLICE_NAME + '/grantPermission'
export const CONVERSATION_OUT_GROUP = CONVERSATION_SLICE_NAME + '/outGroup'
export const CONVERSATION_UPDATE_STATUS_OF_MEMBER =
  CONVERSATION_SLICE_NAME + '/updateStatus'

export const CONTACT_SLICE_NAME = 'contact'
export const CONTACT_LOAD_CONTACTS = CONTACT_SLICE_NAME + '/loadContacts'
export const CONTACT_ADD_NEW_CONTACT = CONTACT_SLICE_NAME + '/addNewContact'

export const CONVERSATION_DETAIL_NAME = 'converDetail'
export const CONVERSATION_DETAIL_LOAD_MESSAGES =
  CONVERSATION_DETAIL_NAME + '/loadMessages'
export const CONVERSATION_DETAIL_SAVE_MESSAGE =
  CONVERSATION_DETAIL_NAME + '/saveMessage'
export const CONVERSATION_DETAIL_FORWARD_MESSAGE =
  CONVERSATION_DETAIL_NAME + '/forward'
export const CONVERSATION_DETAIL_REVOKE_MESSAGE =
  CONVERSATION_DETAIL_NAME + '/revokeMessage'
export const CONVERSATION_DETAIL_DELETE_MESSAGE =
  CONVERSATION_DETAIL_NAME + '/deleteMessage'

export const USER_SLICE_NAME = 'userSlice'
export const USER_UPDATE_PROFILE = USER_SLICE_NAME + '/updateProfile'

export const FIREBASE_AUTH_NAME = 'firebaseAuth'

export const SOCKET_SLICE_NAME = 'socket'

export const MESSAGE_CONTEXT_MENU_NAME = 'msgContextMenu'

export const RESPONSIVE = 'RESPONSIVE'

export const FILE_VIEWER_SLICE_NAME = 'FILE_VIEWER_SLICE'
