import { useId } from "react"

import type { TItemsProposals } from "./types/types"

import { CardRequestsAndProposals } from "@/components/common/Card"

import { MOCKS_PROPOSALS } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const ItemsProposals: TItemsProposals = ({ }) => {
  const id = useId()

  return (
    <div className={styles.containerRequestsAndProposals}>
      <ul>
        {
          MOCKS_PROPOSALS.map((item, index) => (
            <CardRequestsAndProposals
              key={item.title + index + id}
              {...item}
            />
          ))
        }
      </ul>
    </div>
  )
}