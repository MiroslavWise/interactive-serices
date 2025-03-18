import { EnumTypeProvider } from "@/types/enum"
import { ETitleRole } from "@/services/roles/types"
import { type IPosts } from "@/services/posts/types"

import IconArchive from "@/components/icons/IconArchive"
import IconActivity from "@/components/icons/IconActivity"
import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import useRole from "@/helpers/is-role"
import { useOutsideClickEvent } from "@/helpers"
import { useNavigator } from "@/helpers/hooks/use-navigator"
import { dispatchArchivePost, dispatchOpenDeletePost, dispatchUpdatePost, displayAddAdvert, useAuth } from "@/store"
import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"

interface IProps {
  post: IPosts
}

const TITLE_UPDATE = "Редактировать"
const LABEL_SHARE = "Поделиться"
const TITLE_ARCHIVE = "В архив"
const LABEL_DELETE = "Удалить"
const LABEL_ADD_ADVERT = "Добавить рекламу"

function HeaderItemDotsPost({ post }: IProps) {
  const { id, title, archive, company } = post ?? {}
  const [open, setOpen, ref] = useOutsideClickEvent()
  const isPathPost = useIsAllowAccess("PATCH", "posts", id)
  const isDeletePost = useIsAllowAccess("DELETE", "posts", id)

  const onShare = useNavigator({
    url: `/post/${id}`,
    title: title! ?? "",
  })

  const isAdvertising = !!company
  const isManager = useRole(ETitleRole.Manager)

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
          "absolute top-[calc(100%_+_0.25rem)] right-0 w-[13.5rem] flex flex-col gap-0.5 rounded-xl bg-BG-second shadow-box-down p-5 md:p-3",
          open ? "!z-10 !opacity-100 !visible" : "-z-10 opacity-0 invisible",
        )}
      >
        <a
          title={TITLE_UPDATE}
          aria-label={TITLE_UPDATE}
          aria-labelledby={TITLE_UPDATE}
          onClick={(event) => {
            event.stopPropagation()
            if (!archive) {
              dispatchUpdatePost(post)
            }
          }}
          className={cx(
            "w-full grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field cursor-pointer text-text-primary",
            archive ? "hidden" : "grid",
          )}
        >
          <div className="w-5 h-5 flex items-center justify-center relative p-2.5 *:w-5">
            <IconSprite id="icon-edit" />
          </div>
          <span className="text-sm font-normal text-left">{TITLE_UPDATE}</span>
        </a>
        <a
          title={LABEL_SHARE}
          aria-label={LABEL_SHARE}
          aria-labelledby={LABEL_SHARE}
          onClick={onShare}
          className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field cursor-pointer"
        >
          <div
            className={cx(
              "w-5 h-5 flex items-center justify-center relative p-2.5",
              "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:fill-text-primary",
            )}
          >
            <IconActivity />
          </div>
          <span className="text-text-primary text-sm font-normal text-left">
            {!!window?.navigator?.share ? "Поделиться" : "Скопировать ссылку"}
          </span>
        </a>
        {!!post?.archive ? (
          <a
            title={LABEL_DELETE}
            aria-label={LABEL_DELETE}
            aria-labelledby={LABEL_DELETE}
            className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field cursor-pointer"
            onClick={(event) => {
              event.stopPropagation()
              if (isDeletePost) {
                dispatchOpenDeletePost(id!, title)
              }
            }}
          >
            <div className="w-5 h-5 flex items-center justify-center relative p-2.5 text-text-error *:w-5">
              <IconSprite id="trash-20-20" />
            </div>
            <span className="text-text-error text-sm font-normal text-left">{LABEL_DELETE}</span>
          </a>
        ) : (
          <a
            title={TITLE_ARCHIVE}
            aria-label={TITLE_ARCHIVE}
            aria-labelledby={TITLE_ARCHIVE}
            className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field cursor-pointer"
            onClick={(event) => {
              event.stopPropagation()
              if (isPathPost) {
                dispatchArchivePost(post)
              }
            }}
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
        )}
        <a
          title={LABEL_ADD_ADVERT}
          aria-label={LABEL_ADD_ADVERT}
          aria-labelledby={LABEL_ADD_ADVERT}
          onClick={(event) => {
            event.stopPropagation()
            event.preventDefault()
            displayAddAdvert(EnumTypeProvider.POST, post?.id!, post?.userId!)
          }}
          className={cx(
            "w-full py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field cursor-pointer",
            isManager && !isAdvertising ? "grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5" : "hidden",
          )}
        >
          <div className="w-5 h-5 flex items-center justify-center relative p-2.5">
            <IconSprite id="icon-default-currency-ruble-circle" className="text-text-primary w-5 h-5" />
          </div>
          <span className="text-text-primary text-sm font-normal text-left">{LABEL_ADD_ADVERT}</span>
        </a>
      </article>
    </div>
  )
}

HeaderItemDotsPost.displayName = "HeaderItemDotsPost"
export default HeaderItemDotsPost
