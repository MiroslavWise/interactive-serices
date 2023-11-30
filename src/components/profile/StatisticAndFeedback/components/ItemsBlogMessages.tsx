import { isMobile } from "react-device-detect"

import type { TItemsBlogMessages } from "./types/types"

import { MotionUL } from "@/components/common/Motion"

import { CardBlog } from "@/components/common/Card"

import styles from "./styles/style.module.scss"

export const ItemsBlogMessages: TItemsBlogMessages = ({}) => {
    return (
        <MotionUL classNames={[styles.listBlogMessages, isMobile && styles.mobile]}>
            {/* {
        MOCKS_BLOGS_CARD.map((item, index) => (
          <CardBlog
            key={item.photo + index}
            photo={item.photo}
            title={item.title}
            services={item?.services}
          />
        ))
      } */}
            <></>
        </MotionUL>
    )
}
