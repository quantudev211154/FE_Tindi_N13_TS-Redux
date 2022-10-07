import ChatList from './chat_list/ChatList'

const LeftMain = () => {
  return (
    <div className='transition-all flex-1 overflow-y-scroll px-2 pt-2'>
      <ChatList />
    </div>
  )
}

export default LeftMain
