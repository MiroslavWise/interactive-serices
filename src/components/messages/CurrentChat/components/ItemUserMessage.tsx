"use client"

import { memo } from "react"
import { isMobile } from "react-device-detect"

import type { TItemMessage } from "./types/types"
import type { IPhoto } from "@/store/types/useVisiblePhotosCarousel"

import { ImageStatic, NextImageMotion } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchPhotoCarousel } from "@/store/hooks"
import { stylesBlockRight } from "@/lib/styles-block-message"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"

import styles from "./styles/item-message.module.scss"

export const ItemUserMessage: TItemMessage = memo(function $ItemUserMessage({ photo, messages }) {
  function handleImage(id: number, photos: IPhoto[]) {
    dispatchPhotoCarousel({ visible: true, idPhoto: id, photos })
  }

  return (
    <li className={styles.containerItemUserMessage}>
      {!isMobile ? (
        photo ? (
          <NextImageMotion src={photo} alt="avatar" width={32} height={32} className={styles.avatar} />
        ) : (
          <ImageStatic src="/png/default_avatar.png" alt="avatar" width={32} height={32} className={styles.avatar} />
        )
      ) : null}
      <div className={styles.messages}>
        {messages?.map((item, index) => (
          <div
            className={cx(styles.blockMessage, styles[stylesBlockRight(messages?.length!, index)])}
            key={`${item.id}_${item.message}`}
            id={`${item.id!}`}
          >
            {item?.images?.map((item_) =>
              typeof item_ !== "string" ? (
                <NextImageMotion
                  key={`${item_.id}-images-message`}
                  src={item_.attributes?.url}
                  alt="offer-image"
                  width={240}
                  height={160}
                  onClick={() => {
                    handleImage(
                      item_.id,
                      item?.images?.map((item_) => ({
                        url: typeof item_ !== "string" ? item_!?.attributes?.url! : "",
                        id: typeof item_ !== "string" ? item_!?.id! : 0,
                      })) as IPhoto[],
                    )
                  }}
                />
              ) : null,
            )}
            <p>{item.message}</p>
            <time className={styles.time}>{timeNowOrBeforeChat(item?.time!)}</time>
          </div>
        ))}
      </div>
    </li>
  )
})
