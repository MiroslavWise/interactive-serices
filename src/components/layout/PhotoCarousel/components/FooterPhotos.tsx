import { NextImageMotion } from "@/components/common/Image"

import { useVisiblePhotosCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function FooterPhotos() {
    const photos = useVisiblePhotosCarousel(({ photos }) => photos)
    const currentPhoto = useVisiblePhotosCarousel(({ currentPhoto }) => currentPhoto)
    const setCurrentPhoto = useVisiblePhotosCarousel(({ setCurrentPhoto }) => setCurrentPhoto)

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
                            setCurrentPhoto({ currentPhoto: item })
                        }}
                    />
                </li>
            ))}
        </ul>
    )
}
