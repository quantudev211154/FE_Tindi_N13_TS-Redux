import { useRef } from 'react'
import LeftHeader from './left_header/LeftHeader'
import LeftMain from './left_main/LeftMain'
import ResizeHandle from './resize_handle/ResizeHandle'

const LeftCol = () => {
  const ref = useRef<HTMLDivElement>(null)
  const maxWidth = Math.ceil(window.screen.width / 3)
  const minWidth = 200

  const handleResize = (resizerXCor: number) => {
    if (resizerXCor < maxWidth && resizerXCor > minWidth)
      ref.current!.style.width = resizerXCor + 'px'
  }

  return (
    <div
      ref={ref}
      className='relative border-r-[1px] border-slate-300 w-1/3 left-col flex flex-col justify-start h-full'
    >
      <LeftHeader />
      <LeftMain />
      <ResizeHandle handleResize={handleResize} />
    </div>
  )
}

export default LeftCol
