import { CalendarTodayOutlined, Close } from '@mui/icons-material'
import { Button, CircularProgress, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { findMessageFromServer } from '../../../../../api/Message.api'
import { conversationsControlState } from '../../../../../redux/slices/ConversationsControlSlice'
import {
  currentChatNavigationState,
  toggleExpandedPanel,
} from '../../../../../redux/slices/CurrentChatNavigationSlice'
import { useAppDispatch, useAppSelector } from '../../../../../redux_hooks'
import FoundMessage from '../../../../core/FoundMessage'

const SearchExpanded = () => {
  const { currentChat } = useAppSelector(conversationsControlState)
  const { openExpandedPanel } = useAppSelector(currentChatNavigationState)
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [keyword, setKeyword] = useState('')
  let findMessageTimer: number | undefined = undefined
  const [allowToFetchApi, setAllowToFetchApi] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: [keyword],
    queryFn: () => findMessageFromServer(currentChat, keyword),
    enabled: !!currentChat && keyword !== '' && allowToFetchApi,
  })

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

    setAllowToFetchApi(false)

    const value = event.target.value

    setKeyword(value)

    findMessageTimer = window.setTimeout(() => {
      setAllowToFetchApi(true)
    }, 500)
  }

  return (
    <div
      style={{ display: openExpandedPanel ? 'flex' : 'none' }}
      className='w-ful p-1 h-full bg-white transition-all flex flex-col justify-start items-center'
    >
      <div className='w-full h-full flex flex-col'>
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
        <div className='mt-1 w-full flex-1 flex flex-col items-center justify-center overflow-y-auto'>
          <div className='w-full h-full'>
            {isLoading && keyword !== '' ? (
              <div className='flex justify-center items-center py-5 w-full'>
                <CircularProgress color='info' />
              </div>
            ) : (
              <></>
            )}
            {data && data.data.length !== 0 ? (
              data.data.map((message) => (
                <FoundMessage key={message.id} message={message} />
              ))
            ) : keyword !== '' ? (
              <div className='w-full text-center'>
                <span className='italic text-sm'>
                  Không tìm được tin nhắn nào
                </span>
              </div>
            ) : (
              <div className='w-full text-center'>
                <span className='text-sm'>Hãy nhập từ khoá cần tìm kiếm</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchExpanded
