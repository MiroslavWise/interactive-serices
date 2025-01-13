import Link from "next/link"

import { TTypeActionCompany } from "@/services/types/company"

import { advertsButtonLabels, EAdvertsButton } from "@/types/enum"

const buttonCN =
  "relative bg-grey-field border-none outline-none flex flex-row items-center justify-center cursor-pointer touch-manipulation rounded-lg px-2.5 w-min hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed *:font-normal h-9"
const textCN = "text-sm text-center whitespace-nowrap font-normal selection:bg-transparent text-text-primary"

function ButtonAdvertAction({ actions }: { actions?: TTypeActionCompany }) {
  if (!actions) return null

  const [enumType, url = ""] = actions

  if (EAdvertsButton.CALL === enumType)
    return (
      <Link href={`tel:${url}`} target="_blank" className={buttonCN}>
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.CALL]}</span>
      </Link>
    )
  if (EAdvertsButton.CALL_ON_WHATSAPP === enumType)
    return (
      <Link href={`https://wa.me/:${url}`} target="_blank" className={buttonCN}>
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.CALL_ON_WHATSAPP]}</span>
      </Link>
    )

  return null
}

export default ButtonAdvertAction
