import { conversationsControlState } from '../../../redux/slices/ConversationsControlSlice'
import { useAppSelector } from '../../../redux_hooks'
import ChatContainer from './chat_container/ChatContainer'
import Welcome from './welcome/Welcome'
import { useEffect, useRef } from 'react'

const RightCol = () => {
  const { currentChat } = useAppSelector(conversationsControlState)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.onresize = () => {
      if (ref.current) {
        if (window.innerWidth > 768) {
          ref.current.style.left = '0'
          ref.current.style.width = '100%'
        } else {
          if (currentChat) {
            ref.current.style.left = '0'
            ref.current.style.width = '100%'
          } else {
            ref.current.style.left = '110%'
            ref.current.style.width = '0'
          }
        }
      }
    }

    if (ref.current) {
      if (currentChat == null && window.innerWidth < 768) {
        ref.current.style.left = '110%'
        ref.current.style.width = '0'
      } else {
        ref.current.style.left = '0'
        ref.current.style.width = '100%'
      }
    }
  }, [currentChat])

  return (
    <div
      ref={ref}
      className='absolute top-0 md:left-0 md:w-auto md:relative flex-1 h-full bg-gray-300 z-50 transition-all duration-500 overflow-hidden'
    >
      {!currentChat?.id ? <Welcome /> : <ChatContainer />}
    </div>
  )
}

export default RightCol
