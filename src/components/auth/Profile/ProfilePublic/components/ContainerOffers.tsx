import { useId } from "react"

import { MotionUL } from "@/components/common/Motion"
import { CardRequestsAndProposals } from "@/components/common/Card"

import { MOCKS_PROPOSALS } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const ContainerOffers = () => {
  const idItem = useId()

  return (
    <div className={styles.containerRequestsAndProposals}>
      <MotionUL>
        {
          MOCKS_PROPOSALS.map((item, index) => (
            <CardRequestsAndProposals
              key={item.title + index + idItem}
              {...item}
            />
          ))
        }
      </MotionUL>
    </div>
  )
}