import { useQuery } from "@tanstack/react-query"

import type { ICommentsResponse } from "@/services/comments/types"

import { NextImageMotion } from "@/components/common"

import { daysAgo } from "@/helpers"
import { serviceProfile } from "@/services/profile"

import styles from "../styles/item-comment.module.scss"

export const ItemComment = (props: ICommentsResponse) => {
  const { userId, message, created } = props ?? {}

  const { data: dataProfile } = useQuery({
    queryFn: () => serviceProfile.getUserId(userId!),
    queryKey: ["profile", userId],
    enabled: !!userId,
  })

  const { res: resProfile } = dataProfile ?? {}
  const { image, firstName, lastName } = resProfile ?? {}

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
