"use client"

import { useInsertionEffect, useMemo } from "react"
import { parseAsInteger, useQueryState } from "nuqs"

import { EnumProviderThreads } from "@/types/enum"
import { type IPostThreads } from "@/services/threads/types"
import { type IPatchDataBarter } from "@/services/barters/types"

import LoadingChat from "./LoadingChat"

import { useAuth } from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import { patchBarter, postThread } from "@/services"
import { useCountMessagesNotReading } from "@/helpers"
import { QUERY_CHAT_MESSAGES } from "@/types/constants"
import { providerIsAscending } from "@/lib/sortIdAscending"

function CreateBarter() {
  const { on } = useToast()
  const [_, setId] = useQueryState(QUERY_CHAT_MESSAGES, parseAsInteger)
  const [idBarter, setIdBarter] = useQueryState("barter-id")
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { refetchCountMessages } = useCountMessagesNotReading()

  const barterNumber = useMemo(() => {
    if (!idBarter || !idBarter?.includes("-")) return undefined

    return {
      id: Number(idBarter?.split("-")?.[0]),
      idUser: Number(idBarter?.split("-")[1]),
    }
  }, [idBarter])

  async function createChat() {
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

    const idCreate = await createThread(Number(userId), barterNumber?.idUser!)

    if (!idCreate) {
      setIdBarter(null)
      on(
        {
          message: "Извините, мы не смогли создать для вас чат. Сервер сейчас перегружен",
        },
        "warning",
      )
      return
    }
    refetchCountMessages().finally(() => {
      setIdBarter(null)
      setId(idCreate!)
    })
  }

  useInsertionEffect(() => {
    if (!barterNumber) {
      setIdBarter(null)
    } else {
      if (userId) {
        createChat()
      }
    }
  }, [barterNumber, userId])

  return <LoadingChat />
}

CreateBarter.displayName = "CreateBarter"
export default CreateBarter
