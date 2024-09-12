/* eslint-disable use-isnan */
import React, {  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCartItem, deleteItem } from '../Redux/cartSlice';

function Cart() {

  const cartData = useSelector((state) => state.cartSlice.cartItems )

  const disPatch = useDispatch();

  const handleRemovefromCart = (id) => {

    if(cartData.length > 1 ){
  
      const newCartData = cartData.filter((_, index) => index !== id);

      disPatch(deleteItem(newCartData))
  
    } else{
      
      handleClearCart()
    }


  }

  const totalAmount = cartData.reduce((total, items) => {

    return total + items?.price || items?.defaultPrice

  }, 0 )

  const handleClearCart = () => {

    disPatch(clearCartItem([]))

    localStorage.clear()
  }

  return (

    <div className='w-full '>

      <div className='w-[50%] my-6 mx-auto'>

        {
          cartData?.map((data, index) => {

            return(

              <div key={index} className='flex justify-between mb-12 items-center'>

                <h1>{data?.name}</h1>

               {
                data.price &&  <p>₹ {data?.price / 100}</p>
               } 

                <div className='relative'>

                   {data?.imageId && (
                           <img
                             src={
                               "https://media-assets.swiggy.com/swiggy/image/upload/" +
                               data?.imageId
                             }
                             className="w-40 h-32 rounded-xl object-cover"
                             alt="food-item"
                           />
                         )}
       
                         <button
                           className={` w-[7.5rem] ml-4 p-1 ${
                             data?.imageId && "absolute ml-0 top-[83%] left-[0%]"
                           } bg-red-500 border rounded-lg shadow-md text-white text-lg font-bold `}
                           onClick={() => handleRemovefromCart(index)}
                         >
                           Remove
                         </button>
            
                </div>

                 
              </div>
            )
          } )
        }

        <h1>Total Amount:- ₹ {  totalAmount / 100 } </h1>

        <button 
        className='w-24 p-2 bg-blue-500 rounded-lg text-white'
        onClick={handleClearCart}
        >Clear</button>
        
      </div>
    </div>
    
  )
}

export default Cart