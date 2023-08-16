import { MotionUL } from "@/components/common/Motion"

import { CardRequestsAndProposals } from "@/components/common/Card"

import { MOCKS_PROPOSALS } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const Offers = () => {

  return (
    <MotionUL classNames={[styles.peoples, styles.requestsAndProposals]}>
      {
        MOCKS_PROPOSALS.map((item, index) => (
          <CardRequestsAndProposals
            key={item.title + index + "proposals_all"}
            {...item}
            type="optional-3"
          />
        ))
      }
    </MotionUL>
  )
}