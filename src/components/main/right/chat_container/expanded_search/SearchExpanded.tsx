import ExpandedHeader from './expanded_search_header/ExpandedHeader'
import ExpandedMain from './expanded_search_main/ExpandedMain'

const SearchExpanded = () => {
  return (
    <div className='w-full p-1 h-full bg-white transition-all flex flex-col justify-start items-center'>
      <div className='w-[90%] mx-auto'>
        <ExpandedHeader />
        <ExpandedMain />
      </div>
    </div>
  )
}

export default SearchExpanded
