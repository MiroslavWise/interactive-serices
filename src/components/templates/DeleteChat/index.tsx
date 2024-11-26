"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import Button from "@/components/common/Button"
import IconTrashBlack from "@/components/icons/IconTrashBlack"

import { cx } from "@/lib/cx"
import { deleteThread } from "@/services"
import { useCountMessagesNotReading } from "@/helpers"
import { dispatchCloseDeleteChat, useDeleteChat } from "@/store"

function DeleteChat() {
  const [loading, setLoading] = useState(false)
  const id = useDeleteChat(({ id }) => id)
  const { prefetch, replace } = useRouter()
  const { refetchCountMessages } = useCountMessagesNotReading(false)

  function deleteChat() {
    if (!loading) {
      if (!!id) {
        setLoading(true)
        prefetch("/chat")
        deleteThread(Number(id)).then((response) => {
          refetchCountMessages()
          console.log("%c --- response delete ---", "color: #f00", response)
          replace("/chat")
          setLoading(false)
          dispatchCloseDeleteChat()
        })
      }
    }
  }

  return (
    <>
      <article>
        <div
          className={cx(
            "relative w-11 h-11 p-[1.375rem] rounded-full bg-grey-field",
            "[&>svg>path]:!fill-text-error *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5",
          )}
        >
          <IconTrashBlack />
        </div>
        <h2>Вы уверены, что хотите удалить чат?</h2>
        <p className="text-text-primary text-sm text-center font-normal -mt-1">Восстановить его не получится</p>
      </article>
      <footer>
        <Button type="button" typeButton="fill-primary" label="Да, удалить" onClick={deleteChat} loading={loading} />
        <Button type="button" typeButton="regular-primary" label="Нет, оставить" disabled={loading} onClick={dispatchCloseDeleteChat} />
      </footer>
    </>
  )
}

DeleteChat.displayName = "DeleteChat"
export default DeleteChat
