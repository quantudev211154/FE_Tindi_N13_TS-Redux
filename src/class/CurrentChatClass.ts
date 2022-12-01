import { ConversationType } from '../redux/types/ConversationTypes'

class CurrentChat {
  private currentChat: ConversationType | undefined

  constructor() {
    this.currentChat = undefined
  }

  setCurrentChat = (currentChat: ConversationType) =>
    (this.currentChat = currentChat)

  getCurrenChat = () => this.currentChat
}

const CurrentChatUtil = new CurrentChat()
export default CurrentChatUtil
