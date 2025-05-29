"use client"

import { cx } from "@/lib/cx"
import { setPrevPhotoCarousel, setNextPhotoCarousel } from "@/store"

export const ButtonPrevNext = () => {
  return (
    <>
      <div
        className={cx("absolute top-0 bottom-0 w-[7%] h-full cursor-pointer transition-all hover:bg-[#ffffff33] left-0 max-md:hidden")}
        onClick={setPrevPhotoCarousel}
      ></div>
      <div
        className={cx("absolute top-0 bottom-0 w-[7%] h-full cursor-pointer transition-all hover:bg-[#ffffff33] right-0 max-md:hidden")}
        onClick={setNextPhotoCarousel}
      ></div>
    </>
  )
}
