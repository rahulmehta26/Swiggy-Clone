/* eslint-disable no-unused-vars */
import { signOut } from 'firebase/auth'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUserInfo } from '../Redux/authSlice'
import { auth } from '../Auth/firebaseAuth'
import { useNavigate, useNavigation } from 'react-router-dom'

const HoverCard = () => {

  const navigate = useNavigate()

    const hoverOptions = [
        {
            id:1 , 
            name:"Profiles" ,
        },

        {
            id:2 , 
            name:"Orders" ,
        },

        {
            id:3 , 
            name:"Swiggy One" ,
        },

        {
            id:4 , 
            name:"Favourites" ,
        },

        {
            id:5 , 
            name:"Logout" ,
        },
    ]

    const dispatch = useDispatch()

      const handleSignOut = async() => {

      await signOut(auth)
      dispatch(removeUserInfo())

  }

  const handleNavigate = () => {

    console.log("fctvgybhjn")
    navigate("/my-account")
  }

  return (

<div
  className='relative w-[12rem] bg-white ml-10 cursor-pointer shadow-lg border-2 p-6 space-y-3 border-t-[#FF5200]' 

>
  {
    hoverOptions?.map((data) => {
      return (
        <div 
        key={data.id}
        onClick={data.name === "Logout" ? handleSignOut : handleNavigate }
        >
          <h1 className='text-[.9rem] hover:scale-105 font-bold text-[#3D4152]'>
            {data.name}
          </h1>
        </div>
      );
    })
  }
</div>

  )
}

export default HoverCard