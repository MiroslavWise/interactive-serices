


import type { TItemsBlogMessages } from "./types/types"

import { MOCKS_BLOGS_CARD } from "@/mocks/components/auth/constants"

import { CardBlog } from "@/components/common/Card"

import styles from "./styles/style.module.scss"

export const ItemsBlogMessages: TItemsBlogMessages = ({ }) => {
  

  return (
    <ul className={styles.listBlogMessages}>
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