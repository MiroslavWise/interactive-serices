import { useQuery } from "@tanstack/react-query"
import { type DispatchWithoutAction, useEffect, useMemo, useRef, useState } from "react"

import { type INotes } from "@/services/notes/types"

import DeletePopup from "./DeletePopup"
import IconLike from "@/components/icons/IconLike"
import { NextImageMotion } from "@/components/common"
import IconComment from "@/components/icons/IconComment"
import IconChevronDown from "@/components/icons/IconChevronDown"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { useContextPostsComments } from "./ContextComments"
import { getLikes, getLikeTargetId, postLike } from "@/services"
import { dispatchPhotoCarousel, useAuth, useBalloonPost } from "@/store"
import { IImageData } from "@/types/type"
import Link from "next/link"
import IconFile_06 from "@/components/icons/IconFile_06"

function ItemNote({ note, handleToComments }: { note: INotes; handleToComments: DispatchWithoutAction }) {
  const { archive } = useBalloonPost(({ data }) => data) ?? {}
  const { description, created, images = [], id } = note ?? {}
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const getId = () => getLikeTargetId("post", id!)
  const [count, setCount] = useState(0)
  const [myLike, setMyLike] = useState(false)
  const [loading, setLoading] = useState(false)
  const { on } = useToast()
  const refImages = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLLIElement>(null)
  const refP = useRef<HTMLParagraphElement>(null)
  const [expand, setExpand] = useState(false)
  const [errorLike, setErrorLike] = useState(false)

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

  const {
    data: dataLikesMy,
    isLoading: isLoadingLikesMy,
    isPending: isPendingLikesMy,
  } = useQuery({
    queryFn: getLikes,
    queryKey: ["likes", { userId: userId }],
    enabled: !!userId,
    refetchOnMount: true,
  })

  const { data, isLoading, isPending } = useQuery({
    queryFn: getId,
    queryKey: ["likes", { provider: "post", id: id }],
    enabled: !!id,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (!!data?.data) {
      setCount(data?.data || 0)
    }
  }, [data])

  useEffect(() => {
    if (userId && dataLikesMy?.data && id) {
      const isLike = dataLikesMy?.data?.some(
        (item) => item.provider === "post" && item?.id === Number(id) && Number(item?.userId) === Number(userId),
      )

      setMyLike(isLike)
    }
  }, [userId, dataLikesMy?.data, id])

  function handle() {
    if (!loading && !!userId && !isLoading && !isLoadingLikesMy && !isPendingLikesMy && !isPending) {
      setLoading(true)
      postLike({
        id: id!,
        provider: "post",
      }).then(async (response) => {
        if (!!response?.data || typeof response?.data === "number") {
          setCount((_) => (myLike ? _ - 1 : _ + 1))
          setMyLike((_) => !_)
        } else {
          setErrorLike(true)
          on({
            message: "У нас какая-то ошибка. Мы работаем над исправлением",
          })
        }
        setLoading(false)
      })
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
      if (item.attributes.mime.includes("image")) {
        obj.img.push(item)
      } else {
        obj.file.push({
          ...item,
          attributes: {
            ...item.attributes,
            url: item.attributes.url.split("?")[0],
          },
        })
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
          {files.img.map((item) => (
            <NextImageMotion
              key={`::${item.id}::photo::post::`}
              src={item?.attributes?.url!}
              height={540}
              width={480}
              alt={"offer-image"}
              className="rounded-lg cursor-pointer"
              onClick={(event) => {
                event.stopPropagation()
                const photos = files.img.map((item) => ({
                  url: item?.attributes?.url!,
                  id: item?.id,
                  hash: item?.attributes?.blur,
                }))
                dispatchPhotoCarousel({
                  visible: true,
                  photos: photos,
                  idPhoto: item?.id!,
                })
              }}
              hash={item?.attributes?.blur}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-row flex-nowrap gap-3 mt-1">
        <button
          type="button"
          className="gap-1 flex flex-row items-center justify-start px-2.5 h-[1.875rem] rounded-[0.9375rem] bg-grey-field"
          onClick={handle}
        >
          <div
            className={cx(
              "w-5 h-5 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5",
              errorLike && "[&>svg>path]:fill-text-error",
            )}
          >
            <IconLike is={myLike} />
          </div>
          <span className={cx("text-xs font-medium", myLike ? "text-text-accent" : "text-text-secondary")}>{count}</span>
        </button>
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
