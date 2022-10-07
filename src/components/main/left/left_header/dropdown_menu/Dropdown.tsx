interface Props {
  open: boolean
}

const Dropdown = ({ open }: Props) => {
  return (
    <div
      style={
        open
          ? {
              visibility: 'visible',
              opacity: '1',
              width: '17rem',
              height: '16rem',
            }
          : {
              visibility: 'hidden',
              opacity: '0',
              width: '0rem',
              height: '0rem',
            }
      }
      className='absolute z-50 left-0 top-full mt-2 p-3 rounded-lg bg-red-500 transition-all duration-200'
    >
      Dropdown
    </div>
  )
}

export default Dropdown
