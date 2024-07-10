"use client"

import { useRouter } from "next/navigation"

import { useAuth } from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import { useCountMessagesNotReading } from "@/helpers"
import { useInsertionEffect, useMemo } from "react"
import { getThreads, postThread } from "@/services"
import { EnumProviderThreads } from "@/types/enum"
import { providerIsAscending } from "@/lib/sortIdAscending"
import { IPostThreads } from "@/services/threads/types"

function CreateOfferPay({ offerPay }: { offerPay: string }) {
  const { on } = useToast()
  const { push, prefetch } = useRouter()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { refetchCountMessages } = useCountMessagesNotReading()

  const offerNumber = useMemo(() => {
    if (!offerPay || !offerPay?.includes(":")) return undefined

    const split = offerPay?.split(":")

    return {
      id: Number(split[0]),
      idUser: Number(split[1]),
    }
  }, [offerPay])

  async function createChat() {
    async function getDataThread() {
      const { data } = await getThreads({
        user: userId,
        provider: EnumProviderThreads.OFFER_PAY,
      })
      return data?.find(
        (item) => item?.provider?.includes(EnumProviderThreads.OFFER_PAY) && Number(item?.offerId) === Number(offerNumber?.id),
      )
    }

    async function createThread(emitterId: number, receiverId: number) {
      const provider = providerIsAscending({
        type: EnumProviderThreads.OFFER_PAY,
        ids: [emitterId, receiverId, offerNumber?.id!],
      })!
      const data_: IPostThreads = {
        title: provider,
        receiverIds: [receiverId],
        provider: EnumProviderThreads.OFFER_PAY,
        enabled: true,
      }

      if (offerNumber?.id) {
        data_.offerId = offerNumber?.id!
      }

      const { res } = await postThread(data_)

      return res?.id
    }

    let thread = await getDataThread()
    if (thread) {
      prefetch(`/chat/${thread?.id}`)
      push(`/chat${thread?.id}`)
      return
    }
    if (!thread) {
      const idCreate = await createThread(Number(userId), offerNumber?.idUser!)

      if (!idCreate) {
        prefetch(`/chat`)
        push(`/chat`)
        on(
          {
            message: "Извините, мы не смогли создать для вас чат. Сервер сейчас перегружен",
          },
          "warning",
        )
        return
      }
      if (idCreate) {
        refetchCountMessages()
        prefetch(`/chat/${idCreate}`)
        push(`/chat/${idCreate}`)
        return
      }
    }
  }

  useInsertionEffect(() => {
    if (offerNumber === undefined) {
      prefetch(`/chat`)
      push(`/chat`)
    } else {
      if (userId) {
        createChat()
      }
    }
  }, [offerNumber, userId])

  return <div></div>
}

CreateOfferPay.displayName = "CreateOfferPay"
export default CreateOfferPay
