import React from 'react'

interface Props {
  handleResize: Function
}

const ResizeHandle = ({ handleResize }: Props) => {
  const onDrag = (event: React.DragEvent<HTMLDivElement>) => {
    const selfXCor = event.pageX

    handleResize(selfXCor)
  }

  return (
    <div
      onDrag={onDrag}
      draggable={true}
      className='absolute divider top-0 -right-[2px] h-full w-[2px] opacity-0 flex-initial cursor-e-resize transition-all'
    ></div>
  )
}

export default ResizeHandle
