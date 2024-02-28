import type { TSegments } from "./types"

import { borderClassNames } from "@/helpers"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const Segments: TSegments = ({ VALUES, active, setActive, type, classNames, ref = null, id, isBorder }) => {
  return (
    <article className={cx(styles.container, classNames)} ref={ref} data-segments data-border={!!isBorder}>
      {VALUES.map((item, index) => (
        <li
          id={id}
          key={item?.value}
          onClick={() => setActive(item)}
          data-type={type || "primary"}
          data-active={active.value === item.value}
          className={cx(
            styles.button,
            active.value !== item.value && styles[borderClassNames(VALUES.indexOf(active), index, VALUES.length)],
          )}
        >
          <p>{item.label}</p>
        </li>
      ))}
    </article>
  )
}
