import type { TContainerBlogs } from "./types"

import { MOCKS_BLOGS_CARD } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"
import { CardBlog } from "@/components/common/Card"

export const ContainerBlogs: TContainerBlogs = ({ }) => {

  return (
    <ul className={styles.containerReviews}>
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
    </ul>
  )
}