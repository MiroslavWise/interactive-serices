import { useQuery } from "@tanstack/react-query"
import { type DispatchWithoutAction, useEffect, useRef, useState } from "react"

import { type INotes } from "@/services/notes/types"

import DeletePopup from "./DeletePopup"
import IconLike from "@/components/icons/IconLike"
import { NextImageMotion } from "@/components/common"
import IconComment from "@/components/icons/IconComment"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"
import { useContextPostsComments } from "./ContextComments"
import { getLikes, getLikeTargetId, postLike } from "@/services"
import { dispatchPhotoCarousel, useAuth, useBalloonPost } from "@/store"

function ItemNote({ note, handleToComments }: { note: INotes; handleToComments: DispatchWithoutAction }) {
  const { archive } = useBalloonPost(({ data }) => data) ?? {}
  const { description, created, images = [], id } = note ?? {}
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const getId = () => getLikeTargetId("post", id!)
  const [count, setCount] = useState(0)
  const [myLike, setMyLike] = useState(false)
  const [loading, setLoading] = useState(false)
  const refImages = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLLIElement>(null)

  const { onWriteResponse, noteCurrent } = useContextPostsComments()

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

  const {
    data: dataLikesMy,
    isLoading: isLoadingLikesMy,
    isPending: isPendingLikesMy,
  } = useQuery({
    queryFn: getLikes,
    queryKey: ["likes", `user=${userId}`],
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
        (item) => Number(item?.id) === Number(id) && Number(item?.userId) === Number(userId) && item.provider === "post",
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
      }).then(async () => {
        setLoading(false)
        setCount((_) => (myLike ? _ - 1 : _ + 1))
        setMyLike((_) => !_)
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
      <p className={cx("text-text-primary whitespace-pre-wrap text-sm font-normal", !!description ? "" : "hidden")}>{description}</p>
      <div
        data-images
        className={cx("-mx-4 w-[calc(100%_+_2rem)] relative overflow-hidden", images.length ? "flex" : "hidden")}
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
        <div className="w-full flex flex-row gap-2 overflow-hidden overflow-x-scroll px-4" ref={refImages}>
          {images.map((item) => (
            <NextImageMotion
              key={`::${item.id}::photo::post::`}
              src={item?.attributes?.url!}
              width={160}
              alt={"offer-image"}
              className="rounded-lg cursor-pointer"
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
      <div className="w-full flex flex-row flex-nowrap gap-3 mt-1">
        <button
          type="button"
          className="gap-1 flex flex-row items-center justify-start px-2.5 h-[1.875rem] rounded-[0.9375rem] bg-grey-field"
          onClick={handle}
        >
          <div className="w-5 h-5 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
            <IconLike is={myLike} />
          </div>
          <span className={cx("text-xs font-medium", myLike ? "text-text-accent" : "text-text-secondary")}>{count}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            onWriteResponse(note)
            handleToComments()
          }}
          className={cx(
            "gap-1 px-2.5 h-[1.875rem] rounded-[0.9375rem] bg-grey-field",
            archive ? "hidden" : "flex flex-row items-center justify-start",
          )}
        >
          <div className="w-5 h-5 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
            <IconComment />
          </div>
        </button>
      </div>
    </li>
  )
}

ItemNote.displayName = "ItemNote"
export default ItemNote
