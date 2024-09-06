import { type IPosts } from "@/services/posts/types"

import { useOutsideClickEvent } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"
import env from "@/config/environment"
import IconActivity from "@/components/icons/IconActivity"
import { cx } from "@/lib/cx"
import Link from "next/link"
import { dispatchMapCoordinates } from "@/store"
import IconMap from "@/components/icons/IconMap"
import IconComplaint from "@/components/icons/IconComplaint"

interface IProps {
  post: IPosts
}

const TITLE_TO_MAP = "Показать на карте"
const TITLE_COMPLAINT = "Пожаловаться"
const TITLE_SHARE = "Поделиться"

function ItemHeaderDotsPost({ post }: IProps) {
  const { slug, id, addresses, title } = post ?? {}
  const [open, setOpen, ref] = useOutsideClickEvent()
  const { onSimpleMessage } = useToast()

  const geoData = addresses[0] ?? {}

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
          "*:grid *:grid-cols-[1.25rem_minmax(0,1fr)] *:gap-2.5 *:items-center *:py-2 *:px-1.5 *:rounded-md",
          "[&>*>span]:text-text-primary [&>*>span]:text-sm [&>*>span]:font-normal [&>*>span]:text-left [&>*>span]:whitespace-nowrap",
          "[&>*>div]:w-5 [&>*>div]:h-5  [&>*>div]:relative  [&>*>div]:p-2.5",
          "hover:*:bg-grey-field",
          "[&>*>div>svg]:w-5 [&>*>div>svg]:h-5 [&>*>div>svg]:absolute [&>*>div>svg]:top-1/2 [&>*>div>svg]:left-1/2 [&>*>div>svg]:-translate-x-1/2 [&>*>div>svg]:-translate-y-1/2",
        )}
      >
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
            <IconMap />
          </div>
          <span>{TITLE_TO_MAP}</span>
        </Link>
        <a
          title={TITLE_SHARE}
          aria-label={TITLE_SHARE}
          aria-labelledby={TITLE_SHARE}
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
          }}
        >
          <div
            className={cx(
              "w-5 h-5 flex items-center justify-center relative p-2.5",
              "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5",
            )}
          >
            <IconActivity />
          </div>
          <span className="text-text-primary text-sm font-normal text-left">Поделиться</span>
        </a>
        <a
          title={TITLE_COMPLAINT}
          aria-label={TITLE_COMPLAINT}
          aria-labelledby={TITLE_COMPLAINT}
          onClick={(event) => {
            console.log("onClick TITLE_COMPLAINT: ")
            event.stopPropagation()
            event.preventDefault()
            // dispatchComplaintModalOffer({ offer })
            setOpen(false)
          }}
        >
          <div>
            <IconComplaint />
          </div>
          <span className="!text-text-error">{TITLE_COMPLAINT}</span>
        </a>
      </article>
    </div>
  )
}

ItemHeaderDotsPost.displayName = "ItemHeaderDotsPost"
export default ItemHeaderDotsPost
