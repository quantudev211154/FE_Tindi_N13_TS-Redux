import AdvancedAction from './advanced_action/AdvancedAction'
import SearchMsg from './search_message/SearchMsg'

const ChatHeaderRight = () => {
  return (
    <div className='flex flex-row justify-end items-center'>
      <SearchMsg />
      <AdvancedAction />
    </div>
  )
}

export default ChatHeaderRight
