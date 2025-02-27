import Link from "next/link"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"

import IconActivity from "@/components/icons/IconActivity"
import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { useNavigator } from "@/helpers/hooks/use-navigator"
import { dispatchAddTestimonials, dispatchComplaintModalPost, dispatchMapCoordinates, dispatchUpdatePost, useAuth } from "@/store"
import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"

interface IProps {
  post: IPosts
}

const TITLE_UPDATE = "Редактировать"
const TITLE_TO_MAP = "Показать на карте"
const TITLE_COMPLAINT = "Пожаловаться"
const TITLE_SHARE = "Поделиться"
const LABEL_REVIEW = "Оставить отзыв"

function ItemHeaderDotsPost({ post }: IProps) {
  const [open, setOpen, ref] = useOutsideClickEvent()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { id, addresses, title, userId: userIdPost, archive } = post ?? {}
  const isEdit = useIsAllowAccess("PATCH", "posts")

  const onShare = useNavigator({
    url: `/post/${id}`,
    title: title ?? "",
  })

  const geoData = addresses[0] ?? {}

  function onReview(event: any) {
    event.stopPropagation()
    dispatchAddTestimonials({ post, provider: EnumTypeProvider.POST })
  }

  return (
    <div className="w-6 h-6 relative flex" ref={ref}>
      <button
        type="button"
        className="w-6 h-6 relative p-3 text-element-grey-light hover:text-element-accent-1"
        onClick={(event) => {
          event.stopPropagation()
          setOpen((_) => !_)
        }}
      >
        <IconSprite id="dots-horizontal" className="w-4 h-4" />
      </button>
      <article
        className={cx(
          "absolute top-[calc(100%_+_0.25rem)] right-0 md:w-[13.5rem] flex flex-col gap-0.5 rounded-xl bg-BG-second shadow-box-down p-5 md:p-3",
          open ? "!z-10 !opacity-100 !visible" : "-z-10 opacity-0 invisible",
          "*:grid *:grid-cols-[1.25rem_minmax(0,1fr)] *:gap-2.5 *:items-center *:py-2 *:px-1.5 *:rounded-md",
          "[&>*>span]:text-text-primary [&>*>span]:text-sm [&>*>span]:font-normal [&>*>span]:text-left [&>*>span]:whitespace-nowrap",
          "[&>*>div]:w-5 [&>*>div]:h-5  [&>*>div]:relative  [&>*>div]:p-2.5",
          "hover:*:bg-grey-field",
        )}
      >
        <a
          title={TITLE_UPDATE}
          aria-label={TITLE_UPDATE}
          aria-labelledby={TITLE_UPDATE}
          className={(userId === userIdPost || isEdit) && !archive ? "grid" : "!hidden"}
          onClick={(event) => {
            event.stopPropagation()
            if (userId === userIdPost && !archive) {
              dispatchUpdatePost(post)
            }
          }}
        >
          <div className="w-5 h-5 flex items-center justify-center relative p-2.5">
            <IconSprite id="icon-edit" className="w- h-5 aspect-square" />
          </div>
          <span className="text-text-primary text-sm font-normal text-left">{TITLE_UPDATE}</span>
        </a>
        <Link
          href={{ pathname: "/" }}
          title={TITLE_TO_MAP}
          aria-label={TITLE_TO_MAP}
          aria-labelledby={TITLE_TO_MAP}
          onClick={() => {
            if (geoData) {
              dispatchMapCoordinates({
                zoom: 17,
                coordinates: geoData?.coordinates?.split(" ")?.map(Number),
              })
            }
          }}
        >
          <div>
            <IconSprite id="icon-default-map" className="w-5 h-5 text-text-primary" />
          </div>
          <span>{TITLE_TO_MAP}</span>
        </Link>
        <a title={TITLE_SHARE} aria-label={TITLE_SHARE} aria-labelledby={TITLE_SHARE} onClick={onShare}>
          <div
            className={cx(
              "w-5 h-5 flex items-center justify-center relative p-2.5",
              "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:fill-text-primary",
            )}
          >
            <IconActivity />
          </div>
          <span className="text-text-primary text-sm font-normal text-left">{TITLE_SHARE}</span>
        </a>
        <a title={LABEL_REVIEW} aria-label={LABEL_REVIEW} aria-labelledby={LABEL_REVIEW} onClick={onReview}>
          <div className="w-5 h-5 flex items-center justify-center relative p-2.5">
            <IconSprite id="icon-star" className="text-text-primary w-5 h-5" />
          </div>
          <span className="text-text-primary text-sm font-normal text-left">{LABEL_REVIEW}</span>
        </a>
        <a
          title={TITLE_COMPLAINT}
          aria-label={TITLE_COMPLAINT}
          aria-labelledby={TITLE_COMPLAINT}
          onClick={(event) => {
            console.log("onClick TITLE_COMPLAINT: ")
            event.stopPropagation()
            event.preventDefault()
            dispatchComplaintModalPost({ post: post })
            setOpen(false)
          }}
        >
          <div>
            <IconSprite id="icon-complaint" className="text-text-error w-5 h-5" />
          </div>
          <span className="!text-text-error">{TITLE_COMPLAINT}</span>
        </a>
      </article>
    </div>
  )
}

ItemHeaderDotsPost.displayName = "ItemHeaderDotsPost"
export default ItemHeaderDotsPost
