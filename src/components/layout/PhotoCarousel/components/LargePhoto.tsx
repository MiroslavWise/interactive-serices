"use client"

import { useSwipeable } from "react-swipeable"

import { NextImageMotion } from "@/components/common"

import { useVisiblePhotosCarousel, setNextPhotoCarousel, setPrevPhotoCarousel } from "@/store"

import { cx } from "@/lib/cx"

export function LargePhoto() {
  const currentPhoto = useVisiblePhotosCarousel(({ currentPhoto }) => currentPhoto)
  const photos = useVisiblePhotosCarousel(({ photos }) => photos)

  const handlers = useSwipeable({
    onSwipedLeft: setNextPhotoCarousel,
    onSwipedRight: setPrevPhotoCarousel,
  })

  return photos?.map((item) => (
    <div
      className={cx(
        "absolute top-[10%] left-[15%] right-[15%] bottom-1/3 flex items-center justify-center transition-all",
        item?.id === currentPhoto?.id ? "opacity-100 visible z-10" : "opacity-0 invisible -z-10",
      )}
      {...handlers}
      key={`::${item?.id}::current::photo::`}
    >
      <NextImageMotion
        className="h-full w-full !object-contain cursor-pointer"
        src={item?.url!}
        onClick={setNextPhotoCarousel}
        alt="offer-image"
        height={590}
        width={960}
      />
    </div>
  ))
}
