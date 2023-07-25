import { useId } from "react"

import type { TItemsRequests } from "./types/types"

import { CardRequestsAndProposals } from "@/components/common/Card"
import { MotionUL } from "@/components/common/Motion"

import { MOCKS_PROPOSALS } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const ItemsRequests: TItemsRequests = ({ }) => {
  const id = useId()

  return (
    <div className={styles.containerRequestsAndProposals}>
      <MotionUL>
        {
          MOCKS_PROPOSALS.map((item, index) => (
            <CardRequestsAndProposals
              key={item.title + index + id}
              {...item}
            />
          ))
        }
      </MotionUL>
    </div>
  )
}