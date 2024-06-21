"use client"

import { memo, useRef } from "react"

import type { IImageData } from "@/store/types/useAuthState"

import { NextImageMotion } from "@/components/common"

import { dispatchPhotoCarousel } from "@/store"

import styles from "../styles/images.module.scss"
import { cx } from "@/lib/cx"

function ItemImages({ images, notTouch }: { images: IImageData[]; notTouch?: boolean }) {
  const refImages = useRef<HTMLDivElement>(null)

  // function to(value: boolean) {
  //   if (refImages.current) {
  //     if (value) {
  //       refImages.current.scrollBy({
  //         top: 0,
  //         left: -75,
  //         behavior: "smooth",
  //       })
  //     } else {
  //       refImages.current.scrollBy({
  //         top: 0,
  //         left: +75,
  //         behavior: "smooth",
  //       })
  //     }
  //   }
  // }

  return (
    <div
      data-images-offer
      className={cx(styles.container, "scroll-no", "group", "w-full h-[5.625rem] min-[5.625rem] relative overflow-hidden !px-0")}
      onTouchMove={(event) => {
        event.stopPropagation()
        event.preventDefault()
      }}
      onWheel={(event) => {
        event.stopPropagation()
        event.preventDefault()
        if (refImages.current) {
          refImages.current.scrollBy({
            top: 0,
            left: event.deltaY,
            behavior: "smooth",
          })
        }
      }}
    >
      <div data-images className="h-[5.625rem] min-h-[5.625rem] w-full flex flex-row gap-2 overflow-hidden px-5" ref={refImages}>
        {images.map((item) => (
          <NextImageMotion
            key={`::${item.id}::photo::offer::`}
            src={item?.attributes?.url!}
            width={80}
            alt={"offer-image"}
            height={90}
            onClick={(event) => {
              event.stopPropagation()
              const photos = images.map((item) => ({
                url: item?.attributes?.url!,
                id: item?.id,
              }))
              if (!notTouch) {
                dispatchPhotoCarousel({
                  visible: true,
                  photos: photos,
                  idPhoto: item?.id!,
                })
              }
            }}
          />
        ))}
      </div>
      {/* <button
        className={cx(
          "max-md:hidden opacity-0 absolute left-1 top-1/2 -translate-y-1/2 border-none bg-BG-second w-8 h-8 rounded-2xl flex items-center justify-center p-0.375 group-hover:opacity-100",
          images?.length < 4 && "!hidden",
        )}
        onClick={(event) => {
          event.stopPropagation()
          to(true)
        }}
      >
        <img className="w-5 h-5" src="/svg/chevron-left.svg" alt="left" width={20} height={20} />
      </button>
      <button
        className={cx(
          "max-md:hidden opacity-0 absolute right-1 top-1/2 -translate-y-1/2 border-none bg-BG-second w-8 h-8 rounded-2xl flex items-center justify-center p-0.375 group-hover:opacity-100",
          images?.length < 4 && "!hidden",
        )}
        onClick={(event) => {
          event.stopPropagation()
          to(false)
        }}
      >
        <img className="w-5 h-5" src="/svg/chevron-right.svg" alt="left" width={20} height={20} />
      </button> */}
    </div>
  )
}

ItemImages.displayName = "ItemImages"
export default memo(ItemImages)
