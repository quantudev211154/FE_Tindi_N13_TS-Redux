import { ArrowDownwardOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useAppSelector } from '../../../../../redux_hooks'
import MessageList from './message_list/MessageList'
import { conversationDetailState } from './../../../../../redux/slices/ConversationDetailSlice'

const ChatMain = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { isLoadingMessageList } = useAppSelector(conversationDetailState)
  const btnScrolldownRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (scrollRef.current && btnScrolldownRef.current) {
      scrollRef.current.onscroll = () => {
        if (scrollRef.current && btnScrolldownRef.current) {
          const scrolledHeight =
            scrollRef.current.scrollHeight -
            scrollRef.current.clientHeight -
            scrollRef.current.scrollTop

          if (scrolledHeight > scrollRef.current.clientHeight) {
            btnScrolldownRef.current.style.opacity = '1'
          } else {
            btnScrolldownRef.current.style.opacity = '0'
          }
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoadingMessageList && scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [isLoadingMessageList])

  return (
    <div
      ref={scrollRef}
      className='chatmain flex-1 relative overflow-y-auto transition-all'
    >
      <MessageList />
      <div className='sticky bottom-0 left-[90%] flex justify-end items-end'>
        <Button
          ref={btnScrolldownRef}
          onClick={() => {
            if (scrollRef.current) {
              scrollRef.current.scroll({ top: scrollRef.current.scrollHeight })
            }
          }}
          variant='contained'
          sx={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            maxWidth: '2.5rem',
            maxHeight: '2.5rem',
            minWidth: '2.5rem',
            minHeight: '2.5rem',
            borderRadius: '50%',
            bgcolor: '#2078c9',
            color: 'white',
            transition: '.2s ease',
            '&:hover': {
              bgcolor: '#186ab8',
            },
          }}
          disableElevation
        >
          <ArrowDownwardOutlined sx={{ width: 26, height: 26 }} />
        </Button>
      </div>
    </div>
  )
}

export default ChatMain
