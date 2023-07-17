import type { TItemSegments } from "./types"

import { Segments } from "@/components/common/Segments"

import styles from "./styles/style.module.scss"

export const ItemSegments: TItemSegments = ({ activeSegment, setActiveSegment, values }) => {
  return (
    <section className={styles.sectionSegments}>
      <Segments
        type="optional-1"
        values={values}
        active={activeSegment}
        setActive={setActiveSegment}
      />
    </section>
  )
}