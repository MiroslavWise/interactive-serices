"use client"

import dynamic from "next/dynamic"
import { useRef, useState } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"

import { type IResponseMessage } from "@/services/messages/types"

import LoadingList from "./components/LoadingList"
import ClientLayout from "./components/ClientLayout"
import LoadingHeader from "../components/LoadingHeader"
import LoadingFooter from "../components/LoadingFooter"
import ComponentProfile from "./_profile/ComponentProfile"
const ListMessages = dynamic(() => import("./components/ListMessages"), { loading: LoadingList })
const HeaderChatId = dynamic(() => import("./components/HeaderChatId"), { loading: LoadingHeader })
const FooterFormCreateMessage = dynamic(() => import("./components/FooterFormCreateMessage"), { loading: LoadingFooter })

import { useAuth } from "@/store"
import { getThreadId } from "@/services"

export interface IMessages extends IResponseMessage {
  imagesString?: string[]
}

function ComponentCurrentChat({ id }: { id: number }) {
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
    <ClientLayout>
      <section className="w-full max-h-screen md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_3rem)] overflow-hidden h-dvh md:h-full md:rounded-2 bg-BG-second relative flex flex-col justify-end">
        <HeaderChatId thread={thread} isLoadingThread={isLoadingThread} />
        <ListMessages thread={thread} ferUl={ferUl} setMessages={setMessages} messages={messages} />
        <FooterFormCreateMessage thread={thread} isLoadingThread={isLoadingThread} ferUl={ferUl} setMessages={setMessages} id={id!} />
      </section>
      <ComponentProfile id={id!} />
    </ClientLayout>
  )
}

export default ComponentCurrentChat
