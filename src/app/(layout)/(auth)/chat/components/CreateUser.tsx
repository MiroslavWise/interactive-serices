"use client"

import { useEffect } from "react"
import { parseAsInteger, useQueryState } from "nuqs"

import { EnumProviderThreads } from "@/types/enum"
import { type IPostThreads } from "@/services/threads/types"

import LoadingChat from "./LoadingChat"

import { useAuth } from "@/store"
import { postThread } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { useCountMessagesNotReading } from "@/helpers"
import { QUERY_CHAT_MESSAGES } from "@/types/constants"
import { providerIsAscending } from "@/lib/sortIdAscending"

function CreateUser() {
  const { on } = useToast()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [_, setId] = useQueryState(QUERY_CHAT_MESSAGES, parseAsInteger)
  const [idUser, setIdUser] = useQueryState("user")
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
      setIdUser(null)
      return
    }
    const idUserReceiver: number = Number(idUser)

    const idCreate = await createThread(Number(userId), idUserReceiver)

    if (!idCreate) {
      setIdUser(null)
      on(
        {
          message: "Извините, мы не смогли создать для вас чат. Сервер сейчас перегружен",
        },
        "warning",
      )
      return
    }
    refetchCountMessages().finally(() => {
      setIdUser(null)
      setId(idCreate!)
    })
  }

  useEffect(() => {
    if (!idUser) {
      setIdUser(null)
    } else {
      if (userId && idUser) {
        createChat()
      }
    }
  }, [idUser, userId])

  return <LoadingChat />
}

CreateUser.displayName = "CreateUser"
export default CreateUser
