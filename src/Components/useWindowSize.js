/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

const useWindowSize = () => {

    const [windowSize, setWindowSize] = useState({
        height:0,
        width:0
    })

    useEffect(() => {

        function handleSize(){
            setWindowSize({
                height:window.scrollY,
                width:window.scrollX,
            })
        } 

        window.addEventListener("scroll", handleSize)
        handleSize()

        return () => window.removeEventListener("scroll", handleSize)
    }, [] )

  return windowSize
}

export default useWindowSize