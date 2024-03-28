"use client"

import { memo } from "react"

import type { TItemMessage } from "./types/types"
import type { IPhoto } from "@/store/types/useVisiblePhotosCarousel"

import { ImageStatic, NextImageMotion } from "@/components/common"

import { cx } from "@/lib/cx"
import { useResize } from "@/helpers"
import { dispatchPhotoCarousel } from "@/store"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"
import { stylesBlockRight } from "@/lib/styles-block-message"

import styles from "./styles/item-message.module.scss"

export const ItemMyMessage: TItemMessage = memo(function $ItemMyMessage({ photo, messages }) {
  const { isTablet } = useResize()

  function handleImage(id: number, photos: IPhoto[]) {
    dispatchPhotoCarousel({
      visible: true,
      idPhoto: id,
      photos: photos,
    })
  }

  return (
    <li className={styles.containerItemMyMessage}>
      <div className={styles.messages}>
        {messages?.map((item, index) => (
          <div
            className={cx(styles.blockMessage, styles[stylesBlockRight(messages?.length!, index)])}
            key={`${item.id}_${item.message}`}
            id={`${item.id!}`}
            data-only-image={!item?.message?.trim() && item?.images?.length > 0}
          >
            {item?.images?.length ? (
              <div data-images>
                {item?.images?.map((item_, index) =>
                  typeof item_ === "string" ? (
                    <ImageStatic
                      key={`${item_}-images-message-${index}`}
                      src={item_!}
                      alt="offer"
                      width={240}
                      height={160}
                      onClick={() => {
                        handleImage(
                          index,
                          item?.images?.map((_) => ({
                            url: _ as string,
                            id: index!,
                          })),
                        )
                      }}
                    />
                  ) : (
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
                          })),
                        )
                      }}
                    />
                  ),
                )}
              </div>
            ) : null}
            <p>{item.message}</p>
            <time className={styles.time}>
              {timeNowOrBeforeChat(item?.time)}{" "}
              <img
                src={
                  item?.reading === null
                    ? "/public/svg/messages/check.svg"
                    : item?.readIds?.length > 0
                    ? "/svg/messages/double-tick-white.svg"
                    : "/svg/messages/double-tick-gray.svg"
                }
                alt="check"
                width={14}
                height={14}
              />
            </time>
          </div>
        ))}
      </div>
      {!isTablet ? (
        photo ? (
          <NextImageMotion src={photo} alt="avatar" width={32} height={32} className={styles.avatar} />
        ) : (
          <ImageStatic src="/png/default_avatar.png" alt="avatar" width={32} height={32} className={styles.avatar} />
        )
      ) : null}
    </li>
  )
})
