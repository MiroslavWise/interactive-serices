import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"

import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { daysAgo, useOutsideClickEvent } from "@/helpers"
import { useNavigator } from "@/helpers/hooks/use-navigator"
import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"
import { dispatchAddTestimonials, dispatchComplaintModalPost, dispatchUpdatePost, displayAddAdvert, useAuth } from "@/store"

const TITLE_UPDATE = "Редактировать"
const TITLE_SHARE = "Поделиться"
const TITLE_COMPLAINT = "Пожаловаться"
const LABEL_ADD_ADVERT = "Добавить рекламу"
const LABEL_REVIEW = "Оставить отзыв"

interface IProps {
  post: IPosts
}

function ComponentDots({ post }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { created, id, title, userId: userIdPost, archive, company } = post ?? {}
  const [visible, setVisible, ref] = useOutsideClickEvent()
  const isEdit = useIsAllowAccess("PATCH", "posts", userIdPost)
  const isManager = useIsAllowAccess("PATCH", "companies")

  const isAdvertising = !!company

  const onShare = useNavigator({
    url: `/post/${id}`,
    title: title! ?? "",
  })

  function onReview() {
    dispatchAddTestimonials({ post, provider: EnumTypeProvider.POST })
  }

  return (
    <div data-time-dots className="w-full h-auto flex items-center justify-between relative">
      <time dateTime={created} className="w-full text-text-secondary text-start text-xs font-normal">
        {daysAgo(created)}
      </time>
      <article
        className={cx(
          "absolute top-1/2 right-8 -translate-y-1/2 h-6 rounded-xl bg-text-secondary items-center justify-center px-3 py-1",
          archive ? "flex" : "hidden",
        )}
      >
        <span className=" text-text-button text-xs font-normal">Завершено</span>
      </article>
      <div className="relative h-4 w-4 border-none outline-none bg-transparent flex items-center justify-center z-[91]">
        <button
          type="button"
          className="absolute bg-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 z-50 *:h-4 *:w-4 flex items-center justify-center text-element-grey-light hover:text-element-accent-1"
          ref={ref}
          onClick={(event) => {
            event.stopPropagation()
            setVisible((prev) => !prev)
          }}
        >
          <IconSprite id="dots-horizontal" />
        </button>
        <article
          className={cx(
            "absolute top-[calc(100%_+_0.25rem)] right-0 rounded-xl p-3 bg-BG-second w-[13.5rem] flex flex-col gap-0.5 opacity-0 invisible z-[120] shadow-box-down",
            "*:grid *:grid-cols-[1.25rem_minmax(0,1fr)] *:gap-2.5 *:items-center *:py-2 *:px-1.5 *:rounded-md",
            "[&>*>span]:text-text-primary [&>*>span]:text-sm [&>*>span]:font-normal [&>*>span]:text-left [&>*>span]:whitespace-nowrap",
            "[&>*>div]:w-5 [&>*>div]:h-5  [&>*>div]:relative  [&>*>div]:p-2.5 hover:*:bg-grey-field",
            visible && "!opacity-100 !visible",
          )}
        >
          <a
            title={TITLE_UPDATE}
            aria-label={TITLE_UPDATE}
            aria-labelledby={TITLE_UPDATE}
            className={isEdit && !archive ? "grid" : "!hidden"}
            onClick={(event) => {
              event.stopPropagation()
              if (userId === userIdPost && !archive) {
                dispatchUpdatePost(post)
              }
              setVisible(false)
            }}
          >
            <div>
              <IconSprite id="icon-edit" className="w-5 h-5 aspect-square" />
            </div>
            <span>{TITLE_UPDATE}</span>
          </a>
          <a title={TITLE_SHARE} aria-label={TITLE_SHARE} aria-labelledby={TITLE_SHARE} onClick={onShare}>
            <div>
              <IconSprite id="icon-share" className="w-5 h-5 text-text-primary" />
            </div>
            <span>{TITLE_SHARE}</span>
          </a>
          <a
            title={LABEL_REVIEW}
            aria-label={LABEL_REVIEW}
            aria-labelledby={LABEL_REVIEW}
            className={cx((post?.userId === userId || !userId) && "!hidden")}
            onClick={(event) => {
              event.stopPropagation()
              onReview()
            }}
          >
            <div>
              <IconSprite id="icon-star" className="text-text-primary w-5 h-5" />
            </div>
            <span>{LABEL_REVIEW}</span>
          </a>
          <a
            title={TITLE_COMPLAINT}
            aria-label={TITLE_COMPLAINT}
            aria-labelledby={TITLE_COMPLAINT}
            className={userIdPost === userId ? "!hidden" : "grid"}
            onClick={(event) => {
              console.log("onClick TITLE_COMPLAINT: ")
              event.stopPropagation()
              event.preventDefault()
              dispatchComplaintModalPost({ post })
              setVisible(false)
            }}
          >
            <div>
              <IconSprite id="icon-complaint" className="text-text-error w-5 h-5" />
            </div>
            <span className="!text-text-error">{TITLE_COMPLAINT}</span>
          </a>
          <a
            title={LABEL_ADD_ADVERT}
            aria-label={LABEL_ADD_ADVERT}
            aria-labelledby={LABEL_ADD_ADVERT}
            className={cx(isManager || isAdvertising ? "grid" : "!hidden")}
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              displayAddAdvert(EnumTypeProvider.POST, post?.id!, post?.userId!)
              setVisible(false)
            }}
          >
            <div>
              <IconSprite id="icon-default-currency-ruble-circle" className="text-text-primary w-5 h-5" />
            </div>
            <span>{LABEL_ADD_ADVERT}</span>
          </a>
        </article>
      </div>
    </div>
  )
}

ComponentDots.displayName = "ComponentDots"
export default ComponentDots
