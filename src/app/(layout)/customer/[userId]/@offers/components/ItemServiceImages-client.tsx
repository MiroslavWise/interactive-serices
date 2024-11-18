"use client"

import { useMemo, useRef } from "react"

import { type IImageData } from "@/types/type"

import { NextImageMotion } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchPhotoCarousel, dispatchVideoStream } from "@/store"
import IconPlayCircle from "@/components/icons/IconPlayCircle"

function ItemServiceImagesClient({ images }: { images: IImageData[] }) {
  const refImages = useRef<HTMLDivElement>(null)

  const items = useMemo(() => {
    const array = []

    for (const item of images) {
      if (item.attributes.mime.includes("image") || item.attributes.mime.includes("video")) {
        array.push(item)
      }
    }

    return array
  }, [images])

  return (
    <section
      className={cx("not-y-scroll", "w-full h-full px-4 flex flex-row gap-2 flex-nowrap")}
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
      {items.map((item) => {
        if (item.attributes.mime.includes("image"))
          return (
            <NextImageMotion
              key={`::key::image::offer::${item.id}::`}
              src={item.attributes.url}
              className="h-[4.875rem] rounded-lg w-[4.375rem] aspect-[4.375/4.875] cursor-pointer"
              alt="offer-image"
              width={140}
              height={156}
              onClick={(event) => {
                event.stopPropagation()
                const photos = []
                for (const item of items) {
                  if (item.attributes.mime.includes("image")) {
                    photos.push({
                      url: item?.attributes?.url!,
                      id: item?.id,
                      hash: item?.attributes?.blur,
                    })
                  }
                }
                dispatchPhotoCarousel({
                  visible: true,
                  photos: photos,
                  idPhoto: item?.id!,
                })
              }}
              hash={item.attributes?.blur}
            />
          )

        if (item.attributes.mime.includes("video"))
          return (
            <div
              key={`:d:s:a:${item.id}:p:p:`}
              className="relative rounded-lg overflow-hidden h-[4.875rem] w-[4.375rem] aspect-[4.375/4.875]"
              data-video
            >
              <video className="w-full h-full cursor-pointer object-cover absolute inset-0">
                <source src={item.attributes.url.replace("?format=webp", "")} type={item.attributes.mime} />
                <source src={item.attributes.url.replace("?format=webp", "")} type="video/webm" />
              </video>
              <button
                type="button"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 *:w-8 *:h-8"
                onClick={(event) => {
                  event.stopPropagation()
                  dispatchVideoStream(item.attributes.url, item.attributes.mime)
                }}
              >
                <IconPlayCircle />
              </button>
            </div>
          )

        return null
      })}
    </section>
  )
}

ItemServiceImagesClient.displayName = "ItemServiceImagesClient"
export default ItemServiceImagesClient
