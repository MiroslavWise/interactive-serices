import type { TContainerBlogs } from "./types"

import { MotionUL } from "@/components/common/Motion"
import { CardBlog } from "@/components/common/Card"

import { MOCKS_BLOGS_CARD } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const ContainerBlogs: TContainerBlogs = ({ }) => {

  return (
    <MotionUL classNames={[styles.containerReviews]}>
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
    </MotionUL>
  )
}