"use client"

import { useState } from "react"

import { Button } from "@/components/common"

import { useOut } from "@/helpers"
import { patchUser } from "@/services"
import { dispatchModal, dispatchModalClose, EModalData, useAuth_ } from "@/store"

function DeleteUser() {
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}
  const { out } = useOut()
  const [loading, setLoading] = useState(false)

  function close() {
    dispatchModal(EModalData.UpdateProfile)
  }

  function handleDeleteUser() {
    if (!loading) {
      setLoading(true)
      patchUser({ enabled: false }, userId!).then((response) => {
        if (response.ok) {
          out()
          dispatchModalClose()
        }
        setLoading(false)
      })
    }
  }

  return (
    <>
      <article>
        <div data-img>
          <img src="/svg/delete.svg" alt="delete" width={20} height={20} />
        </div>
        <h2>
          Вы действительно хотите удалить свой аккаунт? <span>При удалении все данные будут утеряны без возможности восстановления.</span>
        </h2>
      </article>
      <footer>
        <Button type="button" typeButton="fill-primary" label="Да, удалить" onClick={handleDeleteUser} loading={loading} />
        <Button type="button" typeButton="regular-primary" label="Нет, оставить" onClick={close} loading={loading} />
      </footer>
    </>
  )
}

DeleteUser.displayName = "DeleteUser"
export default DeleteUser
