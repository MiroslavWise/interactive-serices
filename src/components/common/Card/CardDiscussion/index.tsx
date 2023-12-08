import Image from "next/image"
import { useTheme } from "next-themes"

import { IResponseOffers } from "@/services/offers/types"

import { Button } from "../../Forward"
import { NextImageMotion } from "../../Image"

import { useBalloonCard, useVisiblePhotosCarousel } from "@/store/hooks"

import styles from "./style.module.scss"

export function CardDiscussion(props: IResponseOffers) {
    const { title, images, provider, id, userId } = props ?? {}
    const { systemTheme } = useTheme()
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)
    const dispatchVisibleCarousel = useVisiblePhotosCarousel(({ dispatchVisibleCarousel }) => dispatchVisibleCarousel)

    function handleOpenMore() {
        dispatch({
            visible: true,
            type: provider,
            id: id,
            idUser: userId,
        })
    }

    return (
        <li className={styles.container}>
            <article>
                <div data-header>
                    <h4>{title}</h4>
                </div>
                {images?.length ? (
                    <section>
                        <ul>
                            {images?.map((item) => (
                                <NextImageMotion
                                    key={`${item.id}-img-discussion`}
                                    src={item?.attributes?.url}
                                    alt="offer-image"
                                    width={90}
                                    height={90}
                                    onClick={() => {
                                        dispatchVisibleCarousel({
                                            visible: true,
                                            photos: images.map((item) => ({
                                                id: item.id,
                                                url: item.attributes.url,
                                            })),
                                            idPhoto: item.id,
                                        })
                                    }}
                                />
                            ))}
                        </ul>
                    </section>
                ) : null}
                <div data-footer>
                    <Button
                        type="button"
                        label="Изменить"
                        typeButton={systemTheme === "dark" ? "fill-primary" : "fill-orange"}
                        prefixIcon={<Image src="/svg/edit-white.svg" alt="edit" width={14} height={14} unoptimized />}
                    />
                    <Button type="button" typeButton="regular-primary" label="Обзор" onClick={handleOpenMore} />
                </div>
            </article>
        </li>
    )
}
