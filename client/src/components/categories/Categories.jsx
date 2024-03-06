import React from 'react'

export const Categories = () => {
    return (
        <ul className='flex gap-4 md:flex-col text-lg'>
            <li className='bg-gray-500 px-6 py-10 text-white w-full cursor-pointer hover:bg-red-500 transition-all text-center min-w-[145px]'><span className="">Tümü</span></li>
            <li className='bg-gray-500 px-6 py-10 text-white w-full cursor-pointer hover:bg-red-500 transition-all text-center min-w-[145px]'><span className="">Yiyecek</span></li>
            <li className='bg-gray-500 px-6 py-10 text-white w-full cursor-pointer hover:bg-red-500 transition-all text-center min-w-[145px]'><span className="">İçecek</span></li>
            <li className='bg-gray-500 px-6 py-10 text-white w-full cursor-pointer hover:bg-red-500 transition-all text-center min-w-[145px]'><span className="">Meyve</span></li>
            <li className='bg-gray-500 px-6 py-10 text-white w-full cursor-pointer hover:bg-red-500 transition-all text-center min-w-[145px]'><span className="">Atıştırmalık</span></li>
            <li className='bg-gray-500 px-6 py-10 text-white w-full cursor-pointer hover:bg-red-500 transition-all text-center min-w-[145px]'><span className="">Kahvaltılık</span></li>
            <li className='bg-gray-500 px-6 py-10 text-white w-full cursor-pointer hover:bg-red-500 transition-all text-center min-w-[145px]'><span className="">Dondurma</span></li>
            <li className='bg-gray-500 px-6 py-10 text-white w-full cursor-pointer hover:bg-red-500 transition-all text-center min-w-[145px]'><span className="">Et & Balık</span></li>
        </ul>
    )
}
