import { useRouter } from "next/navigation"
import { type DispatchWithoutAction } from "react"

import { dispatchAuthModal, useAuth } from "@/store"

import styles from "../styles/button-need-help.module.scss"

export const ButtonNeedHelp = ({ idUser, close }: { idUser: number; close: DispatchWithoutAction }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { push } = useRouter()

  function handle() {
    if (idUser === userId && !!userId) {
      return
    } else if (userId !== idUser) {
      if (!userId) {
        dispatchAuthModal({ visible: true, type: "SignIn" })
      } else if (!!userId) {
        push(`/chat?user=${idUser}`)
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
