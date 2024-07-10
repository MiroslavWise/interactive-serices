"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { type IRequestPostMessages } from "@/services/messages/types"
import { type IResponseThread } from "@/services/threads/types"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { getMessages, postMessage } from "@/services"
import { resolver, type TTypeSchema } from "../utils/schema"

function FooterFormCreateMessage({ thread }: { thread: IResponseThread }) {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)

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
    if (watch("text")) {
      if (textRef.current) {
        textRef.current.style.height = "auto"
        textRef.current.style.height = textRef.current.scrollHeight + "px"
        if (textRef.current.scrollHeight > 40) {
          textRef.current.style.borderRadius = `1rem`
        } else {
          textRef.current.style.borderRadius = `1.25rem`
        }
      }
    }
  }, [watch("text")])

  const receiver = thread?.emitter?.id === userId ? thread.receivers[0]?.id! : thread?.emitter?.id!

  const onSubmit = handleSubmit((values) => {
    const body: IRequestPostMessages = {
      threadId: thread?.id!,
      message: values.text.trim(),
      parentId: null,
      emitterId: userId!,
      receiverIds: [receiver],
      enabled: true,
      created: new Date(),
    }

    if (!loading) {
      setLoading(true)
      setTimeout(() => {
        if (textRef.current) {
          reset()
          textRef.current.style.height = "2.5rem"
          textRef.current.style.borderRadius = `1.25rem`
        }
      })

      postMessage(body).then((response) => {
        console.log("response messages: ", response)
        refetch()
        setLoading(false)
      })
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="w-full grid grid-cols-[minmax(0,1fr)_2rem] bg-BG-second border-t border-solid border-grey-stroke p-3 md:pt-3 md:pb-5 md:px-5 items-end justify-end gap-2.5"
    >
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
            <div className="absolute right-4 bottom-2.5"></div>
          </div>
        )}
      />
      <button type="submit" className="w-8 h-10 px-4 py-5 relative border-none outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8"
        >
          <g opacity={!!watch("text").trim() || !loading ? "1" : "0.5"}>
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
