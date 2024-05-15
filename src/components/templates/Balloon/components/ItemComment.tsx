import type { ICommentsResponse } from "@/services/comments/types"

import { NextImageMotion } from "@/components/common"

import { daysAgo } from "@/helpers"

import styles from "../styles/item-comment.module.scss"

export const ItemComment = (props: ICommentsResponse) => {
  const { message, created, user } = props ?? {}

  const { image, firstName, lastName } = user ?? {}

  return (
    <div className={styles.container}>
      <div data-avatar-block>
        <NextImageMotion src={image?.attributes?.url!} alt="avatar" width={40} height={40} />
      </div>
      <div data-name-comment>
        <h5>
          {firstName || " "} {lastName || " "}&nbsp;<time>{daysAgo(created!)}</time>
        </h5>
        <p>{message || ""}</p>
        <article />
      </div>
    </div>
  )
}
