import { useId } from "react"
import Image from "next/image"

import type { TContainerPhotos } from "./types/types"

import { NextImageMotion } from "@/components/common/Image"

import { useVisiblePhotosCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ContainerPhotos: TContainerPhotos = ({ photos }) => {
  const id = useId()
  const { setCurrentPhoto, setVisibleCarousel } = useVisiblePhotosCarousel()

  return (
    <ul className={styles.containerPhotos}>
      {
        Array.isArray(photos)
          ? photos?.slice(0, 4)?.map((item, index) => (
            <div
              key={`${item.id}_${id}`}
              className={styles[`image-${index}`]}
              onClick={() => {
                setVisibleCarousel({
                  visible: true,
                  photos: photos,
                  idPhoto: item.id,
                })
              }}
            >
              <Image
                src={item?.url}
                alt="photos"
                width={400}
                height={800}
              />
            </div>
          )) : null
      }
    </ul>
  )
}