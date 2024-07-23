"use client"

import { useInsertionEffect } from "react"
import { useRouter } from "next/navigation"

import { EnumProviderThreads } from "@/types/enum"
import { type IPostThreads } from "@/services/threads/types"

import { useAuth } from "@/store"
import { getThreads, postThread } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { useCountMessagesNotReading } from "@/helpers"
import { providerIsAscending } from "@/lib/sortIdAscending"

function CreateUser({ idUser }: { idUser: string }) {
  const { on } = useToast()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { prefetch, push } = useRouter()
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
      prefetch("/chat")
      push("/chat")
      return
    }
    const idUserReceiver: number = Number(idUser)
    let thread = await getDataThread(idUserReceiver, userId!)
    if (thread) {
      prefetch(`/chat/${thread?.id}`)
      push(`/chat/${thread?.id}`)
      return
    }
    if (!thread) {
      const idCreate = await createThread(Number(userId), idUserReceiver)

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
      refetchCountMessages().finally(() => {
        prefetch(`/chat/${idCreate}`)
        push(`/chat/${idCreate}`)
      })
    }
  }

  useInsertionEffect(() => {
    if (!idUser) {
      prefetch(`/chat`)
      push(`/chat`)
    } else {
      if (userId) {
        createChat()
      }
    }
  }, [idUser, userId])

  return <div></div>
}

CreateUser.displayName = "CreateUser"
export default CreateUser
