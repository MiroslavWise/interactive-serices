import type { TContainerPhotos } from "./types/types"

import { NextImageMotion } from "@/components/common/Image"

import { useVisiblePhotosCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ContainerPhotos: TContainerPhotos = ({ photos }) => {
    const { dispatchVisibleCarousel } = useVisiblePhotosCarousel((_) => ({
        dispatchVisibleCarousel: _.dispatchVisibleCarousel,
    }))

    return (
        <ul className={styles.containerPhotos}>
            {Array.isArray(photos)
                ? photos?.slice(0, 4)?.map((item, index) => (
                      <div
                          data-photo
                          key={`${item.id}_my_offers`}
                          onClick={() => {
                            dispatchVisibleCarousel({
                                  visible: true,
                                  photos: photos,
                                  idPhoto: item.id,
                              })
                          }}
                      >
                          <NextImageMotion
                              src={item?.url}
                              alt="offer"
                              width={400}
                              height={400}
                          />
                      </div>
                  ))
                : null}
        </ul>
    )
}
