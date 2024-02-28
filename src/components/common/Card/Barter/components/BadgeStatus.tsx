import { EnumStatusBarter } from "@/types/enum"

import styles from "../styles/badge-status.module.scss"

export const BadgeStatus = ({ status }: { status: EnumStatusBarter }) => {
  if (status === EnumStatusBarter.EXECUTED)
    return (
      <div data-executed className={styles.container}>
        <span>В процессе</span>
      </div>
    )

  if (status === EnumStatusBarter.COMPLETED)
    return (
      <div data-completed className={styles.container}>
        <span>Завершён</span>
      </div>
    )

  return null
}
