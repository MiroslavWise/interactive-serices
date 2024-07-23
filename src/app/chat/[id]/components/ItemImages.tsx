"use client"

import { ReactNode } from "react"

import { type IImageData } from "@/store/types/useAuthState"

import { ImageStatic, NextImageMotion } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchPhotoCarousel } from "@/store"

interface IProps {
  images: IImageData[]
  strings: string[]
  children: ReactNode
}

function ItemImages({ images, children, strings }: IProps) {
  function onOpenView(id: number) {
    const photos = images.map((item) => ({
      url: item?.attributes?.url!,
      id: item?.id,
    }))
    dispatchPhotoCarousel({
      visible: true,
      photos: photos,
      idPhoto: id!,
    })
  }

  length = images.length || strings.length

  return (
    <article
      className={cx(
        "gap-0.5 md:max-w-[23.375rem] max-w-[86%] overflow-hidden rounded-2xl relative",
        length === 0 ? "!hidden" : "grid w-full",
        length === 1 && "md:!max-w-80 !max-w-[76%] [&>div]:aspect-[18.125/20.25]",
        length === 2 && "grid-cols-2 first:[&>div]:rounded-l-2xl last:[&>div]:rounded-r-2xl [&>div]:aspect-[10.375/11.5625]",
        length === 3 &&
          "grid-cols-2 rounded-2xl first:[&>div]:col-[auto_/_span_2] [&>div]:aspect-[10.375/11.5625] first:[&>div]:aspect-[20.875/15]",
        length === 4 && "grid-cols-2 [&>div]:aspect-[10.375/11.5625]",
        length === 5 && "grid-cols-4 [&>div]:aspect-[5.125/5.3125] first:[&>div]:aspect-[20.875/15] first:[&>div]:col-[auto_/_span_4]",
        length === 6 &&
          "grid-cols-4 [&>div]:aspect-[5.125/5.3125] [&>div:nth-child(-n+2)]:aspect-[10.375/11.5625] [&>div:nth-child(-n+2)]:col-[auto_/_span_2]",
        length === 7 &&
          "grid-cols-6 [&>div:nth-child(-n+4)]:col-[auto_/_span_3] [&>div:nth-child(-n+4)]:aspect-[10.375/11.5625] [&>div:nth-child(n+5)]:aspect-[6.875/5.3125] [&>div:nth-child(n+5)]:col-[auto_/_span_2]",
        length === 8 &&
          "grid-cols-4 [&>div:nth-child(-n+4)]:col-[auto_/_span_2] [&>div:nth-child(-n+4)]:aspect-[10.375/11.5625] [&>div:nth-child(n+5)]:aspect-[5.125/5.3125]",
        length === 9 &&
          "grid-cols-10 [&>div:nth-child(-n+4)]:col-[auto_/_span_5] [&>div:nth-child(-n+4)]:aspect-[10.375/11.5625] [&>div:nth-child(n+5)]:aspect-[4.075/4.0625] [&>div:nth-child(n+5)]:col-[auto_/_span_2]",
        length === 10 &&
          "grid-cols-6 [&>div:nth-child(-n+4)]:col-[auto_/_span_3] [&>div:nth-child(-n+4)]:aspect-[10.375/11.5625] [&>div:nth-child(n+5)]:aspect-[3.375/3.4375]",
      )}
    >
      {strings.map((item, index) => (
        <div key={`::item::image::${index}::string::`} className="w-full h-auto relative cursor-pointer">
          <ImageStatic
            src={item}
            alt="offer-image"
            width={200}
            height={200}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          />
        </div>
      ))}
      {images.map((item) => (
        <div key={`::item::image::${item.id}::`} className="w-full h-auto relative cursor-pointer" onClick={() => onOpenView(item.id)}>
          <NextImageMotion
            src={item.attributes.url}
            alt="offer-image"
            width={380}
            height={380}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          />
        </div>
      ))}
      {children}
    </article>
  )
}

ItemImages.displayName = "ItemImages"
export default ItemImages
