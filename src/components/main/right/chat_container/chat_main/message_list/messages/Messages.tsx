import { DoneAll } from '@mui/icons-material'
import { useEffect, useRef } from 'react'
import UserAvatar from '../../../../../../core/UserAvatar'
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
            <p className='text-[.95rem]'>Mot con vit xoe ra hai cai canh</p>
            <div className='absolute right-1 bottom-[.1rem] text-green-500 flex flex-row items-center'>
              <p className='text-[0.7rem] mr-1'>10:36</p>
              <DoneAll sx={{ width: '1.2rem', height: '1.2rem' }} />
            </div>
          </div>
        </div>
      ) : (
        <div className='relative justify-start mt-[.5rem] flex flex-row'>
          <div className='mr-2 flex flex-col justify-end'>
            <UserAvatar size='AVATAR_SMALL' name='Do Quynh Trinh' avatar={''} />
          </div>
          <div className='relative max-w-[60%]'>
            <ClipPathMsg fromSelf={fromSelf} />
            <div className='bg-white break-words p-2 pr-12 justify-end rounded-lg rounded-bl-none'>
              <p className='text-[.95rem]'>
                Mot con vit xoe ra hai cai canh Mot con vit xoe ra hai cai canh
                Mot con vit xoe ra hai cai canh Mot con vit xoe ra hai cai canh
              </p>
              <div className='absolute right-1 bottom-[.1rem] text-slate-500'>
                <p className='text-[0.7rem]'>10:36</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
