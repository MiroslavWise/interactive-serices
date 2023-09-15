import { MotionUL } from "@/components/common/Motion"

import { CardRequestsAndProposals } from "@/components/common/Card"

import { MOCKS_PROPOSALS } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const Requests = () => {
  return (
    <MotionUL classNames={[styles.peoples, styles.requestsAndProposals]}>
    {
      MOCKS_PROPOSALS.map((item, index) => (
        <CardRequestsAndProposals
          key={item.title + index + "requests_all"}
          {...item}
          type="optional-2"
        />
      ))
    }
  </MotionUL>
  )
}