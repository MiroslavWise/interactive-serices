"use client"

import { useState } from "react"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { useOut } from "@/helpers"
import { deleteUser } from "@/services"
import { dispatchDeleteUser, useAuth, useDeleteUser, dispatchUpdateProfile } from "@/store"

import styles from "@/components/templates/OutAccount/style.module.scss"

export const DeleteUser = () => {
  const userId = useAuth(({ userId }) => userId)
  const { out } = useOut()
  const [loading, setLoading] = useState(false)
  const visible = useDeleteUser(({ visible }) => visible)

  function close() {
    dispatchDeleteUser(false)
  }

  function handleDeleteUser() {
    if (!loading) {
      setLoading(true)
      deleteUser(userId!).then((response) => {
        if (response.ok) {
          out()
          dispatchDeleteUser(false)
          dispatchUpdateProfile(false)
        }
        setLoading(false)
      })
    }
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
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
      </section>
    </div>
  )
}
