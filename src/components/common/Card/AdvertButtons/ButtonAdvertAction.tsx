import Link from "next/link"

import { TTypeActionCompany } from "@/services/types/company"
import { advertsButtonLabels, EAdvertsButton, EnumSign, EnumTypeProvider } from "@/types/enum"

import { useToast } from "@/helpers/hooks/useToast"
import { dispatchAuthModal, dispatchBallonOffer, dispatchBallonPost, useAuth } from "@/store"
import { IPosts } from "@/services/posts/types"
import { IResponseOffers } from "@/services/offers/types"

const buttonCN =
  "relative bg-grey-field border-none outline-none flex flex-row items-center justify-center cursor-pointer touch-manipulation rounded-lg px-2.5 w-min hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed *:font-normal h-9"
const textCN = "text-sm text-center whitespace-nowrap font-normal selection:bg-transparent text-text-primary"

interface IProps {
  provider: EnumTypeProvider
  offer?: IResponseOffers
  post?: IPosts
  actions?: TTypeActionCompany[]
}

function ButtonAdvertAction({ actions, provider, offer, post }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const auth = useAuth(({ auth }) => auth)
  const { on } = useToast()

  if (!actions || (actions && actions.length === 0)) return null

  const { action: enumType, url } = actions[0]

  const idUserNote = provider === EnumTypeProvider.offer ? offer?.userId : provider === EnumTypeProvider.POST ? post?.userId : null

  if (EAdvertsButton.CALL === enumType)
    return (
      <Link href={`tel:${url}`} target="_blank" className={buttonCN}>
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.CALL]}</span>
      </Link>
    )
  if (EAdvertsButton.CALL_ON_WHATSAPP === enumType)
    return (
      <Link href={`https://wa.me/${url}`} target="_blank" className={buttonCN}>
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.CALL_ON_WHATSAPP]}</span>
      </Link>
    )
  if (EAdvertsButton.TELEGRAM_CHANNEL === enumType)
    return (
      <Link href={`https://t.me/${url}`} target="_blank" className={buttonCN}>
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.TELEGRAM_CHANNEL]}</span>
      </Link>
    )
  if (EAdvertsButton.ASK_A_QUESTION === enumType)
    return (
      <button
        type="button"
        className={buttonCN}
        onClick={() => {
          if (!!userId) {
            dispatchAuthModal({ visible: true, type: EnumSign.SignIn })
            on({
              message: "Для того чтобы написать сообщение, вам необходимо авторизоваться",
            })
            return
          } else {
          }
        }}
      >
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.ASK_A_QUESTION]}</span>
      </button>
    )
  if (EAdvertsButton.WEBSITE === enumType)
    return (
      <Link href={url || "/"} target="_blank" className={buttonCN}>
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.WEBSITE]}</span>
      </Link>
    )

  if (EAdvertsButton.ENROLLING === enumType)
    return (
      <button
        type="button"
        onClick={() => {
          if (!userId) {
            dispatchAuthModal({ visible: true, type: EnumSign.SignIn })
            on({
              message: "Для того чтобы написать сообщение, вам необходимо авторизоваться",
            })
            return
          } else {
            if (userId !== idUserNote) {
              
              return
            }
          }
        }}
        className={buttonCN}
      >
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.ENROLLING]}</span>
      </button>
    )
  if (EAdvertsButton.SIGN_UP === enumType)
    return (
      <button
        type="button"
        onClick={() => {
          if (!auth) {
            dispatchAuthModal({ visible: true, type: EnumSign.SignUp })
            return
          }
        }}
        className={buttonCN}
      >
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.SIGN_UP]}</span>
      </button>
    )

  if (EAdvertsButton.READ_MORE === enumType)
    return (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          if (provider === EnumTypeProvider.POST) {
            dispatchBallonPost(post!)
            return
          }
          if (provider === EnumTypeProvider.offer) {
            dispatchBallonOffer({ offer: offer! })
            return
          }
        }}
        className={buttonCN}
      >
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.READ_MORE]}</span>
      </button>
    )

  if (EAdvertsButton.BUY === enumType)
    return (
      <Link href={url} target="_blank" className={buttonCN}>
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.BUY]}</span>
      </Link>
    )
  if (EAdvertsButton.ORDER === enumType)
    return (
      <Link href={url} target="_blank" className={buttonCN}>
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.ORDER]}</span>
      </Link>
    )

  return null
}

export default ButtonAdvertAction
