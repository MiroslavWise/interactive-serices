import type { TItemNotification, TTypeIconCurrentNotification } from "./types/types"

import styles from "./styles/style.module.scss"
import { daysAgo } from "@/helpers"
import dayjs from "dayjs"

const IMG_TYPE: Record<TTypeIconCurrentNotification, string> = {
    chat: "/svg/notifications/chat.svg",
    alert: "/svg/notifications/alert-circle.svg",
    barters: "/svg/notifications/repeat.svg",
    sos: "/svg/notifications/sos.svg",
    personal: "/svg/notifications/profile.svg",
}

export const ItemNotification: TItemNotification = ({ type, currentType }) => {
    return (
        <li className={styles.container} data-type={type} data-active={true}>
            <div data-avatar>
                {["information", "warning", "error"].includes(type) ? (
                    <img src={IMG_TYPE?.[currentType]!} alt="type" width={24} height={24} />
                ) : null}
            </div>
            <section>
                <article>
                    <p></p>
                    <time dateTime="">{daysAgo(dayjs().format())}</time>
                    <button data-dots>
                        <img src="/svg/notifications/dots-horizontal.svg" alt="..." width={16} height={16} />
                    </button>
                </article>
                <div data-buttons></div>
            </section>
        </li>
    )
}
