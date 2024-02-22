"use client"

import { flushSync } from "react-dom"
import { useSearchParams } from "next/navigation"
import { useEffect, useInsertionEffect, useMemo } from "react"

import { IPostThreads } from "@/services/threads/types"

import { EnumProviderThreads } from "@/types/enum"
import { LoadingThreadsPage } from "@/components/common"

import { useAuth } from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import { getThreads, postThread } from "@/services"
import { providerIsAscending } from "@/lib/sortIdAscending"
import { useCountMessagesNotReading, usePush } from "@/helpers"

import styles from "../styles/style.module.scss"

export function ChatOfferPay() {
  const { on } = useToast()
  const idOfferPay = useSearchParams().get("offer-pay")
  const userId = useAuth(({ userId }) => userId)
  const { handleReplace } = usePush()
  const { refetchCountMessages } = useCountMessagesNotReading()

  const offerNumber = useMemo(() => {
    if (!idOfferPay || !idOfferPay?.includes(":")) return undefined

    const split = idOfferPay?.split(":")

    return {
      id: Number(split[0]),
      idUser: Number(split[1]),
    }
  }, [idOfferPay])

  useEffect(() => {
    if (offerNumber === undefined) {
      handleReplace("/messages")
    }
  }, [offerNumber])

  async function createChat() {
    async function getDataThread() {
      const { res } = await getThreads({
        user: userId,
        provider: EnumProviderThreads.OFFER_PAY,
      })
      return res?.find(
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
      return handleReplace(`/messages?thread=${thread?.id}`)
    }
    if (!thread) {
      const idCreate = await createThread(Number(userId), offerNumber?.idUser!)

      if (!idCreate) {
        handleReplace("/messages")
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
        flushSync(() => {
          handleReplace(`/messages?thread=${idCreate}`)
        })
        return
      }
    }
  }

  useInsertionEffect(() => {
    if (offerNumber === undefined) {
      handleReplace("/messages")
    } else {
      if (userId) {
        createChat()
      }
    }
  }, [offerNumber, userId])

  return (
    <section className={styles.wrapperLoading}>
      <LoadingThreadsPage />
    </section>
  )
}
