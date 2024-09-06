import { type IPosts } from "@/services/posts/types"

import IconShare from "@/components/icons/IconShare"
import IconComplaint from "@/components/icons/IconComplaint"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { cx } from "@/lib/cx"
import env from "@/config/environment"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchComplaintModalPost } from "@/store"
import { daysAgo, useOutsideClickEvent } from "@/helpers"

const TITLE_SHARE = "Поделиться"
const TITLE_COMPLAINT = "Пожаловаться"

interface IProps {
  post: IPosts
}

function ComponentDots({ post }: IProps) {
  const { created, id, slug, addresses, title } = post ?? {}
  const [visible, setVisible, ref] = useOutsideClickEvent()
  const { onSimpleMessage } = useToast()

  return (
    <div data-time-dots className="w-full h-auto flex items-center justify-between">
      <time dateTime={created} className="w-full text-text-secondary text-start text-xs font-normal">
        {daysAgo(created)}
      </time>
      <div className="relative h-4 w-4 border-none outline-none bg-transparent flex items-center justify-center z-[91]">
        <button
          className="absolute bg-transparent border-none outline-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 z-50 *:h-4 *:w-4 flex items-center justify-center"
          ref={ref}
          onClick={(event) => {
            event.stopPropagation()
            setVisible((prev) => !prev)
          }}
        >
          <IconDotsHorizontal />
        </button>
        <article
          className={cx(
            "absolute top-[calc(100%_+_0.25rem)] right-0 rounded-xl p-3 bg-BG-second w-[13.5rem] flex flex-col gap-0.5 opacity-0 invisible z-[120] shadow-box-down",
            "*:grid *:grid-cols-[1.25rem_minmax(0,1fr)] *:gap-2.5 *:items-center *:py-2 *:px-1.5 *:rounded-md",
            "[&>*>span]:text-text-primary [&>*>span]:text-sm [&>*>span]:font-normal [&>*>span]:text-left [&>*>span]:whitespace-nowrap",
            "[&>*>div]:w-5 [&>*>div]:h-5  [&>*>div]:relative  [&>*>div]:p-2.5",
            "hover:*:bg-grey-field",
            "[&>*>div>svg]:w-5 [&>*>div>svg]:h-5 [&>*>div>svg]:absolute [&>*>div>svg]:top-1/2 [&>*>div>svg]:left-1/2 [&>*>div>svg]:-translate-x-1/2 [&>*>div>svg]:-translate-y-1/2",
            visible && "!opacity-100 !visible",
          )}
        >
          <a
            title={TITLE_SHARE}
            aria-label={TITLE_SHARE}
            aria-labelledby={TITLE_SHARE}
            onClick={(event) => {
              const url = `${env.server.host}/post/${id}/${slug ? String(slug).replaceAll("/", "-") : ""}`
              if (!!window.navigator.share!) {
                navigator.share({
                  title: title!,
                  text: addresses[0] ? addresses[0]?.additional! : title,
                  url: url,
                })
              } else {
                navigator.clipboard.writeText(url)
                onSimpleMessage("Ссылка скопирована")
              }
              event.stopPropagation()
            }}
          >
            <div>
              <IconShare />
            </div>
            <span>{TITLE_SHARE}</span>
          </a>
          <a
            title={TITLE_COMPLAINT}
            aria-label={TITLE_COMPLAINT}
            aria-labelledby={TITLE_COMPLAINT}
            onClick={(event) => {
              console.log("onClick TITLE_COMPLAINT: ")
              event.stopPropagation()
              event.preventDefault()
              dispatchComplaintModalPost({ post })
              setVisible(false)
            }}
          >
            <div>
              <IconComplaint />
            </div>
            <span className="!text-text-error">{TITLE_COMPLAINT}</span>
          </a>
        </article>
      </div>
    </div>
  )
}

ComponentDots.displayName = "ComponentDots"
export default ComponentDots
