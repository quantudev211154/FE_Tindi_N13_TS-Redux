import React from 'react'

interface Props {
  handleResize: Function
}

const ResizeHandle = ({ handleResize }: Props) => {
  const onDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('Text', event.currentTarget.id)
    const selfXCor = event.pageX

    handleResize(selfXCor)
  }

  return (
    <div
      id='resizer'
      onDrag={onDrag}
      draggable={true}
      className='resizer hidden md:block absolute top-0 -right-[2px] h-full w-[2px] z-40 opacity-0 flex-initial cursor-e-resize transition-all'
    ></div>
  )
}

export default ResizeHandle
