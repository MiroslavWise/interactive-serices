import { DispatchWithoutAction } from "react"

import { usePush } from "@/helpers"
import { dispatchAuthModal, useAuth } from "@/store"

import styles from "../styles/button-need-help.module.scss"

export const ButtonNeedHelp = ({ idUser, close }: { idUser: number; close: DispatchWithoutAction }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { handlePush } = usePush()

  function handle() {
    if (idUser === userId && !!userId) {
      return
    } else if (userId !== idUser) {
      if (!userId) {
        dispatchAuthModal({ visible: true, type: "SignIn" })
      } else if (!!userId) {
        handlePush(`/messages?user=${idUser}`)
      }
      if (close) {
        close()
      }
    }
  }

  return (
    <button type="button" className={styles.container} onClick={handle}>
      <span>Могу помочь</span>
    </button>
  )
}
