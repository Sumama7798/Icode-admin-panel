import React from 'react'

const Banner1Form = () => {
  return (
    <div className=''>
      <div className='flex flex-col justify-center items-center'>
        <div className='text-3xl font-bold'>Banner 1</div>
        <div className=' text-sm text-gray-500'>Edit the Banner 1 Section of the Home Page</div>
        
        <form className='flex justify-center items-center bg-slate-500 rounded-md p-4'>

          <div className='flex flex-col justify-center items-center space-x-4 space-y-4'>
            <input type='number' className='bg-gray-700 rounded-md p-2 w-25 ' placeholder='number'></input>
            <input type='text' className='bg-gray-700 rounded-md p-2 w-25 ' placeholder='text'></input>
            <button className='bg-blue-500 rounded-md p-2 w-25 '>Edit </button>
          </div>

          <div className='flex flex-col justify-center items-center space-x-4 space-y-4'>
            <input type='number' className='bg-gray-700 rounded-md p-2 w-25' placeholder='number'></input>
            <input type='text' className='bg-gray-700 rounded-md p-2 w-25' placeholder='text'></input>
            <button className='bg-blue-500 rounded-md p-2 w-25'>Edit </button>
          </div>

          <div className='flex flex-col justify-center items-center space-x-4 space-y-4'>
            <input type='number' className='bg-gray-700 rounded-md p-2 w-25' placeholder='number'></input>
            <input type='text' className='bg-gray-700 rounded-md p-2 w-25' placeholder='text'></input>
            <button className='bg-blue-500 rounded-md p-2 w-25'>Edit </button>
          </div>


          
          </form>

      </div>

    </div>
  )
}

export default Banner1Form