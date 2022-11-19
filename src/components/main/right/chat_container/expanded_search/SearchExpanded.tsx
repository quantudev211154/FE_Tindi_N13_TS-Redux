import { CalendarTodayOutlined, Close } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { conversationDetailState } from '../../../../../redux/slices/ConversationDetailSlice'
import {
  currentChatNavigationState,
  toggleExpandedPanel,
} from '../../../../../redux/slices/CurrentChatNavigationSlice'
import { MessageType } from '../../../../../redux/types/MessageTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux_hooks'
import { findMessage } from '../../../../../utilities/message_utils/MessageUtils'
import FoundMessage from '../../../../core/FoundMessage'

const SearchExpanded = () => {
  const { openExpandedPanel } = useAppSelector(currentChatNavigationState)
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [keyword, setKeyword] = useState('')
  const [foundMessages, setFoundMessages] = useState<MessageType[]>([])
  const { messageList } = useAppSelector(conversationDetailState)
  let findMessageTimer = -1

  useEffect(() => {
    let timer: number = -2

    timer = window.setTimeout(() => {
      if (inputRef.current) {
        if (openExpandedPanel) {
          inputRef.current.focus()
        }
      }
    }, 300)

    return () => window.clearTimeout(timer)
  }, [openExpandedPanel])

  const findMessageByKeyword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    window.clearTimeout(findMessageTimer)

    const value = event.target.value

    setKeyword(value)

    findMessageTimer = window.setTimeout(() => {
      setFoundMessages(findMessage(value, messageList))
    }, 500)
  }

  return (
    <div
      style={{ display: openExpandedPanel ? 'flex' : 'none' }}
      className='w-full p-1 h-full bg-white transition-all flex flex-col justify-start items-center'
    >
      <div className='w-full'>
        <div className='w-full mx-auto flex flex-row justify-between items-center'>
          <Button
            onClick={() => {
              dispatch(toggleExpandedPanel(openExpandedPanel ? false : true))
            }}
            type='submit'
            variant='contained'
            sx={{
              maxWidth: '2.5rem',
              maxHeight: '2.5rem',
              minWidth: '2.5rem',
              minHeight: '2.5rem',
              borderRadius: '50%',
              mr: 1,
              bgcolor: 'white',
              '&:hover': {
                bgcolor: '#eeeee4',
                '& svg': {
                  fill: 'black',
                },
              },
            }}
            disableElevation
          >
            <Close
              sx={{
                fill: 'gray',
                cursor: 'pointer',
              }}
            />
          </Button>
          <TextField
            value={keyword}
            onChange={findMessageByKeyword}
            inputRef={inputRef}
            name='search-message'
            variant='standard'
            sx={{ flex: '1 1 0%' }}
            placeholder='Tìm tin nhắn'
          />
          <Button
            type='submit'
            variant='contained'
            sx={{
              maxWidth: '2.5rem',
              maxHeight: '2.5rem',
              minWidth: '2.5rem',
              minHeight: '2.5rem',
              borderRadius: '50%',
              ml: 1,
              bgcolor: 'white',
              '&:hover': {
                bgcolor: '#eeeee4',
                '& svg': {
                  fill: 'black',
                },
              },
            }}
            disableElevation
          >
            <CalendarTodayOutlined
              sx={{
                fill: 'gray',
                cursor: 'pointer',
              }}
            />
          </Button>
        </div>
        <div className='mt-1 w-full flex flex-col items-center justify-center'>
          {foundMessages.length !== 0 &&
            foundMessages.map((message) => (
              <FoundMessage key={message.id} message={message} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default SearchExpanded
