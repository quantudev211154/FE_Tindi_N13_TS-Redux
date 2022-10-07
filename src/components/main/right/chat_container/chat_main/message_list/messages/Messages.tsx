import { DoneAll } from '@mui/icons-material'
import React, { useEffect, useRef } from 'react'
import ClipPathMsg from './ClipPathMsg'

type Props = {
  fromSelf: boolean
}

const Messages = ({ fromSelf }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current!.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div ref={ref} className='transition-all'>
      {fromSelf ? (
        <div className='relative flex flex-row justify-end mt-[.5rem]'>
          <ClipPathMsg fromSelf={fromSelf} />
          <div className='relative bg-[#eeffde] max-w-[60%] break-words p-2 pr-14 justify-end rounded-lg rounded-br-none'>
            <p className='text-[.95rem]'>
              Anh nho em vai lua luon ay em oi Anh nho em vai lua luon ay em oi
            </p>
            <div className='absolute right-1 bottom-[.1rem] text-green-500 flex flex-row items-center'>
              <p className='text-[0.7rem] mr-1'>10:36</p>
              <DoneAll sx={{ width: '1.2rem', height: '1.2rem' }} />
            </div>
          </div>
        </div>
      ) : (
        <div className='relative justify-start mt-[.5rem] flex flex-row'>
          <ClipPathMsg fromSelf={fromSelf} />
          <div className='relative bg-white max-w-[60%] break-words p-2 pr-12 justify-end rounded-lg rounded-bl-none'>
            <p className='text-[.95rem]'>
              Anh nho em vai lua luon ay em oi Anh nho em vai lua luon ay em oi
            </p>
            <div className='absolute right-1 bottom-[.1rem] text-slate-500'>
              <p className='text-[0.7rem]'>10:36</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
