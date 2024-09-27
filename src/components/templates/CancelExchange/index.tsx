"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { Button } from "@/components/common"

import { useCountMessagesNotReading } from "@/helpers"
import { deleteThread, getBarterId, getThreadId, patchBarter } from "@/services"
import { dispatchCloseCancelExchange, useAuth, useCancelExchange } from "@/store"

export const CN_CANCEL_EXCHANGE = "rounded-t-3xl p-5 pt-14 md:p-10 flex flex-col gap-[1.875rem]"

function CancelExchange() {
  const { refetchCountMessages } = useCountMessagesNotReading(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const barterId = useCancelExchange(({ barterId }) => barterId)
  const threadId = useCancelExchange(({ threadId }) => threadId)
  const [loading, setLoading] = useState(false)
  const { prefetch, push } = useRouter()

  const { refetch } = useQuery({
    queryFn: () => getBarterId(barterId!),
    queryKey: ["barters", { id: barterId! }],
    enabled: false,
  })

  const { refetch: refetchThread } = useQuery({
    queryFn: () => getThreadId(threadId!),
    queryKey: ["threads", { userId: userId, threadId: threadId! }],
    enabled: false,
  })

  function handleOk() {
    if (!loading) {
      setLoading(true)
      prefetch("/chat")
      Promise.all([patchBarter({ status: EnumStatusBarter.CANCELED, enabled: false }, barterId!), deleteThread(threadId!)]).then(() => {
        Promise.all([refetchCountMessages(), refetch(), refetchThread()])
        requestAnimationFrame(() => {
          push("/chat")
        })
        setTimeout(() => {
          dispatchCloseCancelExchange()
        })
      })
    }
  }

  return (
    <>
      <h3 className="text-text-primary text-center text-2xl font-semibold">Вы уверены, что хотите отменить предложение обмена?</h3>
      <footer className="w-full flex flex-col-reverse md:flex-row items-center gap-3">
        <Button type="button" typeButton="regular-primary" onClick={dispatchCloseCancelExchange} label="Нет, оставить" loading={loading} />
        <Button type="button" typeButton="fill-primary" onClick={handleOk} label="Да, отменить" loading={loading} />
      </footer>
    </>
  )
}

CancelExchange.displayName = "CancelExchange"
export default CancelExchange
