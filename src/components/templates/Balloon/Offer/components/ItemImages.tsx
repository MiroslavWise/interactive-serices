import { useRef } from "react"

import type { IImageData } from "@/store/types/useAuthState"

import { NextImageMotion } from "@/components/common"

import { dispatchPhotoCarousel } from "@/store/hooks"

import styles from "../styles/images.module.scss"

export const ItemImages = ({ images }: { images: IImageData[] }) => {
    const refImages = useRef<HTMLDivElement>(null)

    function to(value: boolean) {
        if (refImages.current) {
            if (value) {
                refImages.current.scrollBy({
                    top: 0,
                    left: -75,
                    behavior: "smooth",
                })
            } else {
                refImages.current.scrollBy({
                    top: 0,
                    left: +75,
                    behavior: "smooth",
                })
            }
        }
    }

    console.log("refImages: ", refImages.current)

    return (
        <div
            className={styles.container}
            data-not-button={images?.length < 5}
            onWheel={(event) => {
                event.stopPropagation()
                if (refImages.current) {
                    refImages.current.scrollBy({
                        top: 0,
                        left: event.deltaY,
                        behavior: "smooth",
                    })
                }
            }}
        >
            <div data-images ref={refImages}> 
                {images.map((item) => (
                    <NextImageMotion
                        key={`::${item.id}::photo::offer::`}
                        src={item?.attributes?.url!}
                        alt="offer-image"
                        width={80}
                        height={90}
                        onClick={(event) => {
                            event.stopPropagation()
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
            <button
                data-left
                onClick={(event) => {
                    event.stopPropagation()
                    to(true)
                }}
            >
                <img src="/svg/chevron-left.svg" alt="left" width={20} height={20} />
            </button>
            <button
                data-right
                onClick={(event) => {
                    event.stopPropagation()
                    to(false)
                }}
            >
                <img src="/svg/chevron-right.svg" alt="left" width={20} height={20} />
            </button>
        </div>
    )
}
