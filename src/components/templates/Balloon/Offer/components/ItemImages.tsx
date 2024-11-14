"use client"

import Link from "next/link"
import { useMemo, useRef } from "react"

import { type IImageData } from "@/types/type"

import { NextImageMotion } from "@/components/common"
import IconFile_06 from "@/components/icons/IconFile_06"
import IconPlayCircle from "@/components/icons/IconPlayCircle"

import { cx } from "@/lib/cx"
import { dispatchPhotoCarousel, dispatchVideoStream } from "@/store"

import styles from "../styles/images.module.scss"

interface IProps {
  images: IImageData[]
}

function ItemImages({ images }: IProps) {
  const refImages = useRef<HTMLDivElement>(null)

  function to(value: boolean) {
    if (refImages.current) {
      if (value) {
        refImages.current.scrollBy({
          top: 0,
          left: -75,
          behavior: "smooth",
        })
      } else {
        refImages.current.scrollBy({
          top: 0,
          left: +75,
          behavior: "smooth",
        })
      }
    }
  }

  const files = useMemo(() => {
    const obj: Record<"img" | "file", IImageData[]> = {
      img: [],
      file: [],
    }

    for (const item of images) {
      if (item.attributes.mime.includes("image") || item.attributes.mime.includes("video")) {
        obj.img.push(item)
      } else {
        obj.file.push(item)
      }
    }

    return obj
  }, [images])

  const img_s = files.img
  const file_s = files.file

  return (
    <>
      <div className={file_s.length > 0 ? "w-full flex flex-col gap-2" : "hidden"}>
        {file_s.map((item) => (
          <Link
            key={`:item:file:key:${item.id}:`}
            href={item.attributes.url!}
            target="_blank"
            className="w-fit grid grid-cols-[1.5rem_minmax(0,1fr)] gap-1 items-center bg-btn-second-default p-1.5 pr-2 rounded-[1.125rem]"
          >
            <div className="w-6 h-6 p-3 relative *:w-4 *:h-4">
              <IconFile_06 />
            </div>
            <span className="text-sm font-medium text-text-primary line-clamp-1 text-ellipsis">{item.attributes.caption}</span>
          </Link>
        ))}
      </div>
      <div
        data-images-offer
        className={cx(
          styles.container,
          "scroll-no",
          "group",
          "w-[calc(100%_+_2rem)] h-[5.625rem] min-[5.625rem] relative overflow-hidden -mx-4",
        )}
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
        <div data-images className="h-[5.625rem] min-h-[5.625rem] w-full flex flex-row gap-2 overflow-hidden px-4" ref={refImages}>
          {img_s.map((item) => {
            if (item.attributes.mime.includes("image"))
              return (
                <NextImageMotion
                  key={`::${item.id}::photo::offer::`}
                  src={item?.attributes?.url!}
                  width={80}
                  alt={"offer-image"}
                  height={90}
                  className="rounded-lg"
                  onClick={(event) => {
                    event.stopPropagation()
                    const photos = []
                    for (const item of img_s) {
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
                  hash={item?.attributes?.blur}
                />
              )

            if (item.attributes.mime.includes("video"))
              return (
                <div key={`:d:s:a:${item.id}:p:p:`} className="relative rounded-lg overflow-hidden" data-video>
                  <video className="w-full h-full cursor-pointer object-cover">
                    <source src={item.attributes.url.replace("?format=webp", "")} type={item.attributes.mime} />
                  </video>
                  <button
                    type="button"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 *:w-8 *:h-8"
                    onClick={() => {
                      dispatchVideoStream(item.attributes.url, item.attributes.mime)
                    }}
                  >
                    <IconPlayCircle />
                  </button>
                </div>
              )

            return null
          })}
        </div>
        <button
          className={cx(
            "absolute left-1 top-1/2 -translate-y-1/2 border-none bg-BG-second w-8 h-8 rounded-2xl p-1.5 ",
            img_s.length < 4 ? "hidden" : "max-md:hidden opacity-0 flex items-center justify-center group-hover:opacity-100",
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
            "absolute right-1 top-1/2 -translate-y-1/2 border-none bg-BG-second w-8 h-8 rounded-2xl p-1.5",
            img_s.length < 4 ? "hidden" : "opacity-0 max-md:hidden flex items-center justify-center group-hover:opacity-100",
          )}
          onClick={(event) => {
            event.stopPropagation()
            to(false)
          }}
        >
          <img className="w-5 h-5" src="/svg/chevron-right.svg" alt="left" width={20} height={20} />
        </button>
      </div>
    </>
  )
}

ItemImages.displayName = "ItemImages"
export default ItemImages
