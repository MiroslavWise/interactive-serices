"use client"

import { useQuery } from "@tanstack/react-query"

import HeaderChatId from "./HeaderChatId"
import ListMessages from "./ListMessages"
import FooterFormCreateMessage from "./FooterFormCreateMessage"

import { useAuth } from "@/store"
import { getThreadId } from "@/services"

export default ({ id }: { id: string | number }) => {
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
    <div className="w-full max-h-screen md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)] overflow-hidden h-full md:rounded-[2rem] bg-BG-second relative flex flex-col justify-end">
      <HeaderChatId thread={thread} isLoadingThread={isLoadingThread} />
      <ListMessages thread={thread} />
      <FooterFormCreateMessage thread={thread} />
    </div>
  )
}
