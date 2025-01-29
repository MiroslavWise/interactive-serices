"use client"

import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { type Dispatch, memo, type RefObject, type SetStateAction, useCallback, useEffect, useRef, useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { type IMessages } from "../ComponentCurrentChat"
import { type IResponseThread } from "@/services/threads/types"
import { type IRequestPostMessages } from "@/services/messages/types"

import SendingPhotos from "./SendingPhotos"
import LoadingFooter from "../../components/LoadingFooter"
import IconPaperClip from "@/components/icons/IconPaperClip"

import { cx } from "@/lib/cx"
import { useDebounce } from "@/helpers"
import { resolver, type TTypeSchema } from "../utils/schema"
import { handleImageChange } from "../utils/handle-image-change"
import { deCrypted, dispatchMessageDraft, useAuth, useDraftChat } from "@/store"
import { fileUploadService, getBarterId, getMessages, postMessage } from "@/services"
import { getCompanyId } from "@/services/companies"
import { clg } from "@console"

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
  const user = useAuth(({ user }) => user)
  const { company } = user ?? {}
  const { id: companyId } = company ?? {}

  const { data: dataCompany, isLoading } = useQuery({
    queryFn: () => getCompanyId(companyId!),
    queryKey: ["company", companyId],
    enabled: !!companyId,
  })

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

  const disabled = (!watch("text").trim() && !filesState.file.length) || loading

  const onSubmit = handleSubmit(async (values) => {
    const message = values.text.trim()

    const { receivers = [], emitter } = thread ?? {}

    let emitterId = userId
    const idsR = receivers.map((_) => _.id)
    let allReceivers = [...idsR, emitter?.id!]
    let currentReceivers = allReceivers.filter((_) => _ !== userId)

    const { owner, users = [] } = dataCompany?.data ?? {}

    clg("onSubmit receivers.length: ", receivers)
    clg("onSubmit owner: ", owner)
    clg("onSubmit userId: ", userId)

    if (receivers.length > 1 && owner && owner.id === userId && users.length > 0) {
      clg("onSubmit for: users:", users)
      const letEmitter: number[] = []
      for (const user of users) {
        const id = user.id
        if (idsR.includes(id)) {
          letEmitter.push(id)
          break
        }
      }
      clg("onSubmit for: letEmitter:", letEmitter)
      if (letEmitter.length > 0) {
        emitterId = letEmitter[0]
        currentReceivers = allReceivers.filter((_) => _ !== letEmitter[0])
      }
    }

    const body: IRequestPostMessages = {
      threadId: Number(thread?.id!),
      parentId: null,
      emitterId: emitterId!,
      receiverIds: currentReceivers,
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
          emitterId: emitterId!,
          receiverIds: currentReceivers,
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

  if (isLoadingThread) return <LoadingFooter />

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
              disabled={loading}
              placeholder={"Написать сообщение..."}
              ref={textRef}
            />
            <div className="absolute right-4 bottom-2.5 w-5 h-5 bg-transparent border-none outline-none cursor-pointer z-40 overflow-hidden">
              <input
                type="file"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 max-w-6 h-6 opacity-0 cursor-pointer z-30 disabled:cursor-no-drop"
                accept="image/*"
                multiple
                onChange={async (event) => {
                  const dataValues = await handleImageChange(event, filesState)
                  console.log("dataValues: ", dataValues)
                  setFiles(dataValues)
                  event.target.value = ""
                }}
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
          !disabled ? "opacity-100" : "opacity-50",
        )}
        disabled={disabled}
      >
        <svg
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

// if (disabledBarterCompleted)
//   return (
//     <div className="w-full fixed md:absolute py-3 md:py-4 px-2.5 bottom-0 left-0 right-0 bg-BG-second border-t border-solid border-grey-stroke z-50 h-16 md:h-[4.5rem] flex flex-col items-center gap-1 justify-center">
//       <p className="text-xs text-center text-text-secondary font-normal">Обмен завершён</p>
//       <Link
//         className="text-sm font-medium text-center text-text-accent"
//         href={{
//           pathname: "/chat",
//           query: {
//             user: receiverID,
//           },
//         }}
//         prefetch={false}
//       >
//         Продолжить в личном чате
//       </Link>
//     </div>
//   )
