import type { TSegments } from "./types"

import { MotionLI, MotionUL } from "../Motion"

import { borderClassNames } from "@/helpers"

import styles from "./style.module.scss"

export const Segments: TSegments = ({
    values,
    active,
    setActive,
    type,
    classNames,
    ref = null,
    id,
}) => {
    return (
        <MotionUL classNames={[styles.container, classNames]} ref={ref} notY>
            {values.map((item, index) => (
                <MotionLI
                    id={id}
                    key={item?.value}
                    onClick={() => setActive(item)}
                    notY
                    classNames={[
                        styles.button,
                        styles[type],
                        active.value === item.value && styles.active,
                        active.value !== item.value &&
                            styles[
                                borderClassNames(
                                    values.indexOf(active),
                                    index,
                                    values.length,
                                )
                            ],
                    ]}
                >
                    <p>{item.label}</p>
                </MotionLI>
            ))}
        </MotionUL>
    )
}
