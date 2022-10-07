import { useEffect, useRef } from 'react'
import { currentChatNavigationState } from '../../../../../redux/slices/CurrentChatNavigationSlice'
import { useAppSelector } from '../../../../../redux_hooks'
import ExpandedHeader from './expanded_search_header/ExpandedHeader'
import ExpandedMain from './expanded_search_main/ExpandedMain'

type Props = {}

const SearchExpanded = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { openExpandedPanel } = useAppSelector(currentChatNavigationState)

  useEffect(() => {
    if (openExpandedPanel) ref.current!.style.width = 'calc(100%/2)'
    else ref.current!.style.width = '0'
  }, [openExpandedPanel])

  return (
    <div
      ref={ref}
      className='w-0 h-full bg-white transition-all flex flex-col justify-start items-center'
    >
      <ExpandedHeader />
      <ExpandedMain />
    </div>
  )
}

export default SearchExpanded
