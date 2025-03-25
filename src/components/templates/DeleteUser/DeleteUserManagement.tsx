import { useState } from "react"

import Button from "@/components/common/Button"
import { IconSprite } from "@/components/icons/icon-sprite"

import { deleteUser } from "@/services"
import { dispatchDeleteUser, useDeleteUser } from "@/store/state/useDeleteUser"

function DeleteUserManagement() {
  const id = useDeleteUser(({ id }) => id)
  const [loading, setLoading] = useState(false)

  async function handleDeleteUser() {
    if (!loading && id) {
      setLoading(true)
      await deleteUser(id!)
      close()
      setLoading(false)
    }
  }

  function close() {
    dispatchDeleteUser()
  }

  return (
    <>
      <article>
        <div data-img className="text-text-error relative">
          <IconSprite id="trash-20-20" className="w-5 h-5" />
        </div>
        <h2>
          Вы действительно хотите удалить?{" "}
          <span className="text-text-error">При удалении все данные будут утеряны без возможности восстановления.</span>
        </h2>
      </article>
      <footer>
        <Button type="button" typeButton="fill-primary" label="Да, удалить" onClick={handleDeleteUser} loading={loading} />
        <Button type="button" typeButton="regular-primary" label="Нет, оставить" onClick={close} loading={loading} />
      </footer>
    </>
  )
}

DeleteUserManagement.displayName = "DeleteUserManagement"
export default DeleteUserManagement
