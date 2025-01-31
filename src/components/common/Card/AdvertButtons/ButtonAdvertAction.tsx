import Link from "next/link"

import { TTypeActionCompany } from "@/services/types/company"
import { advertsButtonLabels, EAdvertsButton, EnumProviderThreads, EnumSign, EnumTypeProvider } from "@/types/enum"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { IPosts } from "@/services/posts/types"
import { postThread } from "@/services/threads"
import { useToast } from "@/helpers/hooks/useToast"
import { QUERY_CHAT_MESSAGES } from "@/types/constants"
import { IPostThreads } from "@/services/threads/types"
import { IResponseOffers } from "@/services/offers/types"
import { providerIsAscending } from "@/lib/sortIdAscending"
import { dispatchAuthModal, dispatchBallonOffer, dispatchBallonPost, useAuth } from "@/store"

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
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const auth = useAuth(({ auth }) => auth)
  const { on } = useToast()
  const { push } = useRouter()

  if (!actions || (actions && actions.length === 0)) return null

  const { action: enumType, url } = actions[0]

  const idUserNote = provider === EnumTypeProvider.offer ? offer?.userId : provider === EnumTypeProvider.POST ? post?.userId : null
  const id = provider === EnumTypeProvider.offer ? offer?.id : provider === EnumTypeProvider.POST ? post?.id : null

  async function toChat() {
    if (userId !== idUserNote) {
      if (!loading) {
        setLoading(true)
        const providerCHAT = providerIsAscending({
          type: provider === EnumTypeProvider.offer ? EnumProviderThreads.HELP : EnumProviderThreads.POST,
          ids: [userId!, idUserNote!, id!],
        })!
        const data_: IPostThreads = {
          title: providerCHAT,
          receiverIds: [offer?.userId!],
          provider: provider === EnumTypeProvider.offer ? EnumProviderThreads.HELP : EnumProviderThreads.POST,
          enabled: true,
        }
        data_.offerId = id!
        const { res } = await postThread(data_)
        push(`/chat?${QUERY_CHAT_MESSAGES}=${res?.id}`)
      }
      return
    }
  }

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
          if (!userId) {
            dispatchAuthModal({ visible: true, type: EnumSign.SignIn })
            on({
              message: "Для того чтобы написать сообщение, вам необходимо авторизоваться",
            })
            return
          } else {
            toChat()
          }
        }}
        disabled={loading || userId === idUserNote}
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
        onClick={async (event) => {
          event.stopPropagation()
          if (!userId) {
            dispatchAuthModal({ visible: true, type: EnumSign.SignIn })
            on({
              message: "Для того чтобы написать сообщение, вам необходимо авторизоваться",
            })
            return
          } else {
            toChat()
          }
        }}
        className={buttonCN}
        disabled={loading || userId === idUserNote}
      >
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.ENROLLING]}</span>
      </button>
    )
  if (EAdvertsButton.GO_TO_CHAT === enumType && provider !== EnumTypeProvider.offer)
    return (
      <button
        type="button"
        onClick={async (event) => {
          event.stopPropagation()
          if (!userId) {
            dispatchAuthModal({ visible: true, type: EnumSign.SignIn })
            on({
              message: "Для того чтобы написать сообщение, вам необходимо авторизоваться",
            })
            return
          } else {
            toChat()
          }
        }}
        className={buttonCN}
        disabled={loading || userId === idUserNote}
      >
        <span className={textCN}>{advertsButtonLabels[EAdvertsButton.GO_TO_CHAT]}</span>
      </button>
    )
  if (EAdvertsButton.SIGN_UP === enumType)
    return (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          if (!auth) {
            dispatchAuthModal({ visible: true, type: EnumSign.SignUp })
            return
          }
        }}
        className={buttonCN}
        disabled={!!auth}
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
