/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'

const SmallFooter = ({resData}) => {

  return (

    <div
    className='w-full bg-[#F1F1F6] p-4 '
    >

        <div 
        className='flex gap-x-4 items-center'
        >

            <img 
            src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i'
            className='w-16 h-8 object-contain'
            />

            <h3
            className='text-[.85rem] mt-2 text-[#93959F] '
            >License no.</h3>
        </div>

        <hr className='border border-1 border[#93959F] my-4 ' />

        <div>
            <h1
            className='text-[.95rem] text-[#93959F] font-bold '
            >{resData?.name}</h1>
            <h2
            className='text-[.85rem] text-[#93959F] font-normal '
            >(Outlet: {resData?.areaName})</h2>

            <div
            className='flex items-center gap-x-2 mt-4'
            >
                <FaLocationDot className='size-4 text-[#A9ABB2]' />

                <p
                className='text-[.75rem] text-[#93959F] '
                >{resData?.locality} <span>{resData?.areaName}</span> <span>{resData?.city}</span> </p>

            </div>
        </div>

        <hr className='border border-1 border[#93959F] my-4 ' />

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[.85rem] text-[#3D4046] font-bold ">
            For better experience,download the Swiggy app now
          </h1>

          <div
          className='flex gap-x-8 items-center'
          >

          <a
            href="https://apps.apple.com/in/app/swiggy-food-grocery-dineout/id989540920"
            target="_blank"
          >
            <img
              src="data:image/avif;base64,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"
              className="w-36 h-16 hover:scale-110 hover:duration-100 object-contain "
            />
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=in.swiggy.android"
            target="_blank"
          >
            <img
              src="data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAZhtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAANGlsb2MAAAAAREAAAgACAAAAAAG8AAEAAAAAAAAAkAABAAAAAAJMAAEAAAAAAAAGZwAAADhpaW5mAAAAAAACAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAFWluZmUCAAAAAAIAAGF2MDEAAAAA12lwcnAAAACxaXBjbwAAABNjb2xybmNseAACAAIABoAAAAAMYXYxQ4EAHAAAAAAUaXNwZQAAAAAAAADIAAAAQQAAAA5waXhpAAAAAAEIAAAAOGF1eEMAAAAAdXJuOm1wZWc6bXBlZ0I6Y2ljcDpzeXN0ZW1zOmF1eGlsaWFyeTphbHBoYQAAAAAMYXYxQ4EgAgAAAAAUaXNwZQAAAAAAAADIAAAAQQAAABBwaXhpAAAAAAMICAgAAAAeaXBtYQAAAAAAAAACAAEEgYYHiAACBIIDhIUAAAAaaXJlZgAAAAAAAAAOYXV4bAACAAEAAQAABv9tZGF0EgAKBhgdseAwqDKDAUSAAooU28uskY1DUnqkSVbCnHeOqvNMCyipSZLRI6RRBiIX8BoLlhylCEo3nxSDOBR1CKq9BBaxBntThm/1/vDzLWIJabjIE/9GZp2DdOHfwXWABCwxtMRbkvjXA+HmbskvLJr9BI6VQ5dXXBD88OXA+zQrlzeBtt8QJJ2RUCMEkQBAEgAKBjgdseAwSDLaDEyAAt00eD+Oyh2RK3y7WrMx46t+ThXN/PJq3o0VZhQfUJ4xPvbXdkVtbbE7NWUklB3riH6Oa77efcGU7k1ZkC8jgXXM0ugFR9wY6m3QOqIOw2FvTBfulGuxwVO52PAbsEkAODEuE0TtDyg5S6d9UfFTwS5Wa2LZtTDCeeusbPHPAOVdr6uujNEfpAFYOdgJ1qtPK9SJpPYZ6cYwRswnfB45mpUvn+rZc0zmnGpqmomCpLGvg1sY3Zva34ADrahunyW7VhiqE9uxy+0CaR0SUuOkZSJmoX5jyFRIoHLazs7/fI2galvGpu+HEqx6b1D04Briuqh5bbWMJGF70MtRIJeJ7BLXcn///+n75AMvPtUR42hv4G+Tvm67fTpUojZL+SHS/mt8B/7OB/UiIfu/GP+NX/V3+uG4inIW4hXlwFLaHSWimZwD4R90PCbXcfdwS8vew+TazXByJVPYhCwT095a6+AOvh7+cc1DNzCaAw/zNX5p0PJd1blxHUk2vawD54EH9UuQAn8HBEXraN18fjJXutYF+VOHR/k9HCskodneH6HPENx8LKieYhjBJU92id+HGNYrRS3xn8MLTLVsnN/kVbCNgpiM0o6J1GUsKx9D0Skzbbo4m/FJj6pd9RSeliYMVrx2LtjLY6OXwdp0Mp+Z7GgO6F9wHTiYMYv3AL2r2Gs9rg99HkJn/bVRE6LmFjJr33ZOHiMCucs7QW1ih4wSvyepO1dJjTx6eqq+y993UpDPssu8AgU1ROY+GRGgLRJZZb2G9wMXbgAhdo8fooBNPrXHUdd3qMVQ+KYpQ1dW8vpR+PqBQos8cE00bX6QnFVk3Riue4gV4GE6EcRzykK1P0M0p2sOMkBLaOXKOh0SylY0hKxoCnYDlgSuGLi0Nozie9qo/2/wX1iS3f0ohZ+7kTuEHIJsuePl2VAMmN4ri3RA9abED+/XooakuDVry7dJgWUvdWuTZbEOf88wJnNYdDMFBu3R6+whDtq8UgAkh4HoDRg9zaduRxnZp2pw0mwmnbKpJlVI2+qFSCIiuPB5KHYg5SulvNYLyPRlwgc53NQxKJuBwEzfBL7w14FvBYnK+fUk+W3mKLMCgJV8MtMnr7569ACaKAAy/PvS0dlhrJUWeLGGiy7Lj+nEhirYIZEdCbQ8LHlqum4Gf//ysJWftcvCjNkNGnl3/d3/vTlQcELvw9c+Wr6SUT/u7Gg2PDiI5kI08azmQyfV9gi+scB+RWkd386GglIJSy0rpEGqWP1q2gfaNgSElEkWtHlWRRJcSLpnQFnmDZa2oWRbGJUssv6Ds57p9NkR5fKKOF62xzF4nQBbuZSWH53MXdehyuWd0qT/s0pmUByfh/aGdJ8EP4Kyxu9vu1rvko4t/L8RTsLW+QNBPDE/mYbz5gfKAwbiU7SxcEdVpQt5gu/8Jt77Xshcvz2tNUvmZ2xzqY7nhueLJCujYgI7xsl7BlpLo+UUFc9aLj28JW+lkK7dL+ZRIW2C3BLZGEKxhr6q6zos4HMuvge8uKZbMMVnh5IlN9TbCeEepjKcbOAt69vKC5whTO1V+YaR2vx6pK9QlirhJvlyW/d7ZcEczaulhoRcbAcQ+c9NYVriLTqQcjKxNceaVsObUMtgp+Rvbg4rjjcS9NixKBFIsao+0tPWqiJTViqSf05/0NQhncx+RTwgII49t/ZrpiBDQhqHBcLEKCxrBUxw6Ao4AXYFioUof9Mb8dZVgPgX5U+c/dhVIHcPuVh7KcPRE2/sWcu+IVvyG1Ce/IG8eRKMNP73BesLENO5kY/eV/zYFUDEwp3HbJVbbJji5Sk9+nNKAMv3lrSwSrwi0dUicmm9aOlUr6u+8OIx+oBNBecYgk83MmcPn2saXiOaTS6K2jzAUIMqQhW8jVxlR9JvZySRSYoltXFKLxdvQQb9iqD6O/oHQZ2ELq4ksqDLweeackf2V0ylyzyDGPLQqWsZsBQRn5I+2lDx3sB/glbLz/topcg+YfQcqhjx39XlVohIqrXY52bbY5yoboWbPHEmE/oUinFCGL/EBMxOyLCbw2y06+UojXBCmQqPUvhK2iH1h5P4kot5eF22tG9P87nmNqDqLKrP24ldqkvjD0m9yiXqiv8kBR0HjW0D76b8L4x3wctAoQAlHl41ZKHcfsraQJBXg+2Gog=="
              className="w-[8.9rem] h-16 object-contain hover:scale-110 hover:duration-100"
            />
          </a>
          </div>

        </div>
    </div>

  )
}

export default SmallFooter