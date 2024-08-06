import { useRef } from "react"

import { type IImageData } from "@/types/type"

import { NextImageMotion } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchPhotoCarousel } from "@/store"

function ItemServiceImages({ images = [] }: { images: IImageData[] }) {
  const refImages = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cx(
        "scroll-no",
        !images.length && "!hidden",
        "w-[calc(100%_+_2rem)] h-[4.875] -mx-4 min-h-[4.875] max-h-[4.875] relative overflow-hidden !px-0",
      )}
    >
      <section
        className={cx(
          "not-y-scroll",
          "w-full h-full px-4 flex flex-row gap-2 flex-nowrap",
          "[&>img]:aspect-[4.375/4.875] [&>img]:w-[4.375rem] [&>img]:h-[4.875rem] [&>img]:rounded-lg [&>img]:cursor-pointer",
        )}
        ref={refImages}
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
        {images.map((item) => (
          <NextImageMotion
            key={`::key::image::offer::${item.id}::`}
            src={item.attributes.url}
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
      </section>
    </div>
  )
}

ItemServiceImages.displayName = "ItemServiceImages"
export default ItemServiceImages
