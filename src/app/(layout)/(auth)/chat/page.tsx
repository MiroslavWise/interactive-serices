"use client"

import dynamic from "next/dynamic"
import { parseAsInteger, useQueryState } from "nuqs"

import ComponentCurrentChat from "./_id_/ComponentCurrentChat"
const EmptyState = dynamic(() => import("./components/EmptyState"))
const CreateNewChat = dynamic(() => import("./components/CreateNewChat"))

import { QUERY_CHAT_MESSAGES } from "@/types/constants"

export default () => {
  const [id] = useQueryState(QUERY_CHAT_MESSAGES, parseAsInteger)

  if (id && typeof id === "number") return <ComponentCurrentChat id={id} />

  return (
    <section className="w-full h-full flex-col items-center justify-start bg-BG-second rounded-2 hidden md:flex">
      <CreateNewChat>
        <EmptyState />
      </CreateNewChat>
    </section>
  )
}
