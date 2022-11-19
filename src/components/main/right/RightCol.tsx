import { conversationsControlState } from '../../../redux/slices/ConversationsControlSlice'
import { useAppSelector } from '../../../redux_hooks'
import ChatContainer from './chat_container/ChatContainer'
import Welcome from './welcome/Welcome'
import { responsiveState } from './../../../redux/slices/Responsive'
import { useEffect, useRef } from 'react'

const RightCol = () => {
  const { currentChat } = useAppSelector(conversationsControlState)
  const { isOpenMessageList } = useAppSelector(responsiveState)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.onresize = () => {
      if (ref.current) {
        if (window.innerWidth > 768) {
          ref.current.style.left = '0'
          ref.current.style.width = '100%'
        }
      }
    }
  }, [window])

  return (
    <div
      ref={ref}
      style={{
        left: isOpenMessageList ? '0' : '110%',
        width: isOpenMessageList ? '100%' : '0',
      }}
      className='absolute top-0 md:left-0 md:relative md:w-auto flex-1 h-full bg-gray-300 z-50 transition-all duration-500'
    >
      {!currentChat?.id ? <Welcome /> : <ChatContainer />}
    </div>
  )
}

export default RightCol
