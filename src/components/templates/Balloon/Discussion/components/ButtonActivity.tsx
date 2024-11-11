"use client"

import { type IResponseOffers } from "@/services/offers/types"

import IconActivity from "@/components/icons/IconActivity"

import { useNavigator } from "@/helpers/hooks/use-navigator"

const LABEL = "Поделиться"

export const ButtonActivity = ({ offer }: { offer: IResponseOffers }) => {
  const { id, slug, title } = offer ?? {}

  const onShare = useNavigator({
    url: `/offer/${id}/${slug ? String(slug).replaceAll("/", "-") : ""}`,
    title: title! ?? "",
  })

  return (
    <>
      <button
        type="button"
        data-activity
        className="relative z-[2]"
        onClick={onShare}
        title={LABEL}
        aria-label={LABEL}
        aria-labelledby={LABEL}
      >
        <IconActivity />
      </button>
    </>
  )
}
