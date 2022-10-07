import DropdownMenu from './dropdown_menu/DropdownMenu'
import SearchInput from './search_input/SearchInput'

const LeftHeader = () => {
  return (
    <div className='transition-all w-full py-1 px-3 flex-initial flex justify-between items-center'>
      <DropdownMenu />
      <SearchInput />
    </div>
  )
}

export default LeftHeader
