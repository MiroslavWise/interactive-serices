"use client"

import { useInsertionEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { EnumProviderThreads } from "@/types/enum"
import { IPostThreads } from "@/services/threads/types"

import { LoadingThreadsPage } from "@/components/common"

import { useAuth } from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import { getThreads, postThread } from "@/services"
import { providerIsAscending } from "@/lib/sortIdAscending"
import { useCountMessagesNotReading, usePush } from "@/helpers"

import styles from "../styles/style.module.scss"

export const ChatEmpty = () => {
  const { on } = useToast()
  const idUser = useSearchParams().get("user")
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const router = useRouter()
  const { refetchCountMessages } = useCountMessagesNotReading()

  async function createChat() {
    async function getDataThread(emitterId: number, receiverId: number) {
      const { data } = await getThreads({
        user: emitterId,
        provider: EnumProviderThreads.PERSONAL,
      })
      return data?.find(
        (item) =>
          ((item?.receivers?.find((_) => _.id === receiverId) && item?.emitter?.id! === emitterId) ||
            (item?.receivers?.find((_) => _.id === emitterId) && item?.emitter?.id! === receiverId)) &&
          item?.provider?.includes(EnumProviderThreads.PERSONAL),
      )
    }

    async function createThread(emitterId: number, receiverId: number) {
      const provider = providerIsAscending({
        type: EnumProviderThreads.PERSONAL,
        ids: [emitterId, receiverId],
      })!
      const data_: IPostThreads = {
        title: provider,
        receiverIds: [receiverId],
        provider: EnumProviderThreads.PERSONAL,
        enabled: true,
      }
      const { res } = await postThread(data_)

      return res?.id
    }

    if (!idUser) {
      router.prefetch("/chat")
      router.push("/chat")
      return
    }
    const idUserReceiver: number = Number(idUser)
    let thread = await getDataThread(idUserReceiver, userId!)
    if (thread) {
      router.prefetch(`/chat/${thread?.id}`)
      router.push(`/chat/${thread?.id}`)
      return
    }
    if (!thread) {
      const idCreate = await createThread(Number(userId), idUserReceiver)

      if (!idCreate) {
        router.prefetch(`/chat`)
        router.push(`/chat`)
        on(
          {
            message: "Извините, мы не смогли создать для вас чат. Сервер сейчас перегружен",
          },
          "warning",
        )
        return
      }
      refetchCountMessages().finally(() => {
        router.prefetch(`/chat/${idCreate}`)
        router.push(`/chat/${idCreate}`)
      })
    }
  }

  useInsertionEffect(() => {
    if (!idUser) {
      router.prefetch(`/chat`)
      router.push(`/chat`)
    } else {
      if (userId) {
        createChat()
      }
    }
  }, [idUser, userId])

  return (
    <section className={styles.wrapperLoading}>
      <LoadingThreadsPage />
    </section>
  )
}
