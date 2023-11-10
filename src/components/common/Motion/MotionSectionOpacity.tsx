import { cx } from "@/lib/cx"

import type { TMotion } from "./types/types"

export const MotionSectionOpacity: TMotion = ({ children, classNames }) => {
    return <section className={cx(classNames)}>{children}</section>
}
