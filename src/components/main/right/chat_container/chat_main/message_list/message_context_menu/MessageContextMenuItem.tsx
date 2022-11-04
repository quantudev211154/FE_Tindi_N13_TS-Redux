import { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  label: string
  handler: Function
  warning?: boolean
}

const MessageContextMenuItem = ({ icon, label, handler, warning }: Props) => {
  return (
    <div
      className='cursor-pointer px-2 py-2 flex justify-start bg-transparent items-center text-sm rounded-md transition-all hover:bg-[rgba(220,220,220,0.733333)]'
      onClick={() => {
        handler()
      }}
    >
      <figure>{icon}</figure>
      {warning ? (
        <span className='ml-5 text-[#cf0632] font-medium'>{label}</span>
      ) : (
        <span className='ml-5 font-medium'>{label}</span>
      )}
    </div>
  )
}

export default MessageContextMenuItem
