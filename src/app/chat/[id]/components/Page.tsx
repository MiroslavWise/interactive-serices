"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useQuery } from "@tanstack/react-query"

import { type IResponseMessage } from "@/services/messages/types"

import LoadingList from "./LoadingList"
import LoadingHeader from "../../components/LoadingHeader"
import LoadingFooter from "../../components/LoadingFooter"
const ListMessages = dynamic(() => import("./ListMessages"), { loading: LoadingList })
const HeaderChatId = dynamic(() => import("./HeaderChatId"), { loading: LoadingHeader })
const FooterFormCreateMessage = dynamic(() => import("./FooterFormCreateMessage"), { loading: LoadingFooter })

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { getThreadId } from "@/services"

export interface IMessages extends IResponseMessage {
  imagesString?: string[]
}

export default ({ id }: { id: string | number }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const ferUl = useRef<HTMLUListElement>(null)
  const [messages, setMessages] = useState<IMessages[]>([])

  const { data: dataThread, isLoading: isLoadingThread } = useQuery({
    queryFn: () => getThreadId(id!),
    queryKey: ["threads", { userId: userId, threadId: id }],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
    enabled: !!id,
  })

  const thread = dataThread?.data!

  return (
    <section
      className={cx(
        "w-full max-h-screen md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_3rem)] overflow-hidden h-screen md:h-full md:rounded-2 bg-BG-second relative flex flex-col justify-end",
        "max-md:max-h-dvh max-md:h-dvh",
      )}
    >
      <HeaderChatId thread={thread} isLoadingThread={isLoadingThread} />
      <ListMessages thread={thread} ferUl={ferUl} setMessages={setMessages} messages={messages} />
      <FooterFormCreateMessage thread={thread} isLoadingThread={isLoadingThread} ferUl={ferUl} setMessages={setMessages} id={id} />
    </section>
  )
}
