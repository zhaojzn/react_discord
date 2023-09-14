import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[10%] w-screen h-half bg-white flex text-center justify-between '>
        <p className="text-black text-lg font-sans font-bold p-5">
          Test Website
        </p>
        <div className='hidden sm:flex justify-center items-start gap-10 '>
            <div className="flex gap-10 justify-center items-center p-5 ">
            <button className="text-black font-sans text-lg">About</button>
            <button className="text-black font-sans text-lg">News</button>
            <button className="text-black font-sans text-lg">Contact</button>
            </div>
        </div>  
    </div>
  )
}

export default Navbar