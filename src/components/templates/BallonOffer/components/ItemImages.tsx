import type { IImageData } from "@/store/types/useAuthState"

import { NextImageMotion } from "@/components/common"

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
                    />
                ))}
            </div>
        </div>
    )
}
