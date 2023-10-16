import type { TBadgeServices } from "./types"

import { ImageStatic } from "@/components/common/Image"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const BadgeServices: TBadgeServices = ({
    photo,
    label,
    type,
    onClick,
}) => {
    function handle() {
        if (onClick) onClick()
    }

    return (
        <li className={cx(styles.container)} data-type={type} onClick={handle}>
            <div className={styles.containerImgService}>
                <ImageStatic src={photo} alt="pl" width={16} height={16} />
            </div>
            <p>{label}</p>
        </li>
    )
}
