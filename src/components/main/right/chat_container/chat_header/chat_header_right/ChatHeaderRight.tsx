import AdvancedAction from './advanced_action/AdvancedAction'
import SearchMsg from './search_message/SearchMsg'

type Props = {}

const ChatHeaderRight = (props: Props) => {
  return (
    <div className='flex flex-row justify-end items-center'>
      <SearchMsg />
      <AdvancedAction />
    </div>
  )
}

export default ChatHeaderRight
