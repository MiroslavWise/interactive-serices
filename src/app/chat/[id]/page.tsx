"use client"

import { useQuery } from "@tanstack/react-query"

import HeaderChatId from "./components/HeaderChatId"
import ListMessages from "./components/ListMessages"
import FooterFormCreateMessage from "./components/FooterFormCreateMessage"

import { useAuth } from "@/store"
import { getThreadId } from "@/services"

export interface IPropsChatId {
  params: {
    id: number | string
  }
}

export default ({ params: { id } }: IPropsChatId) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

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
    <div className="w-full md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)] overflow-hidden h-full md:rounded-[2rem] bg-BG-second relative flex flex-col justify-end">
      <HeaderChatId thread={thread} isLoadingThread={isLoadingThread} />
      <ListMessages thread={thread} />
      <FooterFormCreateMessage thread={thread} />
    </div>
  )
}
