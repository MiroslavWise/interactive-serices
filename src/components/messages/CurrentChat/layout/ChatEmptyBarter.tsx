"use client"

import { useSearchParams } from "next/navigation"
import { useInsertionEffect, useMemo } from "react"

import { EnumProviderThreads } from "@/types/enum"
import type { IPostThreads } from "@/services/threads/types"
import type { IPatchDataBarter } from "@/services/barters/types"

import { LoadingThreadsPage } from "@/components/common"

import { useAuth } from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import { providerIsAscending } from "@/lib/sortIdAscending"
import { useCountMessagesNotReading, usePush } from "@/helpers"
import { getThreads, patchBarter, postThread } from "@/services"

import styles from "../styles/style.module.scss"

export const ChatEmptyBarter = () => {
  const { on } = useToast()
  const idBarter = useSearchParams().get("barter-id")
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { handleReplace } = usePush()
  const { refetchCountMessages } = useCountMessagesNotReading()

  const barterNumber = useMemo(() => {
    if (!idBarter || !idBarter?.includes("-")) return undefined

    return {
      id: Number(idBarter?.split("-")?.[0]),
      idUser: Number(idBarter?.split("-")[1]),
    }
  }, [idBarter])

  async function createChat() {
    async function getDataThread() {
      const { res } = await getThreads({
        user: userId,
        provider: EnumProviderThreads.BARTER,
      })
      return res?.find((item) => item?.provider?.includes(EnumProviderThreads.BARTER) && item?.barterId === Number(barterNumber?.id))
    }

    async function createThread(emitterId: number, receiverId: number) {
      const provider = providerIsAscending({
        type: EnumProviderThreads.BARTER,
        ids: [emitterId, receiverId, barterNumber?.id!],
      })!
      const data_: IPostThreads = {
        title: provider,
        receiverIds: [receiverId],
        provider: EnumProviderThreads.BARTER,
        enabled: true,
      }

      if (barterNumber?.id) {
        data_.barterId = barterNumber?.id
      }

      const { res } = await postThread(data_)
      if (res?.id) {
        const dataBarter: IPatchDataBarter = {
          threadId: Number(res?.id),
          updatedById: userId,
        }

        await patchBarter(dataBarter, Number(barterNumber?.id))
      }

      return res?.id
    }

    let thread = await getDataThread()
    if (thread) {
      return handleReplace(`/messages?thread=${thread?.id}`)
    }
    if (!thread) {
      const idCreate = await createThread(Number(userId), barterNumber?.idUser!)

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
      refetchCountMessages().finally(() => {
        handleReplace(`/messages?thread=${idCreate}`)
      })
    }
  }

  useInsertionEffect(() => {
    if (!barterNumber) {
      handleReplace("/messages")
    } else {
      if (userId) {
        createChat()
      }
    }
  }, [barterNumber, userId])

  return (
    <section className={styles.wrapperLoading}>
      <LoadingThreadsPage />
    </section>
  )
}
