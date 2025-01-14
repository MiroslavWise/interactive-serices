"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { EnumSign } from "@/types/enum"
import { EnumProviderThreads } from "@/types/enum"
import { IPostThreads } from "@/services/threads/types"
import { IResponseOffers } from "@/services/offers/types"

import Button from "../../Button"

import { useAuth } from "@/store"
import { dispatchAuthModal } from "@/store"
import { EnumTypeProvider } from "@/types/enum"
import { postThread } from "@/services/threads"
import { useToast } from "@/helpers/hooks/useToast"
import { providerIsAscending } from "@/lib/sortIdAscending"

interface IPropsButtonToChat {
  offer: IResponseOffers
}

function ButtonToChat({ offer }: IPropsButtonToChat) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { provider } = offer ?? {}
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
  const { on } = useToast()

  async function handleToChat() {
    if (provider === EnumTypeProvider.offer) {
      if (!loading) {
        if (!userId) {
          dispatchAuthModal({ visible: true, type: EnumSign.SignIn })
          on({
            message: "Для того чтобы написать сообщение, вам необходимо авторизоваться",
          })
          return
        }
        if (userId && userId !== offer?.userId) {
          setLoading(true)
          const provider = providerIsAscending({
            type: EnumProviderThreads.HELP,
            ids: [userId!, offer?.userId!, offer?.id!],
          })!
          const data_: IPostThreads = {
            title: provider,
            receiverIds: [offer?.userId!],
            provider: EnumProviderThreads.HELP,
            offerId: offer?.id!,
            enabled: true,
          }
          const { res } = await postThread(data_)
          push(`/chat/${res?.id}`)
          setLoading(false)
          return
        }
      }
    }
  }

  return userId !== offer?.userId ? (
    <Button
      label="Перейти в чат"
      type="button"
      typeButton="fill-primary"
      className="rounded-lg px-2.5 w-min hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed *:font-normal h-9"
      onClick={(event) => {
        event.stopPropagation()
        handleToChat()
      }}
      disabled={loading}
    />
  ) : null
}

export default ButtonToChat
