import Link from "next/link"
import { type DispatchWithoutAction, useEffect, useMemo, useRef, useState } from "react"

import { type IImageData } from "@/types/type"
import { type INotes } from "@/services/notes/types"

import DeletePopup from "./DeletePopup"
import { NextImageMotion } from "@/components/common"
import ComponentButtonLike from "./ComponentButtonLike"
import IconComment from "@/components/icons/IconComment"
import IconFile_06 from "@/components/icons/IconFile_06"
import IconPlayCircle from "@/components/icons/IconPlayCircle"
import IconChevronDown from "@/components/icons/IconChevronDown"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"
import { useContextPostsComments } from "./ContextComments"
import { dispatchPhotoCarousel, dispatchVideoStream, useBalloonPost } from "@/store"

function ItemNote({ note, handleToComments }: { note: INotes; handleToComments: DispatchWithoutAction }) {
  const { archive } = useBalloonPost(({ data }) => data) ?? {}
  const { description, created, images = [], id } = note ?? {}
  const refImages = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLLIElement>(null)
  const refP = useRef<HTMLParagraphElement>(null)
  const [expand, setExpand] = useState(false)
  const { onWriteResponse, noteCurrent, countCommentNote } = useContextPostsComments()

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

  useEffect(() => {
    if (noteCurrent) {
      if (noteCurrent === id) {
        if (ref.current) {
          ref.current.scrollIntoView({ block: "center", behavior: "smooth" })
        }
      }
    }
  }, [noteCurrent, id])

  function handleExpand() {
    setExpand((_) => !_)
  }

  const [ph, setPh] = useState<{ scrollHeight: number; clientHeight: number }>({
    scrollHeight: refP.current?.scrollHeight!,
    clientHeight: refP.current?.clientHeight!,
  })

  useEffect(() => {
    requestAnimationFrame(() => {
      if (refP.current) {
        setPh({
          scrollHeight: refP.current?.scrollHeight!,
          clientHeight: refP.current?.clientHeight!,
        })
      }
    })
  }, [expand])

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

  return (
    <li
      className={cx(
        "w-full flex flex-col p-4 gap-3 border border-solid  rounded-2xl",
        noteCurrent === id ? "border-element-accent-1" : "border-element-grey-light",
      )}
      ref={ref}
    >
      <div className="w-full flex flex-row items-center justify-between">
        <time dateTime={created} className="text-text-secondary text-xs font-normal">
          {daysAgo(created)}
        </time>
        <DeletePopup note={note} />
      </div>
      <p
        className={cx(
          "text-text-primary whitespace-pre-wrap text-sm font-normal",
          !description && "hidden",
          expand ? "line-clamp-none" : "line-clamp-4 text-ellipsis",
        )}
        ref={refP}
      >
        {description}
      </p>
      <a
        className={cx(
          "text-text-secondary text-sm font-normal hover:text-text-accent cursor-pointer",
          !expand && ph.clientHeight === ph.scrollHeight && "hidden",
        )}
        onClick={handleExpand}
      >
        {expand ? "Скрыть" : "Читать всё"}
      </a>
      <div className={cx("w-full flex-col gap-2", files.file.length > 0 ? "flex" : "hidden")}>
        {files.file.map((item) => (
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
        data-images
        className={cx("-mx-4 w-[calc(100%_+_2rem)] relative overflow-hidden group", files.img.length ? "flex" : "hidden")}
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
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            to(true)
          }}
          className={cx(
            "w-8 h-8 rounded-full absolute top-1/2 -translate-y-1/2 left-[1.875rem] bg-BG-second p-1.5 *:w-5 *:h-5 *:rotate-90",
            "hidden md:flex opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 items-center justify-center",
            files.img.length < 4 && "!hidden",
          )}
        >
          <IconChevronDown />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            to(false)
          }}
          className={cx(
            "w-8 h-8 rounded-full absolute top-1/2 -translate-y-1/2 right-[1.875rem] bg-BG-second p-1.5 *:w-5 *:h-5 *:-rotate-90",
            "hidden md:flex opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 items-center justify-center ",
            files.img.length < 4 && "!hidden",
          )}
        >
          <IconChevronDown />
        </button>
        <div className="w-full flex flex-row gap-2 overflow-hidden overflow-x-scroll px-4" ref={refImages}>
          {files.img.map((item) => {
            if (item.attributes.mime.includes("image"))
              return (
                <NextImageMotion
                  key={`::${item.id}::photo::post::`}
                  src={item?.attributes?.url!}
                  height={540}
                  width={480}
                  alt={"offer-image"}
                  className="rounded-lg cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation()
                    const photos = []
                    for (const item of files.img) {
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
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 *:w-12 *:h-12"
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
      </div>
      <div className="w-full flex flex-row flex-nowrap gap-3 mt-1">
        <ComponentButtonLike id={id} />
        <button
          type="button"
          onClick={() => {
            if (!archive) {
              onWriteResponse(note)
            }
            handleToComments()
          }}
          className={cx("gap-1 px-2.5 h-[1.875rem] rounded-[0.9375rem] bg-grey-field", "flex flex-row items-center justify-start")}
        >
          <div className="w-5 h-5 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
            <IconComment />
          </div>
          <span className="text-text-secondary text-xs font-medium">{countCommentNote(id)}</span>
        </button>
      </div>
    </li>
  )
}

ItemNote.displayName = "ItemNote"
export default ItemNote
