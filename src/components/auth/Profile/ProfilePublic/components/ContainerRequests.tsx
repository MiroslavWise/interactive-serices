import { useId } from "react"

import { CardRequestsAndProposals } from "@/components/common/Card"

import { MOCKS_PROPOSALS } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const ContainerRequests = () => {
  const idItem = useId()

  return (
    <div className={styles.containerRequestsAndProposals}>
      <ul>
        {
          MOCKS_PROPOSALS.map((item, index) => (
            <CardRequestsAndProposals
              key={item.title + index + idItem}
              {...item}
            />
          ))
        }
      </ul>
    </div>
  )
}