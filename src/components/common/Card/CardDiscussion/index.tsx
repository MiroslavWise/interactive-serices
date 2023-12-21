"use client"

import Image from "next/image"

import { IResponseOffers } from "@/services/offers/types"

import { Button } from "../../Forward"

import { ContainerPhotos } from "../Suggestion/components/ContainerPhotos"

import { useBalloonCard } from "@/store/hooks"

import styles from "./style.module.scss"

export function CardDiscussion(props: IResponseOffers) {
    const { title, images, provider, id, userId } = props ?? {}
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)

    function handleOpenMore() {
        dispatch({
            visible: true,
            type: provider,
            id: id,
            idUser: userId,
        })
    }

    const photos: { url: string; id: number }[] = images?.map((_) => ({
        url: _.attributes?.url,
        id: _.id,
    }))

    return (
        <li className={styles.container}>
            <article>
                <div data-header>
                    <h4>{title}</h4>
                </div>
                <ContainerPhotos photos={photos} />
                <div data-footer>
                    <Button
                        type="button"
                        label="Изменить"
                        typeButton="fill-primary"
                        prefixIcon={<Image src="/svg/edit-white.svg" alt="edit" width={14} height={14} unoptimized />}
                        disabled
                    />
                    <Button type="button" typeButton="fill-primary" label="Обзор" onClick={handleOpenMore} />
                </div>
            </article>
        </li>
    )
}
