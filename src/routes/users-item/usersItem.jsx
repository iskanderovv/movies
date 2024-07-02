const CardItem = ({image, title, premiered, lang}) => {
  const truncTitle = (text, num) => {
    return text.length  < num ? text : text.slice(0, num) + '...'
  }
  return (
    <div className='bg-[#1a1b23] rounded cursor-pointer'>
      <img src={image} className='h-[300px] w-full rounded-tl rounded-tr' alt="" />
      <h6 className='text-xl text-white pt-2 px-4'>{truncTitle(title, 17)} </h6>
      <p className='text-[#9B9DAB] pb-2 px-4'>
        <span>{premiered}</span> • <span>{lang}</span>
      </p>
    </div>
  )
}

export default CardItem
