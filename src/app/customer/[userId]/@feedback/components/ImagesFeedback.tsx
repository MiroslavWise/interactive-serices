"use client"

import { NextImageMotion } from "@/components/common"
import { cx } from "@/lib/cx"
import { dispatchPhotoCarousel } from "@/store"
import { type IImageData } from "@/types/type"
import { useRef } from "react"

function ImagesFeedback({ images }: { images: IImageData[] }) {
  const refImages = useRef<HTMLDivElement>(null)

  if (ImagesFeedback.length === 0) return null

  return (
    <div
      className={cx(
        "scroll-no",
        "w-[calc(100%_+_2rem)] h-[4.875rem] -mx-4 min-h-[4.875rem] max-h-[4.875rem] relative overflow-hidden !px-0",
      )}
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
      <div ref={refImages} className={cx("not-y-scroll", "w-full h-full px-4 flex flex-row gap-2 flex-nowrap")}>
        {images.map((item) => (
          <NextImageMotion
            key={`::key::image::offer::${item.id}::`}
            src={item.attributes.url}
            className="h-[4.875rem] rounded-lg w-[4.375rem] aspect-[4.375/4.875] cursor-pointer"
            alt="offer-image"
            width={140}
            height={156}
            onClick={(event) => {
              event.stopPropagation()
              const photos = images.map((item) => ({
                url: item?.attributes?.url!,
                id: item?.id,
              }))
              dispatchPhotoCarousel({
                visible: true,
                photos: photos,
                idPhoto: item?.id!,
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}

ImagesFeedback.displayName = "ImagesFeedback"
export default ImagesFeedback
