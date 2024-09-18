"use client"

import { useState } from "react"

import { Button } from "@/components/common"

import { clg } from "@console"
import { deleteFriend } from "@/services"
import { dispatchDeleteFriend, useAuth, useDeleteFriend } from "@/store"

function DeleteFriend() {
  const user = useDeleteFriend(({ user }) => user)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)

  function handleDelete() {
    if (user?.id! !== userId! && userId) {
      if (!loading) {
        setLoading(true)
        deleteFriend(user?.id!).then((response) => {
          clg("delete friend: ", response, "warning")
          setLoading(false)
          handleOff()
        })
      }
    }
  }

  function handleOff() {
    dispatchDeleteFriend()
  }

  return (
    <>
      <footer>
        <Button type="button" typeButton="fill-primary" label="Да, удалить" onClick={handleDelete} loading={loading} />
        <Button type="button" typeButton="regular-primary" label="Нет, оставить" disabled={loading} onClick={handleOff} />
      </footer>
    </>
  )
}

DeleteFriend.displayName = "DeleteFriend"
export default DeleteFriend
