import { NextImageMotion } from "@/components/common"

import { useVisiblePhotosCarousel, dispatchCurrentPhoto } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function FooterPhotos() {
  const photos = useVisiblePhotosCarousel(({ photos }) => photos)
  const currentPhoto = useVisiblePhotosCarousel(({ currentPhoto }) => currentPhoto)

  return (
    <ul className={styles.containerFooterPhotos}>
      {photos?.map((item) => (
        <li className={currentPhoto?.id === item?.id ? styles.active : ""} key={`${item.url}_${item?.id}`}>
          <NextImageMotion
            src={item?.url!}
            alt="offer-image"
            width={192}
            height={108}
            onClick={() => {
              dispatchCurrentPhoto({ currentPhoto: item })
            }}
          />
        </li>
      ))}
    </ul>
  )
}
