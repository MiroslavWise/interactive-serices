import { type IPosts } from "@/services/posts/types"

import IconActivity from "@/components/icons/IconActivity"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { cx } from "@/lib/cx"
import env from "@/config/environment"
import { useOutsideClickEvent } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"

interface IProps {
  post: IPosts
}

const LABEL_SHARE = "Поделиться"

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
          "absolute top-[calc(100%_+_0.25rem)] right-0 md:w-[13.5rem] flex flex-col gap-0.125 rounded-xl bg-BG-second shadow-box-down p-5 md:p-3",
          open ? "!z-10 !opacity-100 !visible" : "-z-10 opacity-0 invisible",
          "*:w-full *:py-2 *:px-0.375 *:flex *:flex-row *:items-center *:justify-start *:gap-0.625 *:rounded-[0.375rem] hover:*:bg-grey-field",
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
        >
          <div
            className={cx(
              "w-5 h-5 flex items-center justify-center relative p-0.625",
              "[&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5",
            )}
          >
            <IconActivity />
          </div>
          <span className="text-text-primary text-sm font-normal text-left">Поделиться</span>
        </a>
      </article>
    </div>
  )
}

export default HeaderItemDotsPost
