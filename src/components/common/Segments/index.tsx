import type { TSegments } from "./types"

import { borderClassNames } from "@/helpers"

import styles from "./style.module.scss"
import { cx } from "@/lib/cx"

export const Segments: TSegments = ({
    VALUES,
    active,
    setActive,
    type,
    classNames,
    ref = null,
    id,
}) => {
    return (
        <ul
            className={cx(styles.container, classNames)}
            ref={ref}
            data-segments
        >
            {VALUES.map((item, index) => (
                <li
                    id={id}
                    key={item?.value}
                    onClick={() => setActive(item)}
                    className={cx(
                        styles.button,
                        styles[type],
                        active.value === item.value && styles.active,
                        active.value !== item.value &&
                            styles[
                                borderClassNames(
                                    VALUES.indexOf(active),
                                    index,
                                    VALUES.length,
                                )
                            ],
                    )}
                >
                    <p>{item.label}</p>
                </li>
            ))}
        </ul>
    )
}
