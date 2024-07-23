"use client"

import { setPrevPhotoCarousel, setNextPhotoCarousel } from "@/store"

export const ButtonPrevNext = () => {
  return (
    <>
      <div
        className="absolute top-0 bottom-0 w-[7%] h-full cursor-pointer transition-all hover:bg-[#ffffff33] left-0"
        onClick={setPrevPhotoCarousel}
      ></div>
      <div
        className="absolute top-0 bottom-0 w-[7%] h-full cursor-pointer transition-all hover:bg-[#ffffff33] right-0"
        onClick={setNextPhotoCarousel}
      ></div>
    </>
  )
}
