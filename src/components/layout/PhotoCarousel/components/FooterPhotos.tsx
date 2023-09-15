import { ImageStatic } from "@/components/common/Image"
import { MotionLI, MotionUL } from "@/components/common/Motion"

import { useVisiblePhotosCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function FooterPhotos() {
    const { photos, currentPhoto, setCurrentPhoto } = useVisiblePhotosCarousel()

    return (
        <MotionUL classNames={[styles.containerFooterPhotos]}>
            {photos?.map((item) => (
                <MotionLI
                    classNames={[
                        currentPhoto?.id === item?.id && styles.active,
                    ]}
                    key={`${item.url}_${item?.id}`}
                    onClick={() => {
                        setCurrentPhoto({ currentPhoto: item })
                    }}
                >
                    <ImageStatic
                        src={item?.url!}
                        alt="photo"
                        width={1920}
                        height={1080}
                        classNames={[]}
                    />
                </MotionLI>
            ))}
        </MotionUL>
    )
}
