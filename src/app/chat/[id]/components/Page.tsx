"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { useQuery } from "@tanstack/react-query"

import LoadingList from "./LoadingList"
import LoadingHeader from "../../components/LoadingHeader"
import LoadingFooter from "../../components/LoadingFooter"
const ListMessages = dynamic(() => import("./ListMessages"), { loading: LoadingList })
const HeaderChatId = dynamic(() => import("./HeaderChatId"), { loading: LoadingHeader })
const FooterFormCreateMessage = dynamic(() => import("./FooterFormCreateMessage"), { loading: LoadingFooter })

import { useAuth } from "@/store"
import { getThreadId } from "@/services"

export default ({ id }: { id: string | number }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const ferUl = useRef<HTMLUListElement>(null)

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
    <section className="w-full max-h-screen md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)] overflow-hidden h-screen md:h-full md:rounded-[2rem] bg-BG-second relative flex flex-col justify-end max-md:!pb-[var(--height-mobile-footer-nav)]">
      <HeaderChatId thread={thread} isLoadingThread={isLoadingThread} />
      <ListMessages thread={thread} ferUl={ferUl} />
      <FooterFormCreateMessage thread={thread} isLoadingThread={isLoadingThread} ferUl={ferUl} />
    </section>
  )
}
