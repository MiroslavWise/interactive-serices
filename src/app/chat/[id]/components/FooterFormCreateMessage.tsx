"use client"

import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseThread } from "@/services/threads/types"
import { type IRequestPostMessages } from "@/services/messages/types"

import SendingPhotos from "./SendingPhotos"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useWebSocket } from "@/context"
import { resolver, type TTypeSchema } from "../utils/schema"
import { fileUploadService, getMessages, postMessage } from "@/services"

const MAX_FILE_SIZE = 9.9 * 1024 * 1024
const sleep = () => new Promise((r) => setTimeout(r, 50))

function FooterFormCreateMessage({
  thread,
  isLoadingThread,
  ferUl,
}: {
  thread: IResponseThread
  isLoadingThread: boolean
  ferUl: RefObject<HTMLUListElement>
}) {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const refForm = useRef<HTMLFormElement>(null)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)

  const [filesState, setFiles] = useState<{ file: File[]; string: string[] }>({
    file: [],
    string: [],
  })
  function dispatchDelete(index: number) {
    if (!loading) {
      setFiles((item) => ({
        file: item.file.filter((_, i) => i !== index),
        string: item.string.filter((_, i) => i !== index),
      }))
    }
  }
  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
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
  }

  const { refetch } = useQuery({
    queryFn: () => getMessages({ thread: thread?.id! }),
    queryKey: ["messages", { threadId: thread?.id! }],
    enabled: false,
  })

  const { handleSubmit, watch, control, reset } = useForm<TTypeSchema>({
    resolver: resolver,
    defaultValues: {
      text: "",
    },
  })

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
      const widthWindow = window.document.documentElement.clientWidth
      ferUl.current.style.paddingBottom = +heightForm + (widthWindow < 769 ? 12 : 20) + "px"
    }
  }, [watch("text")])

  const receiver = thread?.emitter?.id === userId ? thread.receivers[0]?.id! : thread?.emitter?.id!

  const onSubmit = handleSubmit(async (values) => {
    const message = values.text.trim()

    const body: IRequestPostMessages = {
      threadId: Number(thread?.id!),
      parentId: null,
      emitterId: userId!,
      receiverIds: [receiver],
      enabled: true,
      created: new Date(),
    }

    if (message) {
      body.message = message
    }

    if (!loading) {
      setLoading(true)
      const files = filesState.file
      const response = await Promise.all(
        files.map((item) =>
          fileUploadService(item, {
            type: EnumTypeProvider.threads,
            userId: userId!,
            idSupplements: Number(thread?.id!),
          }),
        ),
      )

      const imgIds = response.filter((item) => !!item.res?.id).map((item) => item.res?.id!)

      if (imgIds.length) {
        body.images = imgIds
      }

      postMessage(body).then((response) => {
        console.log("response messages: ", response)
        refetch()
        setLoading(false)
      })

      setTimeout(() => {
        if (textRef.current) {
          setFiles({ file: [], string: [] })
          reset()
          textRef.current.style.height = "2.5rem"
          textRef.current.style.borderRadius = `1.25rem`
        }
      })
    }
  })

  if (isLoadingThread)
    return (
      <div className="loading-screen w-full mt-auto p-5 grid grid-cols-[minmax(0,1fr)_2.25rem] gap-2.5 *:w-full *:h-9 *:rounded-[1.125rem] fixed md:absolute bottom-0 left-0 right-0">
        <span />
        <span />
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
              onChange={field.onChange}
              className={cx(
                "w-full min-h-10 h-10 max-h-40 md:max-h-13.75rem py-2.5 pl-4 pr-[2.875rem] resize-none",
                "text-text-primary font-normal text-base md:text-sm",
                "rounded-[1.25rem] border border-solid border-grey-stroke",
                "placeholder:text-text-secondary outline-none",
              )}
              onKeyDown={(event) => {
                if (event.keyCode === 13 || event.code === "Enter") {
                  onSubmit()
                }
              }}
              placeholder="Написать сообщение..."
              ref={textRef}
            />
            <div className="absolute right-4 bottom-2.5 w-5 h-5 bg-transparent border-none outline-none cursor-pointer z-40">
              <input
                type="file"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 opacity-0 cursor-pointer z-30"
                accept="image/png, image/gif, image/jpeg, image/*, .png, .jpg, .jpeg"
                multiple
                onChange={async (event) => {
                  const dataValues = await handleImageChange(event)
                  console.log("dataValues: ", dataValues)
                  setFiles(dataValues)
                  event.target.value = ""
                }}
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="w-5 h-5 pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <path
                  d="M17.8666 9.2081L10.2082 16.8664C9.27005 17.8046 7.99757 18.3317 6.67075 18.3317C5.34393 18.3317 4.07145 17.8046 3.13325 16.8664C2.19505 15.9282 1.66797 14.6558 1.66797 13.3289C1.66797 12.0021 2.19505 10.7296 3.13325 9.79144L10.7916 2.1331C11.4171 1.50763 12.2654 1.15625 13.1499 1.15625C14.0345 1.15625 14.8828 1.50763 15.5082 2.1331C16.1337 2.75857 16.4851 3.60689 16.4851 4.49144C16.4851 5.37598 16.1337 6.2243 15.5082 6.84977L7.84158 14.5081C7.52885 14.8208 7.10469 14.9965 6.66242 14.9965C6.22014 14.9965 5.79598 14.8208 5.48325 14.5081C5.17051 14.1954 4.99482 13.7712 4.99482 13.3289C4.99482 12.8867 5.17051 12.4625 5.48325 12.1498L12.5582 5.0831"
                  stroke="var(--element-grey-light)"
                  className="stroke-element-grey-light"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
      />
      <button
        type="submit"
        className={cx("w-8 h-10 px-4 py-5 relative border-none outline-none", !!watch("text").trim() ? "opacity-100" : "opacity-50")}
        disabled={!watch("text").trim() || loading}
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
export default FooterFormCreateMessage
