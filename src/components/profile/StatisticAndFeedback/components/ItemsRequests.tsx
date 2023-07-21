import { useId } from "react"
import { motion } from "framer-motion"

import type { TItemsRequests } from "./types/types"

import { CardRequestsAndProposals } from "@/components/common/Card"

import { MOCKS_PROPOSALS } from "@/mocks/components/auth/constants"
import { motionOpacityY } from "@/lib/motion"

import styles from "./styles/style.module.scss"

export const ItemsRequests: TItemsRequests = ({ }) => {
  const id = useId()

  return (
    <div className={styles.containerRequestsAndProposals}>
      <motion.ul
        variants={motionOpacityY}
        initial="hidden"
        animate="visible"
      >
        {
          MOCKS_PROPOSALS.map((item, index) => (
            <CardRequestsAndProposals
              key={item.title + index + id}
              {...item}
            />
          ))
        }
      </motion.ul>
    </div>
  )
}