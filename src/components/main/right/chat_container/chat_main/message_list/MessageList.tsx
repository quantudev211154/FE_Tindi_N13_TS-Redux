import React, { useEffect, useRef } from 'react'
import Messages from './messages/Messages'

type Props = {}

const MessageList = (props: Props) => {
  return (
    <div className='w-2/3 mx-auto'>
      <Messages fromSelf={true} />
      <Messages fromSelf={false} />
      <Messages fromSelf={true} />
      <Messages fromSelf={true} />
      <Messages fromSelf={true} />
      <Messages fromSelf={false} />
      <Messages fromSelf={true} />
      <Messages fromSelf={false} />
      <Messages fromSelf={true} />
      <Messages fromSelf={true} />
      <Messages fromSelf={false} />
      <Messages fromSelf={false} />
      <Messages fromSelf={true} />
    </div>
  )
}

export default MessageList
