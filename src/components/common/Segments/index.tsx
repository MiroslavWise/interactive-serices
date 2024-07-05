import type { TSegments } from "./types"

import { borderClassNames } from "@/helpers"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const Segments: TSegments = ({ VALUES, active, setActive, type, classNames, ref = null, id, isBorder }) => {
  return (
    <article
      className={cx(
        styles.container,
        classNames,
        "w-full p-1 flex flex-row items-center rounded-[1.375rem] bg-BG-second",
        isBorder && "!border border-solid border-grey-stroke",
      )}
      ref={ref}
      data-segments
      data-border={!!isBorder}
    >
      {VALUES.map((item, index) => (
        <li
          id={id}
          key={item?.value}
          onClick={() => setActive(item)}
          data-type={type || "primary"}
          data-active={active.value === item.value}
          className={cx(
            styles.button,
            "w-full py-2 px-4 h-9 rounded-[1.125rem] flex items-center justify-center bg-transparent cursor-pointer hover:bg-grey-field group",
            active.value === item.value && "!bg-element-accent-2",
            active.value !== item.value && styles[borderClassNames(VALUES.indexOf(active), index, VALUES.length)],
          )}
          data-test={`segments-${item.value}`}
        >
          <p
            className={cx(
              "text-center text-sm font-medium text-text-secondary group-hover:text-text-primary",
              active.value === item.value && "!text-text-tab",
            )}
          >
            {item.label}
          </p>
        </li>
      ))}
    </article>
  )
}
