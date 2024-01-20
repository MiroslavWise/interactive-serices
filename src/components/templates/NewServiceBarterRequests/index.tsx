"use client"

import { Item } from "./components/Item"
import { ButtonClose } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { NEW_CREATE_REQUESTS } from "./constants"
import { useVisibleNewServiceBarterRequests } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function NewServiceBarterRequests() {
    const isVisibleNewServiceBarterRequests = useVisibleNewServiceBarterRequests(
        ({ isVisibleNewServiceBarterRequests }) => isVisibleNewServiceBarterRequests,
    )
    const dispatchNewServiceBarterRequests = useVisibleNewServiceBarterRequests(
        ({ dispatchNewServiceBarterRequests }) => dispatchNewServiceBarterRequests,
    )

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={isVisibleNewServiceBarterRequests}>
            <div data-container>
                <h3>Вы можете предложить услугу или попросить сообщество помочь вам в чем-то. Просто попробуйте!</h3>
                <ul>
                    {NEW_CREATE_REQUESTS.map((item) => (
                        <Item key={`${item.imageSrc}-requests`} {...item} />
                    ))}
                </ul>
                <ButtonClose
                    onClick={() => dispatchNewServiceBarterRequests(false)}
                    position={{
                        right: 12,
                        top: 12,
                    }}
                />
            </div>
        </div>
    )
}
