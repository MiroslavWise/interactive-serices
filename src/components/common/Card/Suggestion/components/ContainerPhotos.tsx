"use client"

import type { TContainerPhotos } from "./types/types"

import { NextImageMotion } from "@/components/common/Image"

import { dispatchPhotoCarousel } from "@/store/hooks"

import styles from "./styles/container-photos.module.scss"

export const ContainerPhotos: TContainerPhotos = ({ photos }) => {
  return photos?.length ? (
    <ul className={styles.container} data-length={photos?.length < 4 ? photos?.length : 4} data-container-photos>
      <NextImageMotion
        src={photos[0]?.url}
        alt="offer"
        width={80}
        height={120}
        onClick={() => {
          dispatchPhotoCarousel({
            visible: true,
            photos: photos,
            idPhoto: photos[0]?.id!,
          })
        }}
      />
      <div data-column>
        {photos?.slice(1, 4).map((item) => (
          <NextImageMotion
            src={item?.url}
            alt="offer"
            width={40}
            height={40}
            key={item.url}
            onClick={() => {
              dispatchPhotoCarousel({
                visible: true,
                photos: photos,
                idPhoto: item?.id!,
              })
            }}
          />
        ))}
      </div>
    </ul>
  ) : null
}
