"use client"

import dynamic from "next/dynamic"
import { useRef, useState } from "react"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

import { type IResponseMessage } from "@/services/messages/types"

import LoadingList from "./components/LoadingList"
import LoadingHeader from "../components/LoadingHeader"
import LoadingFooter from "../components/LoadingFooter"
const ListMessages = dynamic(() => import("./components/ListMessages"), { loading: LoadingList })
const HeaderChatId = dynamic(() => import("./components/HeaderChatId"), { loading: LoadingHeader })
const FooterFormCreateMessage = dynamic(() => import("./components/FooterFormCreateMessage"), { loading: LoadingFooter })

import { useAuth } from "@/store"
import { getThreadId } from "@/services"

export interface IMessages extends IResponseMessage {
  imagesString?: string[]
}

export default ({ params: { id } }: { params: { id: string } }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const ferUl = useRef<HTMLUListElement>(null)
  const [messages, setMessages] = useState<IMessages[]>([])

  const { data: dataThread, isLoading: isLoadingThread } = useSuspenseQuery({
    queryFn: () => getThreadId(id!),
    queryKey: ["threads", { userId: userId, threadId: id }],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  })

  const thread = dataThread?.data!

  return (
    <section className="w-full max-h-screen md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_3rem)] overflow-hidden h-dvh md:h-full md:rounded-2 bg-BG-second relative flex flex-col justify-end">
      <HeaderChatId thread={thread} isLoadingThread={isLoadingThread} />
      <ListMessages thread={thread} ferUl={ferUl} setMessages={setMessages} messages={messages} />
      <FooterFormCreateMessage thread={thread} isLoadingThread={isLoadingThread} ferUl={ferUl} setMessages={setMessages} id={id} />
    </section>
  )
}
