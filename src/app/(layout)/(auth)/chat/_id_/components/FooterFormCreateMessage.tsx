"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { type ChangeEvent, type Dispatch, memo, type RefObject, type SetStateAction, useCallback, useEffect, useRef, useState } from "react"

import { type IMessages } from "../ComponentCurrentChat"
import { type IResponseThread } from "@/services/threads/types"
import { type IRequestPostMessages } from "@/services/messages/types"
import { EnumProviderThreads, EnumStatusBarter, EnumTypeProvider } from "@/types/enum"

import SendingPhotos from "./SendingPhotos"
import LoadingFooter from "../../components/LoadingFooter"
import IconPaperClip from "@/components/icons/IconPaperClip"

import { cx } from "@/lib/cx"
import { useDebounce } from "@/helpers"
import { resolver, type TTypeSchema } from "../utils/schema"
import { deCrypted, dispatchMessageDraft, useAuth, useDraftChat } from "@/store"
import { fileUploadService, getBarterId, getMessages, postMessage } from "@/services"

const MAX_FILE_SIZE = 9.9 * 1024 * 1024
const sleep = () => new Promise((r) => setTimeout(r, 50))

function FooterFormCreateMessage({
  id,
  ferUl,
  thread,
  setMessages,
  isLoadingThread,
}: {
  id: number | string
  thread: IResponseThread
  isLoadingThread: boolean
  ferUl: RefObject<HTMLUListElement>
  setMessages: Dispatch<SetStateAction<IMessages[]>>
}) {
  const message = useDraftChat((chats) => chats[id])
  const textRef = useRef<HTMLTextAreaElement>(null)
  const refForm = useRef<HTMLFormElement>(null)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const barterId = thread?.provider === EnumProviderThreads.BARTER ? thread?.barterId : null

  const { data, isLoading: isLoadingBarter } = useQuery({
    queryFn: () => getBarterId(barterId!),
    queryKey: ["barters", { id: barterId! }],
    enabled: !!barterId,
  })

  const disabledBarterCompleted = data?.data?.status === EnumStatusBarter.COMPLETED

  const [loading, setLoading] = useState(false)
  const [filesState, setFiles] = useState<{ file: File[]; string: string[] }>({
    file: [],
    string: [],
  })

  const dispatchDelete = useCallback(
    (index: number) => {
      if (!loading) {
        setFiles((item) => ({
          file: item.file.filter((_, i) => i !== index),
          string: item.string.filter((_, i) => i !== index),
        }))
      }
    },
    [loading],
  )

  const handleImageChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files

      let filesReady = {
        file: [...filesState.file] as File[],
        string: [...filesState.string] as string[],
      }

      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i]

          if (file) {
            if (file.size < MAX_FILE_SIZE) {
              const is = filesState.file.some((_) => _.size === file.size && _.name === file.name)

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
    },
    [filesState],
  )

  const { refetch } = useQuery({
    queryFn: () => getMessages({ thread: thread?.id! }),
    queryKey: ["messages", { threadId: thread?.id! }],
    enabled: false,
  })

  const { handleSubmit, watch, control, resetField, setValue } = useForm<TTypeSchema>({
    resolver: resolver,
    defaultValues: {
      text: deCrypted(message) ?? "",
    },
  })

  const updateMessageDraft = useDebounce(functionMessage, 15)

  function functionMessage() {
    dispatchMessageDraft(thread?.id, watch("text"))
  }

  useEffect(() => {
    if (textRef.current) {
      if (!watch("text").trim()) {
        textRef.current.style.borderRadius = `1.25rem`
        textRef.current.style.height = "2.5rem"
      } else {
        if (textRef.current.scrollHeight > 40) {
          textRef.current.style.height = "auto"
          textRef.current.style.height = textRef.current.scrollHeight + "px"
          textRef.current.style.borderRadius = `1rem`
        } else {
          textRef.current.style.borderRadius = `1.25rem`
          textRef.current.style.height = "2.5rem"
        }
      }
    }
    if (ferUl.current && refForm.current && textRef.current) {
      const heightForm = refForm.current.offsetHeight
      ferUl.current.style.paddingBottom = +heightForm + "px"
    }
  }, [watch("text")])

  const receiverID = thread?.emitter?.id === userId ? thread.receivers[0]?.id! : thread?.emitter?.id!

  const disabled = (!watch("text").trim() && !filesState.file.length) || loading

  const onSubmit = handleSubmit(async (values) => {
    const message = values.text.trim()

    const body: IRequestPostMessages = {
      threadId: Number(thread?.id!),
      parentId: null,
      emitterId: userId!,
      receiverIds: [receiverID],
      enabled: true,
      created: new Date(),
    }

    if (message) {
      body.message = message
    }

    if (!loading) {
      setMessages((_) => [
        ..._,
        {
          id: Math.random(),
          message: message,
          parentId: null,
          threadId: Number(thread?.id!),
          emitterId: userId!,
          receiverIds: [receiverID],
          images: [],
          readIds: [],
          imagesString: filesState.string,
        },
      ])

      setLoading(true)
      const files = filesState.file
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.style.height = "2.5rem"
          textRef.current.style.borderRadius = `1.25rem`
        }
        resetField("text")
        setValue("text", "")
        dispatchMessageDraft(thread?.id, null)
        setFiles({ file: [], string: [] })
      })
      const response = await Promise.all(
        files.map((item) =>
          fileUploadService(item, {
            type: EnumTypeProvider.threads,
            userId: userId!,
            idSupplements: Number(thread?.id!),
          }),
        ),
      )

      const imgIds = response.filter((item) => !!item.data?.id).map((item) => item.data?.id!)

      if (imgIds.length) {
        body.images = imgIds
      }

      postMessage(body).then((response) => {
        console.log("response messages: ", response)
        refetch()
        setLoading(false)
      })
    }
  })

  if (isLoadingThread || isLoadingBarter) return <LoadingFooter />

  if (disabledBarterCompleted)
    return (
      <div className="w-full fixed md:absolute py-3 md:py-4 px-2.5 bottom-0 left-0 right-0 bg-BG-second border-t border-solid border-grey-stroke z-50 h-16 md:h-[4.5rem] flex flex-col items-center gap-1 justify-center">
        <p className="text-xs text-center text-text-secondary font-normal">Обмен завершён</p>
        <Link
          className="text-sm font-medium text-center text-text-accent"
          href={{
            pathname: "/chat",
            query: {
              user: receiverID,
            },
          }}
          prefetch={false}
        >
          Продолжить в личном чате
        </Link>
      </div>
    )

  return (
    <form
      ref={refForm}
      onSubmit={onSubmit}
      className="w-full fixed md:absolute bottom-0 right-0 left-0 grid grid-cols-[minmax(0,1fr)_2rem] md:grid-cols-[minmax(0,calc(50rem_-_2.625rem_-_2.5rem))_2rem] justify-center bg-BG-second border-t border-solid border-grey-stroke p-3 md:pt-3 md:pb-5 md:px-5 items-end gap-2.5 z-50"
    >
      <SendingPhotos dispatchDelete={dispatchDelete} files={filesState} />
      <Controller
        name="text"
        control={control}
        render={({ field }) => (
          <div className="w-full relative flex">
            <textarea
              value={field.value}
              onChange={(event) => {
                field.onChange(event)
                updateMessageDraft()
              }}
              className={cx(
                "w-full min-h-10 h-10 max-h-40 md:max-h-[13.75rem] py-2.5 pl-4 pr-[2.875rem] resize-none disabled:cursor-no-drop whitespace-pre-wrap",
                "text-text-primary font-normal text-base md:text-sm",
                "rounded-[1.25rem] border border-solid border-grey-stroke",
                "placeholder:text-text-secondary outline-none",
              )}
              disabled={loading || disabledBarterCompleted}
              placeholder={
                disabledBarterCompleted ? "Обмен завершён. Оставьте отзыв или продолжите общение в личном чате" : "Написать сообщение..."
              }
              ref={textRef}
            />
            <div className="absolute right-4 bottom-2.5 w-5 h-5 bg-transparent border-none outline-none cursor-pointer z-40 overflow-hidden">
              <input
                type="file"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 max-w-6 h-6 opacity-0 cursor-pointer z-30 disabled:cursor-no-drop"
                accept="image/*"
                multiple
                onChange={async (event) => {
                  const dataValues = await handleImageChange(event)
                  console.log("dataValues: ", dataValues)
                  setFiles(dataValues)
                  event.target.value = ""
                }}
                disabled={disabledBarterCompleted}
              />
              <IconPaperClip />
            </div>
          </div>
        )}
      />
      <button
        type="submit"
        className={cx(
          "w-8 h-10 px-4 py-5 relative border-none outline-none disabled:cursor-no-drop",
          !disabled || disabledBarterCompleted ? "opacity-100" : "opacity-50",
        )}
        disabled={disabled || disabledBarterCompleted}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8"
        >
          <g>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.43162 16L5.47047 6.43044C4.85654 4.94728 6.39844 3.48913 7.85647 4.17403L29.4949 14.3386C29.783 14.4357 30.0233 14.6019 30.2096 14.8106C30.5255 15.1454 30.6702 15.574 30.6652 16C30.6702 16.426 30.5255 16.8546 30.2096 17.1894C30.0232 17.3981 29.783 17.5643 29.4949 17.6614L7.85647 27.826C6.39844 28.5109 4.85654 27.0527 5.47047 25.5696L9.43162 16ZM7.68905 25.5903L7.66399 25.6508L7.66853 25.6487L7.68905 25.5903Z"
              fill="var(--btn-main-default)"
              className="fill-btn-main-default"
            />
          </g>
        </svg>
      </button>
    </form>
  )
}

FooterFormCreateMessage.displayName = "FooterFormCreateMessage"
export default memo(FooterFormCreateMessage)
