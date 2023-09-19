"use client"

import { Item } from "./components/Item"
import { ButtonClose } from "@/components/common/Buttons"
import { Glasses } from "../NewServicesBanner/components/Glasses"

import { cx } from "@/lib/cx"
import { NEW_CREATE_REQUESTS } from "./constants"
import { useVisibleNewServiceBarterRequests } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function NewServiceBarterRequests() {
    const {
        isVisibleNewServiceBarterRequests,
        setIsVisibleNewServiceBarterRequests,
    } = useVisibleNewServiceBarterRequests()

    return (
        <div
            className={cx(
                styles.wrapper,
                isVisibleNewServiceBarterRequests && styles.active,
            )}
        >
            <div className={styles.container}>
                <h4>
                    Вы можете предложить услугу или попросить сообщество помочь
                    вам в чем-то. Просто попробуйте!
                </h4>
                <ul>
                    {NEW_CREATE_REQUESTS.map((item) => (
                        <Item key={`${item.imageSrc}-requests`} {...item} />
                    ))}
                </ul>
                <ButtonClose
                    onClick={() => setIsVisibleNewServiceBarterRequests(false)}
                    position={{
                        right: 12,
                        top: 12,
                    }}
                />
                <Glasses />
            </div>
        </div>
    )
}
