"use client"

import { Controller, useForm } from "react-hook-form"
import { ChangeEvent, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import { EnumTypeProvider } from "@/types/enum"
import type { TTextAreaSend } from "./types/types"
import { IUserOffer } from "@/services/offers/types"
import type { IRequestPostMessages } from "@/services/messages/types"
import { resolverChatSend, TSchemaChatSend } from "../utils/chat-send.schema"

import IconClipper from "@/components/icons/IconClipper"

import { useAuth } from "@/store"
import { useResize } from "@/helpers"
import { useWebSocket } from "@/context"
import { fileUploadService, postMessage } from "@/services"

const sleep = () => new Promise((r) => setTimeout(r, 50))
const MAX_FILE_SIZE = 9.9 * 1024 * 1024

const TextAreaSend: TTextAreaSend = ({ idUser, refetch, setStateMessages }) => {
  const { isTablet } = useResize()
  const [loading, setLoading] = useState(false)
  const idThread = useSearchParams().get("thread")
  const { socket } = useWebSocket()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const user = useAuth(({ user }) => user)
  const { setValue, handleSubmit, watch, reset, control } = useForm<TSchemaChatSend>({
    defaultValues: {
      text: "",
      file: {
        file: [],
        string: [],
      },
    },
    resolver: resolverChatSend,
  })

  const userData: IUserOffer = {
    about: user?.profile?.about ?? "",
    birthdate: user?.profile?.birthdate ?? "",
    firstName: user?.profile?.firstName ?? "",
    lastName: user?.profile?.lastName ?? "",
    gender: user?.profile?.gender!,
    id: user?.id!,
    username: user?.profile?.username ?? "",
    image: user?.profile?.image,
  }

  function deleteFile(index: number) {
    setValue("file", {
      file: watch("file.file").filter((_, i) => i !== index),
      string: watch("file.string").filter((_, i) => i !== index),
    })
  }

  async function handleImageChange(
    current: {
      file: File[]
      string: string[]
    },
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const files = event.target.files

    let filesReady = {
      file: [...current.file] as File[],
      string: [...current.string] as string[],
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        if (file) {
          if (file.size < MAX_FILE_SIZE) {
            const is = current.file.some((_) => _.size === file.size && _.name === file.name)

            if (is) {
              continue
            }

            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function (f) {
              filesReady = {
                ...filesReady,
                file: [...filesReady.file, file],
                string: [...filesReady.string, f!.target!.result as string],
              }
            }
          }
        }
      }
    }

    await sleep()

    return Promise.resolve({
      file: filesReady.file.splice(0, 9),
      string: filesReady.string.splice(0, 9),
    })
  }

  const onSubmit = handleSubmit(function ({ text, file }) {
    if (!loading) {
      setLoading(true)
      const date = new Date()
      const message = text
      const receiverIds = [Number(idUser)]
      if (message || file.file.length) {
        setStateMessages((prev) => [
          ...prev,
          {
            id: Math.random(),
            message: message || "",
            parentId: null,
            reading: null,
            threadId: Number(idThread!),
            emitterId: Number(userId),
            receiverIds: receiverIds,
            temporary: true,
            readIds: [],
            emitter: userData!,
            created: date,
            images: [...file.string],
          },
        ])

        Promise.all(
          file.file.map((item) =>
            fileUploadService(item, {
              type: EnumTypeProvider.threads,
              userId: userId!,
              idSupplements: Number(idThread),
            }),
          ),
        ).then((responses) => {
          let array: number[] = []

          responses.forEach((item) => {
            if (item.res?.id) {
              array.push(item.res?.id!)
            }
          })

          if (socket?.connected) {
            socket?.emit(
              "chat",
              {
                receiverIds: receiverIds,
                message: message || "",
                threadId: Number(idThread!),
                created: date,
                parentId: undefined,
                images: [...array],
              },
              (response: any) => {
                console.log("message response :", response)
              },
            )
            setTimeout(() => {
              reset()
              setLoading(false)
            })
          } else {
            const data: IRequestPostMessages = {
              threadId: Number(idThread!),
              message: message || "",
              emitterId: Number(userId),
              receiverIds: receiverIds,
              enabled: true,
              created: date,
            }
            postMessage(data).then(() => {
              setTimeout(() => {
                reset()
                setLoading(false)
                refetch()
              })
            })
          }
        })
      }
    }
  })

  const strings = useMemo(() => watch("file").string, [watch("file")])

  return (
    <form onSubmit={onSubmit}>
      <article>
        <IconClipper />
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              onChange={async (event) => {
                const dataValues = await handleImageChange(field.value, event)
                console.log("dataValues: ", dataValues)
                field.onChange(dataValues)
                event.target.value = ""
              }}
              accept="image/png, image/gif, image/jpeg, image/*, .png, .jpg, .jpeg"
              multiple
            />
          )}
        />
      </article>
      {isTablet ? (
        <div data-buttons>
          <button
            type="submit"
            data-sent
            data-disabled={!watch("text") && watch("file.string").length === 0}
            disabled={!watch("text") && watch("file.string").length === 0}
          >
            <img src="/svg/sent.svg" alt="sent" width={20} height={20} />
          </button>
        </div>
      ) : (
        <button
          type="submit"
          data-sent
          data-disabled={!watch("text") && watch("file.string").length === 0}
          disabled={!watch("text") && watch("file.string").length === 0}
        >
          <img src="/svg/sent.svg" alt="sent" width={20} height={20} />
        </button>
      )}
      <Controller
        name="text"
        control={control}
        render={({ field, fieldState }) => (
          <input
            {...field}
            type="text"
            placeholder="Напишите сообщение..."
            autoComplete="off"
            enterKeyHint="send"
            data-error={!!fieldState.error}
          />
        )}
      />
    </form>
  )
}

TextAreaSend.displayName = "TextAreaSend"
export default TextAreaSend
