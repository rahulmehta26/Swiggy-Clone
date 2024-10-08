/* eslint-disable no-unused-vars */
import React from 'react'
import notFound from './../assets/notFound.jpg'
import { Link } from 'react-router-dom'

const ErrorPage = () => {

  return (

    <div
    className='w-full flex flex-col justify-center items-center '
    >

        <div
        className='w-[30rem] h-auto'
        >

            <img
            src={notFound}
            className='w-full h-full'
            />

        </div>

        <h1
        className="text-center mt-6 text-[1.25rem] font-bold text-[#535665] "
        >Coming soon...</h1>

        <Link to={"/"}>
              <button className="w-[16rem] text-white font-medium mt-4 text-[1rem] bg-[#FF5200] hover:shadow-md p-2">
                SEE RESTAURANTS NEAR YOU
              </button>
            </Link>
        
    </div>

  )
}

export default ErrorPage
