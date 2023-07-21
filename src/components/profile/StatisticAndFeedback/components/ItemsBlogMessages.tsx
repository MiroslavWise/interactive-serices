import { motion } from "framer-motion"

import type { TItemsBlogMessages } from "./types/types"

import { MOCKS_BLOGS_CARD } from "@/mocks/components/auth/constants"

import { CardBlog } from "@/components/common/Card"

import { motionOpacityY } from "@/lib/motion"

import styles from "./styles/style.module.scss"

export const ItemsBlogMessages: TItemsBlogMessages = ({ }) => {
  return (
    <motion.ul
      className={styles.listBlogMessages}
      variants={motionOpacityY}
      initial="hidden"
      animate="visible"
    >
      {
        MOCKS_BLOGS_CARD.map((item, index) => (
          <CardBlog
            key={item.photo + index}
            photo={item.photo}
            title={item.title}
            services={item?.services}
          />
        ))
      }
    </motion.ul>
  )
}