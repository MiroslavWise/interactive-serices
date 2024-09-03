import { type IPosts } from "@/services/posts/types"

import IconArchive from "@/components/icons/IconArchive"
import IconActivity from "@/components/icons/IconActivity"
import IconComplaint from "@/components/icons/IconComplaint"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { cx } from "@/lib/cx"
import { clg } from "@console"
import env from "@/config/environment"
import { patchPost } from "@/services/posts"
import { useOutsideClickEvent } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchComplaintModalPost, useAuth } from "@/store"
import { useState } from "react"

interface IProps {
  post: IPosts
}

const TITLE_SHARE = "Поделиться"
const TITLE_ARCHIVE = "В архив"
const TITLE_COMPLAINT = "Пожаловаться"

function SharedDotsPost({ post }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { addresses, title, id, slug, userId: userIdPost, archive } = post ?? {}
  const [open, set, ref] = useOutsideClickEvent()
  const { onSimpleMessage } = useToast()
  const geoData = addresses[0] ?? {}
  const [loadingArchive, setLoadingArchive] = useState(false)

  async function handleArchive() {
    if (!loadingArchive && !archive) {
      setLoadingArchive(true)
      const response = await patchPost(id, { archive: true })
      clg("response archive: ", response)

      if (response?.data) {
      }
      setLoadingArchive(false)
    }
  }

  return (
    <div className="absolute -top-1 -right-1 w-6 h-6 flex" ref={ref}>
      <button
        type="button"
        className="relative w-6 h-6 p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4"
        onClick={(event) => {
          event.stopPropagation()
          set((_) => !_)
        }}
      >
        <IconDotsHorizontal />
      </button>
      <article
        className={cx(
          "absolute top-full right-0 w-[13.5rem] shadow-box-down rounded-xl p-3 flex flex-col gap-0.5 bg-BG-second",
          open ? "opacity-100 visible z-50" : "-z-10 opacity-0 invisible",
        )}
      >
        <a
          title={TITLE_SHARE}
          aria-label={TITLE_SHARE}
          aria-labelledby={TITLE_SHARE}
          className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field"
          onClick={(event) => {
            const url = `${env.server.host}/post/${id}/${String(slug).replaceAll("/", "-")}`
            if (!!window.navigator.share!) {
              navigator.share({
                title: title!,
                text: geoData?.additional! ?? `${title}`,
                url: url,
              })
            } else {
              navigator.clipboard.writeText(url)
              onSimpleMessage("Ссылка скопирована")
            }
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
            <IconActivity />
          </div>
          <span className="text-text-primary text-sm font-normal text-left">{TITLE_SHARE}</span>
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
        ) : (
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
            <div
              className={cx(
                "w-5 h-5 flex items-center justify-center relative p-2.5",
                "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5",
              )}
            >
              <IconComplaint />
            </div>
            <span className="text-sm font-normal text-left !text-text-error">{TITLE_COMPLAINT}</span>
          </a>
        )}
      </article>
    </div>
  )
}

SharedDotsPost.displayName = "SharedDotsPost"
export default SharedDotsPost
