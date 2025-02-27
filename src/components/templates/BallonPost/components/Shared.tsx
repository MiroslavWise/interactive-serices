import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"

import IconArchive from "@/components/icons/IconArchive"
import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { useNavigator } from "@/helpers/hooks/use-navigator"
import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"
import {
  useAuth,
  displayAddAdvert,
  dispatchUpdatePost,
  dispatchArchivePost,
  dispatchAddTestimonials,
  dispatchComplaintModalPost,
} from "@/store"

interface IProps {
  post: IPosts
}

const TITLE_SHARE = "Поделиться"
const TITLE_ARCHIVE = "В архив"
const TITLE_UPDATE = "Редактировать"
const TITLE_COMPLAINT = "Пожаловаться"
const LABEL_ADD_ADVERT = "Добавить рекламу"
const LABEL_REVIEW = "Оставить отзыв"

function SharedDotsPost({ post }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { title, id, userId: userIdPost, archive, company } = post ?? {}
  const [open, set, ref] = useOutsideClickEvent()
  const isManager = useIsAllowAccess("PATCH", "companies")
  const isEdit = useIsAllowAccess("PATCH", "posts")
  const isAdvertising = !!company

  function handleArchive() {
    dispatchArchivePost(post)
  }

  const onShare = useNavigator({
    url: `/post/${id}`,
    title: title! ?? "",
  })

  function onReview() {
    dispatchAddTestimonials({ post, provider: EnumTypeProvider.POST })
  }

  return (
    <div className="absolute -top-1 -right-1 w-6 h-6 flex" ref={ref}>
      <button
        type="button"
        className="relative w-6 h-6 p-3 *:w-4 *:h-4 text-element-grey-light hover:text-element-accent-1"
        onClick={(event) => {
          event.stopPropagation()
          set((_) => !_)
        }}
      >
        <IconSprite id="dots-horizontal" />
      </button>
      <article
        className={cx(
          "absolute top-full right-0 w-[13.5rem] shadow-box-down rounded-xl p-3 flex flex-col gap-0.5 bg-BG-second *:cursor-pointer",
          open ? "opacity-100 visible z-50" : "-z-10 opacity-0 invisible",
        )}
      >
        <a
          title={TITLE_UPDATE}
          aria-label={TITLE_UPDATE}
          aria-labelledby={TITLE_UPDATE}
          className={cx(
            "w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field",
            (userId === userIdPost || isEdit) && !archive ? "grid" : "hidden",
          )}
          onClick={(event) => {
            event.stopPropagation()
            if (userId === userIdPost && !archive) {
              dispatchUpdatePost(post)
            }
            set(false)
          }}
        >
          <div className="w-5 h-5 flex items-center justify-center relative p-2.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.8671 1.19541C12.6798 0.382779 13.9973 0.38278 14.8099 1.19541C15.6226 2.00805 15.6226 3.32559 14.8099 4.13822L8.43479 10.5134C8.42159 10.5266 8.40851 10.5397 8.39554 10.5527C8.20391 10.7447 8.03495 10.9139 7.83125 11.0388C7.65231 11.1484 7.45722 11.2292 7.25315 11.2782C7.02085 11.334 6.78168 11.3338 6.51042 11.3335C6.49206 11.3335 6.47355 11.3335 6.45489 11.3335H5.33852C4.97033 11.3335 4.67186 11.035 4.67186 10.6668V9.55048C4.67186 9.53181 4.67184 9.5133 4.67182 9.49494C4.67157 9.22367 4.67135 8.98451 4.72712 8.75221C4.77611 8.54814 4.85692 8.35305 4.96658 8.17411C5.0914 7.97041 5.26067 7.80146 5.45266 7.60982C5.46566 7.59685 5.47876 7.58377 5.49196 7.57057L11.8671 1.19541ZM13.8671 2.13822C13.5752 1.84629 13.1019 1.84629 12.8099 2.13822L6.43477 8.51338C6.18173 8.76643 6.13507 8.81914 6.10343 8.87077C6.06688 8.93042 6.03994 8.99545 6.02361 9.06347C6.00948 9.12235 6.00519 9.19262 6.00519 9.55048V10.0002H6.45489C6.81274 10.0002 6.88301 9.99587 6.94189 9.98173C7.00991 9.9654 7.07494 9.93847 7.13459 9.90191C7.18622 9.87027 7.23893 9.82362 7.49198 9.57058L13.8671 3.19541C14.1591 2.90348 14.1591 2.43016 13.8671 2.13822ZM4.51101 2.00015L7.33854 2.00015C7.70673 2.00015 8.00521 2.29863 8.00521 2.66682C8.00521 3.03501 7.70673 3.33349 7.33854 3.33349H4.53854C3.96749 3.33349 3.57929 3.334 3.27923 3.35852C2.98696 3.3824 2.83749 3.42568 2.73322 3.47881C2.48234 3.60664 2.27836 3.81062 2.15053 4.0615C2.09741 4.16576 2.05412 4.31523 2.03024 4.60751C2.00573 4.90757 2.00521 5.29577 2.00521 5.86682V11.4668C2.00521 12.0379 2.00573 12.4261 2.03024 12.7261C2.05412 13.0184 2.09741 13.1679 2.15053 13.2721C2.27836 13.523 2.48234 13.727 2.73322 13.8548C2.83749 13.908 2.98696 13.9512 3.27923 13.9751C3.57929 13.9996 3.96749 14.0002 4.53854 14.0002H10.1385C10.7096 14.0002 11.0978 13.9996 11.3979 13.9751C11.6901 13.9512 11.8396 13.908 11.9439 13.8548C12.1947 13.727 12.3987 13.523 12.5266 13.2721C12.5797 13.1679 12.623 13.0184 12.6468 12.7261C12.6714 12.4261 12.6719 12.0379 12.6719 11.4668V8.66682C12.6719 8.29863 12.9704 8.00015 13.3385 8.00015C13.7067 8.00015 14.0052 8.29863 14.0052 8.66682V11.4944C14.0052 12.031 14.0052 12.4739 13.9757 12.8347C13.9451 13.2094 13.8794 13.5539 13.7146 13.8775C13.4589 14.3792 13.051 14.7872 12.5492 15.0428C12.2256 15.2077 11.8812 15.2734 11.5064 15.304C11.1456 15.3335 10.7027 15.3335 10.166 15.3335H4.51104C3.97438 15.3335 3.53146 15.3335 3.17066 15.304C2.79593 15.2734 2.45146 15.2077 2.1279 15.0428C1.62614 14.7872 1.21819 14.3792 0.962525 13.8775C0.797664 13.5539 0.731955 13.2094 0.701338 12.8347C0.67186 12.4739 0.671867 12.031 0.671875 11.4944V5.83929C0.671867 5.30264 0.67186 4.85973 0.701338 4.49893C0.731955 4.1242 0.797664 3.77973 0.962525 3.45618C1.21819 2.95441 1.62614 2.54646 2.1279 2.2908C2.45146 2.12594 2.79593 2.06023 3.17066 2.02961C3.53146 2.00014 3.97436 2.00014 4.51101 2.00015Z"
                  fill="var(--text-primary)"
                />
              </g>
            </svg>
          </div>
          <span className="text-text-primary text-sm font-normal text-left">{TITLE_UPDATE}</span>
        </a>
        <a
          title={TITLE_SHARE}
          aria-label={TITLE_SHARE}
          aria-labelledby={TITLE_SHARE}
          className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field"
          onClick={(event) => {
            onShare()
            event.stopPropagation()
            set(false)
          }}
        >
          <div
            className={cx(
              "w-5 h-5 flex items-center justify-center relative p-2.5",
              "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:fill-text-primary",
            )}
          >
            <IconSprite id="icon-share" className="text-text-primary w-5 h-5" />
          </div>
          <span className="text-text-primary text-sm font-normal text-left">{TITLE_SHARE}</span>
        </a>
        <a
          title={LABEL_REVIEW}
          aria-label={LABEL_REVIEW}
          aria-labelledby={LABEL_REVIEW}
          onClick={(event) => {
            event.stopPropagation()
            event.preventDefault()
            onReview()
            requestAnimationFrame(() => {
              set(false)
            })
          }}
          className={cx(
            "w-full gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field",
            !!userId && userId !== userIdPost ? "grid grid-cols-[1.25rem_minmax(0,1fr)]" : "!hidden",
          )}
        >
          <div className="w-5 h-5 flex items-center justify-center relative p-2.5">
            <IconSprite id="icon-star" className="text-text-primary w-5 h-5" />
          </div>
          <span className="text-sm font-normal text-left text-text-primary">{LABEL_REVIEW}</span>
        </a>
        {userIdPost === userId ? (
          !archive ? (
            <a
              title={TITLE_ARCHIVE}
              aria-label={TITLE_ARCHIVE}
              aria-labelledby={TITLE_ARCHIVE}
              className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field"
              onClick={handleArchive}
            >
              <div
                className={cx(
                  "w-5 h-5 flex items-center justify-center relative p-2.5",
                  "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:fill-text-primary",
                )}
              >
                <IconArchive />
              </div>
              <span className="text-text-primary text-sm font-normal text-left">{TITLE_ARCHIVE}</span>
            </a>
          ) : null
        ) : userId ? (
          <a
            title={TITLE_COMPLAINT}
            aria-label={TITLE_COMPLAINT}
            aria-labelledby={TITLE_COMPLAINT}
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              dispatchComplaintModalPost({ post })
              set(false)
            }}
            className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field"
          >
            <div className="w-5 h-5 flex items-center justify-center relative p-2.5">
              <IconSprite id="icon-complaint" className="text-text-error w-5 h-5" />
            </div>
            <span className="text-sm font-normal text-left !text-text-error">{TITLE_COMPLAINT}</span>
          </a>
        ) : null}
        <a
          title={LABEL_ADD_ADVERT}
          aria-label={LABEL_ADD_ADVERT}
          aria-labelledby={LABEL_ADD_ADVERT}
          onClick={(event) => {
            displayAddAdvert(EnumTypeProvider.POST, id!, post?.userId!)
            event.stopPropagation()
            event.preventDefault()
            requestAnimationFrame(() => {
              set(false)
            })
          }}
          className={cx(
            "w-full gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field",
            isManager && !isAdvertising ? "grid grid-cols-[1.25rem_minmax(0,1fr)]" : "!hidden",
          )}
        >
          <div className="w-5 h-5 flex items-center justify-center relative p-2.5">
            <IconSprite id="icon-default-currency-ruble-circle" className="text-text-primary w-5 h-5" />
          </div>
          <span className="text-sm font-normal text-left text-text-primary">{LABEL_ADD_ADVERT}</span>
        </a>
      </article>
    </div>
  )
}

SharedDotsPost.displayName = "SharedDotsPost"
export default SharedDotsPost
