import { useRef } from 'react'
import LeftHeader from './left_header/LeftHeader'
import LeftMain from './left_main/LeftMain'
import ResizeHandle from './resize_handle/ResizeHandle'

const LeftCol = () => {
  const ref = useRef<HTMLDivElement>(null)
  const maxWidth = Math.ceil(window.screen.width / 3)
  const minWidth = 200

  const handleResize = (resizerXCor: number) => {
    if (ref.current) {
      if (window.screen.availWidth > 768) {
        if (resizerXCor < maxWidth && resizerXCor > minWidth)
          ref.current.style.width = resizerXCor + 'px'
      }
    }
  }

  return (
    <div
      ref={ref}
      className='left-col relative w-full md:w-[30%] border-0 md:border md:border-r-[1px] md:border-slate-300 left-col flex-1 md:flex-initial flex flex-col justify-start h-full'
    >
      <LeftHeader />
      <LeftMain />
      <ResizeHandle handleResize={handleResize} />
    </div>
  )
}

export default LeftCol
