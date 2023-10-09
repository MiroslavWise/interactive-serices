import { useId } from "react"
import { isMobile } from "react-device-detect"

import type { TItemsProposalsRequests } from "./types/types"

import { MotionUL } from "@/components/common/Motion"
import { CardRequestsAndProposals } from "@/components/common/Card"

import styles from "./styles/style.module.scss"

export const ItemsProposalsRequests: TItemsProposalsRequests = ({ type }) => {
    const id = useId()

    return (
        <MotionUL
            classNames={[
                styles.containerRequestsAndProposals,
                isMobile && styles.mobile,
            ]}
        >
            {/* {
        MOCKS_PROPOSALS.map((item, index) => (
          <CardRequestsAndProposals
            key={item.title + index + id}
            {...item}
            type={type}
          />
        ))
      } */}
            <></>
        </MotionUL>
    )
}
