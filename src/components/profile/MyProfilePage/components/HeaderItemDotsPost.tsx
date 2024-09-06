import { type IPosts } from "@/services/posts/types"

import IconArchive from "@/components/icons/IconArchive"
import IconActivity from "@/components/icons/IconActivity"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { cx } from "@/lib/cx"
import env from "@/config/environment"
import { useOutsideClickEvent } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchArchivePost } from "@/store"

interface IProps {
  post: IPosts
}

const LABEL_SHARE = "Поделиться"
const TITLE_ARCHIVE = "В архив"

function HeaderItemDotsPost({ post }: IProps) {
  const { slug, id, addresses, title } = post ?? {}
  const [open, setOpen, ref] = useOutsideClickEvent()
  const { onSimpleMessage } = useToast()

  return (
    <div className="w-6 h-6 relative flex" ref={ref}>
      <button
        type="button"
        className="w-6 h-6 relative p-3 *:absolute *:-translate-x-1/2 *:-translate-y-1/2 *:left-1/2 *:top-1/2 *:w-4 *:h-4"
        onClick={(event) => {
          event.stopPropagation()
          setOpen((_) => !_)
        }}
      >
        <IconDotsHorizontal />
      </button>
      <article
        className={cx(
          "absolute top-[calc(100%_+_0.25rem)] right-0 md:w-[13.5rem] flex flex-col gap-0.5 rounded-xl bg-BG-second shadow-box-down p-5 md:p-3",
          open ? "!z-10 !opacity-100 !visible" : "-z-10 opacity-0 invisible",
        )}
      >
        <a
          title={LABEL_SHARE}
          aria-label={LABEL_SHARE}
          aria-labelledby={LABEL_SHARE}
          onClick={(event) => {
            const url = `${env.server.host}/post/${id}/${String(slug).replaceAll("/", "-")}`
            if (!!window.navigator.share!) {
              navigator.share({
                title: title!,
                text: addresses[0] ? addresses[0]?.additional! : "",
                url: url,
              })
            } else {
              navigator.clipboard.writeText(url)
              onSimpleMessage("Ссылка скопирована")
            }
            event.stopPropagation()
          }}
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
        {!post?.archive ? (
          <a
            title={TITLE_ARCHIVE}
            aria-label={TITLE_ARCHIVE}
            aria-labelledby={TITLE_ARCHIVE}
            className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field cursor-pointer"
            onClick={(event) => {
              event.stopPropagation()
              dispatchArchivePost(post)
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
        ) : null}
      </article>
    </div>
  )
}

export default HeaderItemDotsPost
