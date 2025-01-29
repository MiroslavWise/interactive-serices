"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { parseAsInteger, useQueryState } from "nuqs"

import LoadingChat from "./LoadingChat"

import { EnumProviderThreads } from "@/types/enum"
import { type IPostThreads } from "@/services/threads/types"

import { useAuth } from "@/store"
import { postThread } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { useCountMessagesNotReading } from "@/helpers"
import { providerIsAscending } from "@/lib/sortIdAscending"

function CreateOfferPay({ offerPay }: { offerPay: string }) {
  const { on } = useToast()
  const { push, prefetch } = useRouter()
  const [_, setId] = useQueryState("chat-id-messages", parseAsInteger)
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
      setId(idCreate!)
      return
    }
  }

  useEffect(() => {
    if (offerNumber === undefined) {
      prefetch(`/chat`)
      push(`/chat`)
    } else {
      if (userId) {
        createChat()
      }
    }
  }, [offerNumber, userId])

  return <LoadingChat />
}

CreateOfferPay.displayName = "CreateOfferPay"
export default CreateOfferPay
