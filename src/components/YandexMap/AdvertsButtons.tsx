import { useState } from "react"
import { useRouter } from "next/navigation"
import { IPostThreads } from "@/services/threads/types"
import { EnumProviderThreads } from "@/types/enum"

import { EnumSign } from "@/types/enum"
import { EnumTypeProvider } from "@/types/enum"

import Button from "@/components/common/Button"

import { postThread } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchAuthModal, useAuth } from "@/store"
import { IResponseOffers } from "@/services/offers/types"
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

  return userId !== offer?.userId && !!userId ? (
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

export { ButtonToChat }
