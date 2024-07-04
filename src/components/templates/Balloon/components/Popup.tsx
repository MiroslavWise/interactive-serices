"use client"

import { IResponseOffers } from "@/services/offers/types"

import IconActivity from "@/components/icons/IconActivity"
import IconAlertCircle from "@/components/icons/IconAlertCircle"

import { cx } from "@/lib/cx"
import env from "@/config/environment"
import { encryptedOffer } from "@/helpers/cript"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchComplaintModalUser } from "@/store"

const LABEL_SHARE = "Поделиться"

export const PopupShared = ({ offer, visible }: { offer: IResponseOffers; visible: boolean }) => {
  const { user, provider, id, addresses, title } = offer ?? {}
  const { onSimpleMessage } = useToast()

  function handle() {
    if (user) {
      dispatchComplaintModalUser({
        user: user,
      })
      return
    }
  }

  return (
    <article
      data-active={visible}
      className={cx(
        "absolute top-5 right-0 w-[13.5rem] h-auto p-3 flex flex-col gap-0.125 shadow-menu-absolute rounded-xl bg-BG-second translate-y-4 -z-10 opacity-0 invisible transition-all",
        visible && "!z-10 !translate-y-0 !opacity-100 !visible",
        "*:w-full *:py-2 *:px-0.375 *:flex *:flex-row *:items-center *:justify-start *:gap-0.625 *:rounded-[0.375rem] hover:*:bg-grey-field",
      )}
    >
      <a
        title={LABEL_SHARE}
        aria-label={LABEL_SHARE}
        aria-labelledby={LABEL_SHARE}
        onClick={(event) => {
          const hash = encryptedOffer(id)
          const url = `${env.server.host}/offer/${hash}`
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
      <a onClick={handle}>
        <div
          className={cx(
            "w-5 h-5 flex items-center justify-center relative p-0.625",
            "[&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5",
          )}
        >
          <IconAlertCircle />
        </div>
        <span className="text-text-error text-sm font-normal text-left">Пожаловаться</span>
      </a>
    </article>
  )
}
