"use client"

import { useEffect } from "react"
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

  useEffect(() => {
    if (!idUser) {
      prefetch(`/chat`)
      push(`/chat`)
    } else {
      if (userId && idUser) {
        createChat()
      }
    }
  }, [idUser, userId])

  return <div></div>
}

CreateUser.displayName = "CreateUser"
export default CreateUser
