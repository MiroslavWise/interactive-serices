import { useId } from "react"

import type { TItemsProposalsRequests } from "./types/types"

import { CardRequestsAndProposals } from "@/components/common/Card"
import { MotionUL } from "@/components/common/Motion"

import { MOCKS_PROPOSALS } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const ItemsProposalsRequests: TItemsProposalsRequests = ({ type }) => {
  const id = useId()

  return (
    <MotionUL classNames={[styles.containerRequestsAndProposals]}>
      {
        MOCKS_PROPOSALS.map((item, index) => (
          <CardRequestsAndProposals
            key={item.title + index + id}
            {...item}
            type={type}
          />
        ))
      }
    </MotionUL>
  )
}