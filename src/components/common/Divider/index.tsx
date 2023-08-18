import type { TDivider } from "./types"
import { cx } from "@/lib/cx"
import styles from "./style.module.scss"
export const Divider: TDivider = ({ classNames }) => <div className={cx(styles.container, classNames)} />