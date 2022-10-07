const Welcome = () => {
  return (
    <div className='relative h-full flex bg-gray-100'>
      <span
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center 
      p-2 text-slate-900 border border-slate-600 border-dashed rounded-xl'
      >
        Hãy chọn một cuộc hội thoại bất kì
        <br />
        để bắt đầu nhắn tin
      </span>
    </div>
  )
}

export default Welcome
