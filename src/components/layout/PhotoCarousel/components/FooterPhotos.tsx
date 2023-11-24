import { NextImageMotion } from "@/components/common/Image"
import { MotionLI, MotionUL } from "@/components/common/Motion"

import { useVisiblePhotosCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function FooterPhotos() {
    const { photos, currentPhoto, setCurrentPhoto } = useVisiblePhotosCarousel(
        (_) => ({
            photos: _.photos,
            currentPhoto: _.currentPhoto,
            setCurrentPhoto: _.setCurrentPhoto,
        }),
    )

    return (
        <MotionUL classNames={[styles.containerFooterPhotos]}>
            {photos?.map((item) => (
                <MotionLI
                    classNames={[
                        currentPhoto?.id === item?.id && styles.active,
                    ]}
                    key={`${item.url}_${item?.id}`}
                >
                    <NextImageMotion
                        src={item?.url!}
                        alt="photo"
                        width={1920}
                        height={1080}
                        onClick={() => {
                            console.log("currentPhoto: ", item)
                            setCurrentPhoto({ currentPhoto: item })
                        }}
                    />
                </MotionLI>
            ))}
        </MotionUL>
    )
}
