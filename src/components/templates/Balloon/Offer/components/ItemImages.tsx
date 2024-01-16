import type { IImageData } from "@/store/types/useAuthState"

import { NextImageMotion } from "@/components/common"

import { dispatchPhotoCarousel } from "@/store/hooks"

import styles from "../styles/images.module.scss"

export const ItemImages = ({ images }: { images: IImageData[] }) => {
    return (
        <div className={styles.container}>
            <div data-images>
                {images.map((item) => (
                    <NextImageMotion
                        key={`::${item.id}::photo::offer::`}
                        src={item?.attributes?.url!}
                        alt="offer-image"
                        width={80}
                        height={90}
                        onClick={() => {
                            const photos = images.map((item) => ({
                                url: item?.attributes?.url!,
                                id: item?.id,
                            }))
                            dispatchPhotoCarousel({
                                visible: true,
                                photos: photos,
                                idPhoto: item?.id!,
                            })
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
